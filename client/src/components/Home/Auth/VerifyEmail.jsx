import { Container, Heading, Link } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const navigate = useNavigate();
  return (
    <Container>
      <Heading>Please Verify Your Email...</Heading>
      <Link
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        back to home...
      </Link>
    </Container>
  );
}

export default VerifyEmail;
