import { Box, BoxProps, Button, Stack, TextInput } from "@mantine/core";
import { isEmail } from "@mantine/form";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { toast } from "sonner";

import { useFieldsFilled, useForm } from "~/helpers/form";
import { routes } from "~/helpers/routes";

export interface RequestEmailVerificationFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "onSubmit"> {}

const RequestEmailVerificationForm: FC<RequestEmailVerificationFormProps> = ({
  ...otherProps
}) => {
  const [linkSent, setLinkSent] = useState(false);

  const { values, getInputProps, submitting, submit } = useForm({
    action: routes.usersConfirmations.create,
    descriptor: "send verification email",
    initialValues: {
      email: "",
    },
    transformValues: (values) => ({ user: values }),
    validate: {
      email: isEmail("Invalid email address"),
    },
    onSuccess: () => {
      toast.success("Check your inbox!", {
        description: "Verification link was sent to your email.",
      });
      setLinkSent(true);
    },
  });
  const filled = useFieldsFilled(values);

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("email")}
          label="Email"
          placeholder="jon.snow@example.com"
          required
          withAsterisk={false}
        />
        <Button
          type="submit"
          disabled={linkSent || !filled}
          loading={submitting}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default RequestEmailVerificationForm;
