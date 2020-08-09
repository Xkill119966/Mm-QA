/// <reference path="./mytypes.d.ts" />
const Joi = require('@hapi/joi');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

const {
  User,
  validateUser,
  validateUserLogin,
} = require('../models/userModel');
const { Token } = require('../models/tokenModel');
const { extractUsernameFromEmail } = require('../utils');

/**
 * @route POST /user/signup
 * @type RequestHandler
 */
exports.signup = async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    return res.unprocessable({ error: error.details[0].message });
  }

  // save the user data into database
  // create email verification token
  // create verification link and send email

  try {
    const foundUser = await User.findOne({
      email: value.email,
    });
    if (foundUser)
      return res.conflict({ error: 'Username / Email Already Exists' });

    if (!req.file) {
      return res.unprocessable({ error: 'Please Select An Image' });
    }

    // save the user data into database
    const usernameFromEmail = extractUsernameFromEmail(value.email);
    const newUser = new User({
      name: value.name,
      provider: ['local'],
      username: usernameFromEmail,
      email: value.email,
      password: value.password,
      avatar: req.file.id,
      avatarUrl: `http://${req.headers.host}/api/user/${usernameFromEmail}/avatar/raw`,
    });
    const savedUser = await newUser.save();

    // create email verification token
    let token = new Token({
      _userId: savedUser._id,
      token: crypto.randomBytes(16).toString('hex'),
    });

    const savedToken = await token.save();
    if (!savedToken)
      return res.internalError({
        error: "Something wen't wrong while verifying email",
      });
    // create verification link and send email
    const verificationLink = `http://${req.headers.host}/api/user/verify-email?token=${token.token}`;
    const msg = {
      to: savedUser.email,
      from: 'bugvilla@gmail.com',
      subject: 'BugVilla Email Verification',
      templateId: 'd-110786e4fc3e4ce2b216b16e4ae73efd',
      dynamic_template_data: {
        user: savedUser.name,
        verification_link: verificationLink,
      },
    };
    sgMail.send(msg);

    res.created({
      data: {
        isVerified: savedUser.isVerified,
        avatarUrl: savedUser.avatarUrl,
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
        name: savedUser.name,
        message: 'User Registered',
      },
    });
  } catch (err) {
    console.log(err);
    res.internalError({
      error: 'Something went wrong',
    });
  }
};

/**
 * @route POST /user/login
 * @type RequestHandler
 */
exports.login = async (req, res) => {
  const { error, value } = validateUserLogin(req.body);
  if (error) {
    return res.unprocessable({ error: error.details[0].message });
  }

  try {
    // check if user exist
    const user = await User.findOne({ email: value.email });
    if (!user) return res.notFound({ error: 'Email does not exists' });

    // make sure user is verified
    if (!user.isVerified) return res.forbidden({ error: 'Email not verified' });

    // user only signed up with google
    if (!user.password || !user.provider.includes('local')) {
      return res.notFound({
        error: 'Unknown auth method, Try logging in with Google',
      });
    }

    // Check/Compares password
    const validPassword = await user.isValidPassword(value.password);
    if (!validPassword)
      return res.forbidden({ error: 'Password is incorrect' });

    // Create JWT Token
    const token = jwt.sign(
      {
        sub: user.id,
        isVerified: user.isVerified,
        username: user.username,
        provider: user.provider,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        id: user.id,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: '2h' }
    );

    res
      .status(200)
      .cookie('jwt', token, { maxAge: 2 * 3600000, httpOnly: true })
      .send({
        data: {
          isVerified: user.isVerified,
          username: user.username,
          provider: user.provider,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
          id: user.id,
        },
      });
  } catch (err) {
    res.internalError({
      error: 'Something went wrong',
    });
  }
};

/**
 * @route POST /user/logout
 * @type RequestHandler
 */
exports.logout = (req, res) => {
  req.logout();
  // res.send(req.user)
  res.status(200).clearCookie('jwt').send({ message: 'logged out' });
};

