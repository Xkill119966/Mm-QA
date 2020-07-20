import React from "react";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FormContextValues } from "react-hook-form";

import { Button, BugVillaLogo, Flex, IconLink, Label, toast } from "../../@ui";
import { Input } from "../../@ui/Form";
// import useQuery from "hooks/useQuery";
import LoginWrapper from "../Signup/Signup.style";

// import { StoreState } from "store";
// import { loginUser } from "store/ducks/auth";
// import { GoogleButton } from "components/GoogleButton";

// const LoginSchema = yup.object().shape({
//   email: yup
//     .string()
//     .min(5)
//     .max(100)
//     .email()
//     .required(),
//   password: yup
//     .string()
//     .min(6)
//     .max(100)
//     .required()
// });

const Login = () => {
  // const query = useQuery();
  // const dispatch = useDispatch();
  // const [isLoading, loginError] = useSelector(state => [
  //   state.loading["user/LOGIN"],
  //   state.error["user/LOGIN"]
  // ]);
  // const { register, handleSubmit, errors } = useForm({
  //   validationSchema: LoginSchema,
  //   mode: "onChange"
  // });

  // const onSubmit = async data => {
  //   dispatch(loginUser(data));
  // };

  // const isComingFromSignup = query.get("signedup") && query.get("email");

  // loginError && toast.error(loginError);
  return (
    <LoginWrapper>
      <Flex align="center" justify="center" direction="column">
        <BugVillaLogo />
        <h2 className="text--bold">Welcome back!</h2>
{/* 
        <form >
          <Input
            name="email"
            type="email"
            icon="envelope"
            placeholder="example@gmail.com"
            errors={errors}
            // inputRef={register({ required: "Email is required" })}
          />

          <Input
            type="password"
            name="password"
            icon="lock"
            placeholder="password"
            errors={errors}
            // inputRef={register({ required: "Password is Required" })}
          />

          <Button
            isLoading={isLoading}
            type="submit"
            width="50%"
            icon="arrow-right"
          >
            Login
          </Button>
        </form> */}

        {/* <GoogleButton /> */}

        <IconLink className="color--gray" to="/signup">
          Don't have an account?
        </IconLink>

        {/* {isComingFromSignup && (
          <>
            <br />
            <Label className="chip" type="feature">
              Signup successful, please{" "}
              <a className="color--gray" href={`https://${query.get("email")}`}>
                verify {query.get("email")}
              </a>
            </Label>
          </>
        )} */}
      </Flex>
    </LoginWrapper>
  );
};

export default Login;

