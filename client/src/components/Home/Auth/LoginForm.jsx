import { Box, Button, Text, TextField, Link } from "@radix-ui/themes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../../../hooks/useAuth";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(values) {
    await login(values.email, values.password);
  }
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await handleSubmit(values);
        } catch (e) {
          setErrors({ email: e.message });
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
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
              component={Text}
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
              component={Text}
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
            Log In
            {/* {isSubmitting ? "Logging In..." : "Log In"} */}
          </Button>
          <Link
            onClick={(e) => {
              e.preventDefault();
              navigate("/forgot-password");
            }}
          >
            Forgot Password?
          </Link>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
