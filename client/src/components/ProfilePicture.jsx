import { Avatar } from "@radix-ui/themes";
import { useAuth } from "../hooks/useAuth";

function ProfilePicture({ username, styles, size }) {
  const { profilePic } = useAuth();
  return (
    <Avatar
      {...(size && (size = { size }))}
      src={profilePic}
      radius="full"
      fallback={username[0].toUpperCase()}
      style={styles}
    />
  );
}

export default ProfilePicture;
