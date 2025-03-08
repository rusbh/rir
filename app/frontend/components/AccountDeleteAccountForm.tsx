import { Box, BoxProps, Button, Menu } from "@mantine/core";
import { ComponentPropsWithoutRef, FC } from "react";
import { router } from "@inertiajs/react";

import { useForm } from "~/helpers/form";
import { routes } from "~/helpers/routes";
import { AlertIcon, DeleteIcon } from "./icons";

export interface AccountDeleteAccountFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const AccountDeleteAccountForm: FC<AccountDeleteAccountFormProps> = ({
  ...otherProps
}) => {
  const { submitting, submit } = useForm({
    action: routes.usersRegistrations.destroy,
    descriptor: "delete account",
    onSuccess() {
      router.visit(routes.home.index.path());
    },
  });

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Menu
        withArrow
        styles={{
          dropdown: {
            borderColor: "var(--mantine-color-red-outline)",
          },
          arrow: {
            borderColor: "var(--mantine-color-red-outline)",
          },
        }}
      >
        <Menu.Target>
          <Button
            variant="subtle"
            color="red"
            leftSection={<DeleteIcon />}
            loading={submitting}
            fullWidth
          >
            Delete account
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item type="submit" color="red" leftSection={<AlertIcon />}>
            Really delete?
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default AccountDeleteAccountForm;
