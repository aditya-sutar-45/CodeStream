import { Box, Button, Text, TextField } from "@radix-ui/themes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function SignUpForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(values) {
    await signup(values.email, values.password);
  }
  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await handleSubmit(values);
          navigate("/dashboard");
        } catch (e) {
          setErrors({ email: e.message });
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {/* <Text>{currentUser.email}</Text> */}
          <Box my="2">
            <label htmlFor="email">
              <Text>Email</Text>
            </label>
            <Field name="email">
              {({ field }) => (
                <TextField.Root
                  {...field}
                  id="email"
                  type="email"
                  placeholder="email"
                />
              )}
            </Field>
            <ErrorMessage
              name="email"
              component="Text"
              style={{ color: "red", fontSize: "12px" }}
            />
          </Box>

          <Box my="2">
            <label htmlFor="password">
              <Text>Password</Text>
            </label>
            <Field name="password">
              {({ field }) => (
                <TextField.Root
                  {...field}
                  id="password"
                  type="password"
                  placeholder="password"
                />
              )}
            </Field>
            <ErrorMessage
              name="password"
              component="Text"
              style={{ color: "red", fontSize: "12px" }}
            />
          </Box>

          <Box my="2">
            <label htmlFor="confirmPassword">
              <Text>Confirm Password</Text>
            </label>
            <Field name="confirmPassword">
              {({ field }) => (
                <TextField.Root
                  {...field}
                  id="confirmPassword"
                  type="password"
                  placeholder="confirm password"
                />
              )}
            </Field>
            <ErrorMessage
              name="confirmPassword"
              component="Text"
              style={{ color: "red", fontSize: "12px" }}
            />
          </Box>

          <Button
            type="submit"
            variant="soft"
            style={{ width: "100%", marginTop: "8px" }}
            size="2"
            disabled={isSubmitting}
            {...(isSubmitting && { loading: true })}
          >
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SignUpForm;
