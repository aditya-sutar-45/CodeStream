import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { ExitIcon } from "@radix-ui/react-icons";
function LogoutButton ({handleLogout}) {
    return (
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button>
                Logout
                <ExitIcon />
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <AlertDialog.Title>Logout?</AlertDialog.Title>
              <AlertDialog.Description size="2">
                Are you sure? This will log you out of CodeStream!
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button variant="solid" color="red" onClick={handleLogout}>
                    Logout 
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
    )

}

export default LogoutButton;