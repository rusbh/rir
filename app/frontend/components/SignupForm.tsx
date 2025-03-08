import { Box, BoxProps, Button, Stack, TextInput } from "@mantine/core";
import { isEmail, isNotEmpty } from "@mantine/form";
import { ComponentPropsWithoutRef, FC, startTransition, useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

import { useFieldsFilled, useForm } from "~/helpers/form";
import { routes } from "~/helpers/routes";
import StrongPasswordInput from "./StrongPasswordInput";
import { homeRoute } from "~/helpers/routes";

export interface SignupFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const SignupForm: FC<SignupFormProps> = (props) => {
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  const { values, getInputProps, submitting, submit } = useForm({
    action: routes.usersRegistrations.create,
    descriptor: "sign up",
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      email: isEmail("Invalid email address"),
      password: (value) => {
        if (!value) {
          return "Password is required";
        }
        if (passwordStrength < 1.0) {
          return "Password is too weak";
        }
      },
    },
    transformValues: (attributes) => ({ user: attributes }),
    onError: ({ setFieldValue }) => {
      setFieldValue("password", "");
    },
    onSuccess: ({ user }: { user: Schema.User }) => {
      toast.success("Check your inbox!", {
        description: "Email Verification link was sent to your email.",
      });
      router.visit(homeRoute(user).path());
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
          onStrengthCheck={(strength) => {
            startTransition(() => {
              setPasswordStrength(strength);
            });
          }}
        />
        <Button type="submit" disabled={!filled} loading={submitting}>
          Sign up
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupForm;
