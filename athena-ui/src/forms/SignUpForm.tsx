import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { Button, Grid, Link } from "@material-ui/core";

interface Props {
  handleSubmit: (username: string, email: string, password: string) => any;
  toggleSignUp: () => any;
}

const schema = Yup.object({
  username: Yup.string().required("Please enter a username"),
  email: Yup.string().email().required("Please enter a valid email"),
  password: Yup.string().min(8).required("Please enter a password"),
  confirmPassword: Yup.string()
    .required("Please re-enter password")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export const SignUpForm: React.FC<Props> = (props) => {
  const { handleSubmit, toggleSignUp } = props;

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleSubmit(values.username, values.email, values.password);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid
            container
            spacing={1}
            direction={"column"}
            alignItems={"stretch"}
          >
            <Grid container item xs={12} sm={12} justify={"center"}>
              <Field
                component={TextField}
                name="username"
                label={"Username"}
                variant="outlined"
              />
            </Grid>
            <Grid container item xs={12} sm={12} justify={"center"}>
              <Field
                className={"mb-3"}
                component={TextField}
                name="email"
                label={"Email Address *"}
                variant="outlined"
              />
            </Grid>
            <Grid container item xs={12} sm={12} justify={"center"}>
              <Field
                className={"mb-3"}
                component={TextField}
                name="password"
                label={"Password *"}
                type={"password"}
                variant="outlined"
              />
            </Grid>
            <Grid container item xs={12} sm={12} justify={"center"}>
              <Field
                className={"mb-3"}
                component={TextField}
                name="confirmPassword"
                label={"Confirm Password *"}
                type={"password"}
                variant="outlined"
              />
            </Grid>
            <Grid container item xs={12} sm={12} justify={"center"}>
              <Button
                type={"submit"}
                variant="contained"
                disabled={isSubmitting}
                color="primary"
              >
                Register
              </Button>
            </Grid>

            <Grid item xs={6} sm={6} justify={"center"}>
              <Link component={"button"} onClick={toggleSignUp}>
                Already have an account? Log In
              </Link>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
