import { Dialog, Callout, Flex, Button, Link } from "@radix-ui/themes";
import { ExitIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import SignUpForm from "./Auth/SignUpForm";
import { useState } from "react";
import LoginForm from "./Auth/LoginForm";
import { useAuth } from "../../hooks/useAuth.js";
import { useMatch, useNavigate } from "react-router-dom";
import ProfilePicture from "../ProfilePicture.jsx";

function Auth() {
  const isDashboard = useMatch("/user/dashboard");
  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");
  const { currentUser, username, logout } = useAuth();
  const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const data = Object.fromEntries(formData.entries());
  //   console.log("Form Data:", data);
  // };

  const toggleLoginForm = (e) => {
    e.preventDefault();
    setLogin((prev) => !prev);
  };

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch (e) {
      setError("Failed to log out! " + e.message);
    }
  }

  return (
    <>
      {error && (
        <Callout.Root color="red" style={{ marginTop: "1rem" }}>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      {currentUser ? (
        !isDashboard ? (
          <Link
            onClick={(e) => {
              e.preventDefault();
              navigate("/user/dashboard");
            }}
          >
            <ProfilePicture username={username} styles={{}} />
          </Link>
        ) : (
          <Button onClick={handleLogout}>Logout<ExitIcon/></Button>
        )
      ) : (
        <Dialog.Root>
          <Dialog.Trigger>
            <Button>{login ? "Login" : "Sign Up"}</Button>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="450px">
            <Dialog.Title>{login ? "Login" : "Sign Up"}</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              {login ? "Welcome Back!" : "Create an account with CodeStream!"}
            </Dialog.Description>

            <Flex direction="column" gap="3">
              {login ? <LoginForm /> : <SignUpForm />}
              <Link onClick={toggleLoginForm}>
                {login
                  ? "dont have an account? create one!"
                  : "already have an account? login in now!"}
              </Link>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  );
}

export default Auth;
