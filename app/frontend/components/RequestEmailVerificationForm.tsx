import { Box, BoxProps, Button, Stack, TextInput } from "@mantine/core";
import { isEmail } from "@mantine/form";
import { ComponentPropsWithoutRef, FC } from "react";

import { useFieldsFilled } from "~/helpers/form";
import { useInertiaForm } from "~/helpers/inertia/form";
import { routes } from "~/helpers/routes";

export interface RequestEmailVerificationFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "onSubmit"> {}

const RequestEmailVerificationForm: FC<
  RequestEmailVerificationFormProps
> = ({ ...otherProps }) => {
  const { values, getInputProps, processing, submit } = useInertiaForm({
    action: routes.usersConfirmations.create,
    descriptor: "send verification email",
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Email is not valid"),
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
        <Button type="submit" disabled={!filled} loading={processing}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default RequestEmailVerificationForm;
