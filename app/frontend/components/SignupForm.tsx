import { Box, BoxProps, Button, Stack, TextInput } from "@mantine/core";
import { isEmail, isNotEmpty } from "@mantine/form";
import { ComponentPropsWithoutRef, FC, startTransition, useState } from "react";

import { useFieldsFilled } from "~/helpers/form";
import { useInertiaForm } from "~/helpers/inertia/form";
import { routes } from "~/helpers/routes";
import StrongPasswordInput from "./StrongPasswordInput";

export interface SignupFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const SignupForm: FC<SignupFormProps> = (props) => {
  const [passwordStrength, setPasswordStrength] = useState(0.0);

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
        if (passwordStrength < 0.25) {
          return "Password is too weak";
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
        <StrongPasswordInput
          {...getInputProps("password")}
          label="Password"
          placeholder="paS$w0rD"
          autoComplete="new-password"
          required
          onStrengthCheck={strength => {
            startTransition(() => {
              setPasswordStrength(strength);
            });
          }}
        />
        <Button type="submit" disabled={!filled} loading={processing}>
          Sign up
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupForm;
