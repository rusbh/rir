import { Box, BoxProps, Button, Stack } from "@mantine/core";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { toast } from "sonner";
import { router } from "@inertiajs/react";

import { homeRoute } from "~/helpers/routes";
import { routes } from "~/helpers/routes";
import StrongPasswordInput from "./StrongPasswordInput";
import { useForm } from "~/helpers/form";

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

  const { getInputProps, submitting, submit } = useForm({
    action: routes.usersPasswords.update,
    descriptor: "change password",
    initialValues: {
      password: "",
    },
    validate: {
      password: (value) => {
        if (!value) {
          return "Password is required";
        }
        if (passwordStrength < 1.0) {
          return "Password is too weak";
        }
      },
    },
    transformValues: (values) => ({
      user: {
        ...values,
        reset_password_token: resetPasswordToken,
      },
    }),
    onSuccess: ({ user }: { user: Schema.User }) => {
      toast.success("Password changed successfully!", {
        description: "You are now signed in.",
      });
      const path = homeRoute(user).path();
      router.visit(path);
    },
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
        <Button type="submit" loading={submitting}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default ChangePasswordPageForm;
