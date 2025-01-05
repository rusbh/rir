import { Box, BoxProps, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { isEmail, isNotEmpty } from "@mantine/form";
import { ComponentPropsWithoutRef, FC } from "react";

import { useFieldsFilled } from "~/helpers/form";
import { useInertiaForm } from "~/helpers/inertia/form";
import { routes } from "~/helpers/routes";

export interface SignupFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const SignupForm: FC<SignupFormProps> = (props) => {
  const { values, getInputProps, processing, submit } = useInertiaForm({
    action: routes.usersRegistrations.create,
    descriptor: "sign up",
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      email: isEmail("Email is not valid"),
      password: (value) => {
        if (!value) {
          return "Password is required";
        }
      },
    },
    transformValues: (attributes) => ({ user: attributes }),
    onError: ({ setFieldValue }) => {
      setFieldValue("password", "");
    },
  });

  const filled = useFieldsFilled(values);

  return (
    <Box component="form" onSubmit={submit} {...props}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("name")}
          label="Name"
          placeholder="Jon Snow"
          autoComplete="name"
          required
        />
        <TextInput
          {...getInputProps("email")}
          type="email"
          label="Email"
          placeholder="jon.snow@example.com"
          autoComplete="email"
          required
        />
        <PasswordInput
          {...getInputProps("password")}
          label="Password"
          placeholder="paS$w0rD"
          autoComplete="new-password"
          required
        />
        <Button type="submit" disabled={!filled} loading={processing}>
          Sign up
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupForm;
