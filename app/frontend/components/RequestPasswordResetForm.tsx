import { Box, BoxProps, Button, Stack, TextInput } from "@mantine/core";
import { isEmail } from "@mantine/form";
import { ComponentPropsWithoutRef, FC } from "react";

import { useFieldsFilled } from "~/helpers/form";
import { useInertiaForm } from "~/helpers/inertia/form";
import { routes } from "~/helpers/routes";

export interface RequestPasswordResetFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const RequestPasswordResetForm: FC<RequestPasswordResetFormProps> = ({
  ...otherProps
}) => {
  const { values, getInputProps, processing, submit } = useInertiaForm({
    action: routes.usersPasswords.create,
    descriptor: "request password reset",
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Email is not valid"),
    },
    transformValues: (attributes) => ({ user: attributes }),
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
        <Button type="submit" disabled={!filled} loading={processing}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default RequestPasswordResetForm;
