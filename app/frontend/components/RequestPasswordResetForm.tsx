import { Box, BoxProps, Button, Stack, TextInput } from "@mantine/core";
import { isEmail } from "@mantine/form";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { toast } from "sonner";

import { useFieldsFilled, useForm } from "~/helpers/form";
import { routes } from "~/helpers/routes";

export interface RequestPasswordResetFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const RequestPasswordResetForm: FC<RequestPasswordResetFormProps> = ({
  ...otherProps
}) => {
  const [linkSent, setLinkSent] = useState(false);

  const { values, getInputProps, submitting, submit } = useForm({
    action: routes.usersPasswords.create,
    descriptor: "request password reset",
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Invalid email address"),
    },
    transformValues: (attributes) => ({ user: attributes }),
    onSuccess: () => {
      toast.success("Check your inbox!", {
        description: "Password reset link was sent to your email.",
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

export default RequestPasswordResetForm;
