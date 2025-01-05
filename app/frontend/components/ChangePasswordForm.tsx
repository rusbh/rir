import { Box, BoxProps, Button, PasswordInput, Stack } from "@mantine/core";
import { ComponentPropsWithoutRef, FC } from "react";
import { useInertiaForm } from "~/helpers/inertia/form";
import { routes } from "~/helpers/routes";

export interface ChangePasswordPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  resetPasswordToken: string;
}

const ChangePasswordPageForm: FC<ChangePasswordPageFormProps> = ({
  resetPasswordToken,
  ...otherProps
}) => {
  const { getInputProps, processing, submit } = useInertiaForm({
    action: routes.usersPasswords.update,
    descriptor: "change password",
    initialValues: {
      password: "",
    },
    validate: {
      password: value => {
        if (!value) {
          return "Password is required";
        }
      },
    },
    transformValues: attributes => ({
      user: {
        ...attributes,
        reset_password_token: resetPasswordToken,
      },
    }),
  });

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <PasswordInput
          {...getInputProps("password")}
          label="New password"
          placeholder="paS$w0rD"
          autoComplete="new-password"
          required
          minLength={6}
        />
        <Button type="submit" loading={processing}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default ChangePasswordPageForm;
