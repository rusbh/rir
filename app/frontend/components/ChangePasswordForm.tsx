import { Box, BoxProps, Button, Stack } from "@mantine/core";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { useInertiaForm } from "~/helpers/inertia/form";
import { routes } from "~/helpers/routes";
import StrongPasswordInput from "./StrongPasswordInput";

export interface ChangePasswordPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  resetPasswordToken: string;
}

const ChangePasswordPageForm: FC<ChangePasswordPageFormProps> = ({
  resetPasswordToken,
  ...otherProps
}) => {
  const [passwordStrength, setPasswordStrength] = useState(0.0);

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
        if (passwordStrength < 0.25) {
          return "Password is too weak";
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
        <StrongPasswordInput
          {...getInputProps("password")}
          label="New password"
          placeholder="paS$w0rD"
          autoComplete="new-password"
          required
          minLength={6}
          onStrengthCheck={setPasswordStrength}
        />
        <Button type="submit" loading={processing}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default ChangePasswordPageForm;
