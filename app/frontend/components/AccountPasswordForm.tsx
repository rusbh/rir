import {
  Box,
  BoxProps,
  Button,
  PasswordInput,
  Stack,
  Transition,
} from "@mantine/core";
import { isNotEmpty } from "@mantine/form";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { toast } from "sonner";
import { router } from "@inertiajs/react";

import StrongPasswordInput from "./StrongPasswordInput";
import { useFieldsFilled, useForm } from "~/helpers/form";
import { routes } from "~/helpers/routes";

export interface AccountPasswordFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const AccountPasswordForm: FC<AccountPasswordFormProps> = ({
  ...otherProps
}) => {
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  const { values, getInputProps, isDirty, submitting, submit } = useForm({
    name: "change-password",
    action: routes.usersRegistrations.changePassword,
    descriptor: "change password",
    initialValues: {
      password: "",
      current_password: "",
    },
    transformValues: (attributes) => ({
      user: attributes,
    }),
    validate: {
      password: (value) => {
        if (!value) {
          return "Password is required";
        }
        if (passwordStrength < 1.0) {
          return "Password is too weak";
        }
      },
      current_password: isNotEmpty("Current password is required"),
    },
    onSuccess: () => {
      toast.success("Password changed successfully.");
      router.reload({ only: ["currentUser"] });
    },
  });
  const currentPasswordFilled = useFieldsFilled(values, "current_password");
  const passwordFieldsFilled = useFieldsFilled(values, "password");

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <StrongPasswordInput
          label="New password"
          placeholder="paS$w0rD"
          autoComplete="new-password"
          required
          onStrengthCheck={setPasswordStrength}
          {...getInputProps("password")}
        />
        <Transition
          transition="fade"
          mounted={isDirty("password") && passwordFieldsFilled}
        >
          {(style) => (
            <PasswordInput
              {...getInputProps("current_password")}
              label="Current password"
              description="Please confirm your current password to make changes."
              placeholder="password"
              autoComplete="current-password"
              required
              {...{ style }}
            />
          )}
        </Transition>
        <Button
          type="submit"
          disabled={
            !isDirty("password") ||
            !passwordFieldsFilled ||
            !currentPasswordFilled
          }
          loading={submitting}
        >
          Change password
        </Button>
      </Stack>
    </Box>
  );
};

export default AccountPasswordForm;
