import { Box, Text, Button, Heading } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const navigate = useNavigate();
  return (
    <Box style={{ textAlign: "center", padding: "2rem" }}>
      <Box>
        <Heading>Verify Your Email</Heading>

        <Text>
          We have sent a verification link to your email. Please check your
          inbox and click the link to complete your registration.
        </Text>
      </Box>

      <Button
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
}

export default VerifyEmail;
