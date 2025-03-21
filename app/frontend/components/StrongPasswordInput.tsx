import { type PasswordInputProps } from "@mantine/core";
import { PasswordInput, Progress } from "@mantine/core";
import { useThrottledValue, useUncontrolled } from "@mantine/hooks";
import { FC, useEffect } from "react";

import { useForm } from "~/helpers/form";
import { routes } from "~/helpers/routes";

export interface StrongPasswordInputProps
  extends Omit<PasswordInputProps, "value" | "defaultValue" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onStrengthCheck?: (strength: number) => void;
  onChange?: (value: string) => void;
}

const StrongPasswordInput: FC<StrongPasswordInputProps> = ({
  inputContainer,
  onChange,
  onStrengthCheck,
  ...otherProps
}) => {
  const { defaultValue, error, value } = otherProps;
  const [resolvedValue, handleChange] = useUncontrolled<string>({
    value,
    defaultValue,
    onChange,
  });
  const throttledValue = useThrottledValue(resolvedValue, 200);

  interface FormData {
    strength: number;
  }
  const { data, setFieldValue, submit } = useForm({
    action: routes.passwordStrengthChecks.create,
    descriptor: "check password strength",
    initialValues: {
      password: resolvedValue,
    },
    transformValues: (values) => ({ check: values }),
    onSuccess: ({ strength }: FormData) => {
      onStrengthCheck?.(strength);
    },
  });
  const { strength = 0.0 } = data ?? {};
  useEffect(() => {
    setFieldValue("password", throttledValue);
    if (throttledValue) {
      submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [throttledValue, setFieldValue]);

  return (
    <PasswordInput
      inputContainer={(children) => {
        const inputWithProgress = (
          <>
            {children}
            {!!throttledValue && (
              <Progress
                size="xs"
                color={
                  strength === 1.0
                    ? "green"
                    : strength > 0.25
                    ? "yellow"
                    : "red"
                }
                value={Math.round(strength * 100)}
                mt={6}
                mb={error ? 6 : 0}
              />
            )}
          </>
        );
        return inputContainer
          ? inputContainer(inputWithProgress)
          : inputWithProgress;
      }}
      onChange={({ currentTarget }) => {
        handleChange(currentTarget.value);
      }}
      {...otherProps}
    />
  );
};

export default StrongPasswordInput;
