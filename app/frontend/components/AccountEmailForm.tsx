import {
  Badge,
  Box,
  BoxProps,
  Button,
  Stack,
  TextInput,
  Transition,
  type ButtonProps,
} from "@mantine/core";
import { PasswordInput, Text } from "@mantine/core";
import { isEmail, isNotEmpty } from "@mantine/form";
import { useDidUpdate } from "@mantine/hooks";
import { ComponentPropsWithoutRef, FC, useMemo } from "react";
import { toast } from "sonner";
import { pick } from "lodash-es";

import { toastChangesSaved } from "~/helpers/alerts";
import { useAuthenticatedUser } from "~/helpers/authentication";
import { useForm } from "~/helpers/form";
import { useFieldsFilled } from "~/helpers/form";
import { routes } from "~/helpers/routes";
import { SendIcon } from "./icons";
import { useRouteMutation } from "~/helpers/routes/swr";

export interface AccountEmailFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  onEmailChanged: () => void;
}

const AccountEmailForm: FC<AccountEmailFormProps> = ({
  onEmailChanged,
  ...otherProps
}) => {
  const user = useAuthenticatedUser();

  const initialValues = useMemo(() => {
    const { email, unconfirmed_email } = user;
    return {
      email: unconfirmed_email ?? email,
      current_password: "",
    };
  }, [user]);
  interface FormData {
    user: Schema.User;
    emailNeedsConfirmation: boolean;
  }
  const {
    values,
    getInputProps,
    isDirty,
    submitting,
    submit,
    reset,
    setInitialValues,
  } = useForm({
    name: "change-email",
    action: routes.usersRegistrations.changeEmail,
    descriptor: "change email",
    initialValues,
    validate: {
      email: isEmail("Invalid email address"),
      current_password: isNotEmpty("Current password is required"),
    },
    transformValues: (attributes) => ({
      user: attributes,
    }),
    onSuccess: (
      { user, emailNeedsConfirmation }: FormData,
      { setInitialValues }
    ) => {
      setInitialValues({
        email: user.unconfirmed_email ?? user.email,
        current_password: "",
      });
      if (emailNeedsConfirmation) {
        toast.info("Email verification required", {
          description:
            "Please check your email and follow the verification link to " +
            "verify your new email address.",
        });
      } else {
        toastChangesSaved({ to: "your email" });
      }
      onEmailChanged();
    },
  });
  useDidUpdate(() => {
    setInitialValues(initialValues);
    reset();
  }, [initialValues]); // eslint-disable-line react-hooks/exhaustive-deps
  const currentPasswordFilled = useFieldsFilled(values, "current_password");
  const emailFilled = useFieldsFilled(values, "email");
  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <Box>
          <TextInput
            {...getInputProps("email")}
            label="Email"
            placeholder="jon.snow@example.com"
            required
            {...(user.unconfirmed_email
              ? {
                  rightSectionWidth: 80,
                  rightSection: (
                    <Badge size="xs" variant="outline" color="orange">
                      Unverified
                    </Badge>
                  ),
                }
              : {})}
          />
          {user.email && user.unconfirmed_email && (
            <Text size="xs" c="dimmed" mt={4}>
              Last verified email:{" "}
              <Text c="gray" fw={500} span>
                {user.email}
              </Text>
              <br />
              Check your inbox for a link to verify your new email address.
            </Text>
          )}
        </Box>
        <Transition transition="fade" mounted={emailFilled && isDirty("email")}>
          {(style) => (
            <PasswordInput
              {...getInputProps("current_password")}
              label="Current password"
              description="Please confirm your current password to make changes."
              placeholder="password"
              required
              {...{ style }}
            />
          )}
        </Transition>
        <Stack gap={6}>
          <Button
            type="submit"
            disabled={
              !isDirty("email") || !emailFilled || !currentPasswordFilled
            }
            loading={submitting}
          >
            Change email
          </Button>
          {user.unconfirmed_email && (
            <ResendEmailVerificationInstructionsButton
              leftSection={<SendIcon />}
              variant="subtle"
              {...{ user }}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AccountEmailForm;

interface ResendEmailVerificationInstructionsButtonProps
  extends Omit<ButtonProps, "children"> {
  user: Schema.User;
}

const ResendEmailVerificationInstructionsButton: FC<
  ResendEmailVerificationInstructionsButtonProps
> = ({ user, ...otherProps }) => {
  // == Mutation
  const { trigger, mutating } = useRouteMutation(
    routes.usersConfirmations.create,
    {
      descriptor: "resend verification email",
      data: { user: pick(user, "email") },
      onSuccess: () => {
        toast.success("Check your inbox!", {
          description: "Verification link was re-sent to your email.",
        });
      },
    }
  );

  return (
    <Button
      loading={mutating}
      onClick={() => {
        void trigger();
      }}
      {...otherProps}
    >
      Resend verification email
    </Button>
  );
};
