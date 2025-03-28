import { Avatar } from "@radix-ui/themes";

function ProfilePicture({ username, styles, size }) {
  return (
    <Avatar
      {...(size && (size = { size }))}
      src="/images/defaultProfilePics/2.png"
      radius="full"
      fallback={username[0].toUpperCase()}
      style={styles}
    />
  );
}

export default ProfilePicture;
