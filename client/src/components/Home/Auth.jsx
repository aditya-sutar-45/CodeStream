import { Dialog, Flex, Button, Link } from "@radix-ui/themes";
import SignUpForm from "./Auth/SignUpForm";
import { useState } from "react";
import LoginForm from "./Auth/LoginForm";

function Auth() {
  const [login, setLogin] = useState(true);
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

  return (
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
  );
}

export default Auth;
