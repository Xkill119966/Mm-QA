const router = require("express").Router();
const passport = require("passport");

const UserController = require("../controllers/UserController");
const upload = require("../middleware/fileUpload");
let avatarUpload = upload.single("image");

const generateUserToken = require("../middleware/generateToken");
const passportJWT = passport.authenticate("jwt", { session: false });
const passportGoogle = passport.authenticate("google", {
  session: false
});

const passportFacebook = passport.authenticate("facebook", { session: false });

router.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"]
  })
);
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "read_stream" })
);
router.get("/auth/google/callback", passportGoogle, generateUserToken);

router.get("/auth/facebook/callback", passportFacebook, generateUserToken);

router.get("/", passportJWT, UserController.getAllUsers);
router.patch("/pick", passportJWT, UserController.getMultipleByIds);
router.get("/me", passportJWT, UserController.getCurrent);
router.patch("/me/bio", passportJWT, UserController.updateBio);
router.post("/check-auth", passportJWT, UserController.checkAuth);
router.post("/signup", avatarUpload, UserController.signup);
router.post("/login", UserController.login);
router.get("/logout", passportJWT, UserController.logout);
router.get("/verify-email", UserController.verifyEmail);
router.get("/:username", passportJWT, UserController.getByUsername);




module.exports = router;
