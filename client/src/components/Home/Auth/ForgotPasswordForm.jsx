import { Box, Button, Text, TextField, Link, Heading } from "@radix-ui/themes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
function ForgotPasswordForm() {
  const navigate = useNavigate();
  const {resetPassword} = useAuth();
  const [message, setMessage] = useState("")

  return (
    <Box>
      <Heading align={"center"}>Password Reset</Heading>
      <Text>{message}</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            setMessage("");
            await resetPassword(values.email);
            setMessage("check your inbox for further instructions");
          } catch (e) {
            setErrors({ email: e.message });
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ maxWidth: "40vw", margin: "auto" }}>
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

            <Button
              type="submit"
              variant="soft"
              style={{ width: "100%", marginTop: "8px" }}
              size="2"
              disabled={isSubmitting}
              {...(isSubmitting && { loading: true })}
            >
              Reset Password
              {/* {isSubmitting ? "Logging In..." : "Log In"} */}
            </Button>
            <Link
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              style={{ display: "block", width: "100%", textAlign: "center" }}
            >
              Cancel
            </Link>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ForgotPasswordForm;