/**
 * @route PATCH /user/me/bio
 * @type RequestHandler
 */
exports.updateBio = async (req, res) => {
  const { error, value } = Joi.object({
    bio: Joi.string().max(100).required(),
  }).validate(req.body);

  if (error) {
    return res.unprocessable({ error: error.details[0].message });
  }

  try {
    let user = await User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        bio: value.bio,
      },
      { new: true }
    );

    if (!user) return res.notFound({ error: 'User not found' });

    res.ok({ data: user.bio });
  } catch (err) {
    console.log(err);
    res.internalError({
      error: 'Something went wrong while updating bio',
    });
  }
};

/**
 * @route GET /user/check-status
 * @type RequestHandler
 */
exports.checkAuth = (req, res) => {
  res.ok({ data: req.user });
};

/**
 * @route POST /user/verify-email
 * @type RequestHandler
 */
exports.verifyEmail = async (req, res) => {
  try {
    // find token
    let token = await Token.findOne({ token: req.query.token });
    if (!token)
      return res.notFound({ error: 'Unable to find verification token' });

    // find user with matching token
    let user = await User.findOne({ _id: token._userId });
    if (!user)
      return res.notFound({
        error: 'Unable to find matching user & token for verification',
      });
    if (user.isVerified)
      return res.badRequest({ error: 'User is already verified' });

    // everything looks good! save user
    user.isVerified = true;
    // it will not expire anymore
    user.expires = null;

    let savedUser = await user.save();
    if (!savedUser)
      return res.internalError({ error: 'Error while verifying user' });

    // res.ok({
    //   data: savedUser,
    //   message: 'Email address successfully verified.'
    // })
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.internalError({
      error: 'Something went wrong while verifying email address',
    });
  }
};

/**
 * @route GET /user/:username
 * @type RequestHandler
 */
exports.getByUsername = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.username }).select(
      '-password'
    );
    if (!user)
      return res.notFound({
        error: `User not found with the username ${req.params.username}`,
      });

    res.ok({ data: user });
  } catch (err) {
    console.log(err);
    res.internalError({
      error: 'Something went wrong',
    });
  }
};

/**
 * @route GET /user/:user_id
 * @type RequestHandler
 */
exports.getMultipleByIds = async (req, res) => {
  let { error, value } = Joi.object({
    user_ids: Joi.array().items(Joi.string()).required(),
  }).validate(req.body);

  if (error) {
    return res.unprocessable({ error: error.details[0].message });
  }

  try {
    let user = await User.find({
      _id: {
        $in: [...value.user_ids],
      },
    }).select('username');
    if (!user) return res.notFound({ error: `Users not found` });

    res.ok({ data: user });
  } catch (err) {
    console.log(err);
    res.internalError({
      error: 'Something went wrong',
    });
  }
};

/**
 * @route GET /user/:page
 * @type RequestHandler
 */
exports.getAllUsers = async (req, res) => {
  const MAX_ITEMS = 10;
  const page = parseInt(req.query.page - 1);
  try {
    let users = await User.find({})
      .select('-password -email')
      .sort('date_joined');

    if (!users) return res.notFound({ error: `No users found!` });

    res.ok({
      totalDocs: users.length,
      totalPages: Math.ceil(users.length / MAX_ITEMS),
      data: users.slice(MAX_ITEMS * page, MAX_ITEMS * page + MAX_ITEMS),
    });
  } catch (err) {
    console.log(err);
    res.internalError({
      error: 'Something went wrong while getting users',
    });
  }
};

/**
 * @route GET /user/me
 * @type RequestHandler
 */
exports.getCurrent = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id }).select('-password');
    if (!user) return res.notFound({ error: 'User Not Found!' });

    res.ok({ data: user });
  } catch (err) {
    res.internalError({
      error: 'Something went wrong',
    });
  }
};

