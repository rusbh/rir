import { Box, BoxProps, Button, Checkbox, PasswordInput, Stack, TextInput, Tooltip } from "@mantine/core";
import { isEmail, isNotEmpty } from "@mantine/form";
import { ComponentPropsWithoutRef, FC } from "react";

import { useFieldsFilled } from "~/helpers/form";
import { useInertiaForm } from "~/helpers/inertia/form";
import { routes } from "~/helpers/routes";

export interface LoginFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const LoginForm: FC<LoginFormProps> = (props) => {
  const { values, getInputProps, processing, submit } = useInertiaForm({
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
        <Button type="submit" disabled={!filled} loading={processing}>
          Sign in
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
