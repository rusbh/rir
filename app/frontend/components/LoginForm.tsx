import { router } from "@inertiajs/react";
import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  PasswordInput,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { isEmail, isNotEmpty } from "@mantine/form";
import { ComponentPropsWithoutRef, FC } from "react";
import { toast } from "sonner";

import { useFieldsFilled, useForm } from "~/helpers/form";
import { homeRoute, routes } from "~/helpers/routes";

export interface LoginFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const LoginForm: FC<LoginFormProps> = (props) => {
  const { values, getInputProps, submitting, submit } = useForm({
    action: routes.usersSessions.create,
    descriptor: "sign in",
    initialValues: {
      email: "",
      password: "",
      remember_me: true,
    },
    validate: {
      email: isEmail("Email is invalid"),
      password: isNotEmpty("Password is required"),
    },
    transformValues: (values) => ({
      user: values,
    }),
    onError: ({ setFieldValue }) => {
      setFieldValue("password", "");
    },
    onSuccess: ({ user }: { user: Schema.User }) => {
      toast.success(<>Welcome back, {user.name} :)</>);
      const path = homeRoute(user).path();
      router.visit(path);
    },
  });
  const filled = useFieldsFilled(values, "email", "password");

  return (
    <Box component="form" onSubmit={submit} {...props}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("email")}
          type="email"
          label="Email"
          placeholder="jon.snow@example.com"
          autoComplete="email"
          required
          withAsterisk={false}
          autoFocus
        />
        <PasswordInput
          {...getInputProps("password")}
          label="Password"
          placeholder="secret-passphrase"
          autoComplete="current-password"
          required
          withAsterisk={false}
        />
        <Tooltip
          label="Uncheck this if you don't love cookies."
          position="top-start"
          withArrow
        >
          <Checkbox
            {...getInputProps("remember_me", { type: "checkbox" })}
            label="Stay signed in"
          />
        </Tooltip>
        <Button type="submit" disabled={!filled} loading={submitting}>
          Sign in
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
