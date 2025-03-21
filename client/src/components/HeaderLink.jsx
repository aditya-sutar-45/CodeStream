import { Link, Heading } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
function HeaderLink() {
  const navigate = useNavigate();
  return (
    <Link
      onClick={() => {
        navigate("/");
        window.location.reload();
      }}
      style={{ textDecoration: "none", color: "white" }}
    >
      <Heading style={{ display: "inline" }}>CodeStream</Heading>
    </Link>
  );
}

export default HeaderLink;
