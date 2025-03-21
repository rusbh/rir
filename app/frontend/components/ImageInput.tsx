import {
  Anchor,
  Box,
  Stack,
  type ImageProps,
  type InputWrapperProps,
} from "@mantine/core";
import { Image, Input, rgba, Text } from "@mantine/core";
import { type DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";
import { useDidUpdate, useUncontrolled } from "@mantine/hooks";
import { FC, useId, useState } from "react";
import { toast } from "sonner";
import { first } from "lodash-es";

import { PhotoIcon } from "~/components/icons";

import { upload } from "~/helpers/upload";
import { Upload } from "~/types";

import classes from "./ImageInput.module.css";
import "@mantine/dropzone/styles.layer.css";
import { routes } from "~/helpers/routes";
import { useRouteSWR } from "~/helpers/routes/swr";

export interface ImageInputProps
  extends Omit<
      InputWrapperProps,
      | "defaultValue"
      | "inputContainer"
      | "inputWrapperOrder"
      | "size"
      | "children"
      | "onChange"
    >,
    Pick<DropzoneProps, "disabled"> {
  value?: Upload | null;
  defaultValue?: Upload | null;
  onChange?: (value: Upload | null) => void;
  radius?: ImageProps["radius"];
  center?: boolean;
}

const ImageInput: FC<ImageInputProps> = ({
  center,
  defaultValue,
  disabled,
  h = 140,
  labelProps,
  onChange,
  p,
  pb,
  pl,
  pr,
  pt,
  px,
  py = 6,
  radius = "md",
  style,
  value,
  w,
  ...otherProps
}) => {
  const [resolvedValue, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });

  const { data, mutate } = useRouteSWR<{
    image: Schema.Image | null;
  }>(routes.images.show, {
    descriptor: "load preview image",
    params: resolvedValue ? { signed_id: resolvedValue.signedId } : null,
  });
  const { image } = data ?? {};
  useDidUpdate(() => {
    void mutate();
  }, [resolvedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const [uploading, setUploading] = useState(false);
  const loading: boolean = uploading || (!!value && !image);

  const inputId = useId();
  return (
    <Input.Wrapper
      labelProps={{ htmlFor: inputId, ...labelProps }}
      {...otherProps}
    >
      <Stack
        align={w ? "center" : "stretch"}
        gap={8}
        {...(!!w && { w: "min-content" })}
        {...(center && { mx: "auto" })}
        {...{ pl, pr, pb, pt, px, py, p }}
      >
        <Box {...{ w, h }} p={4} pos="relative">
          <Image
            w="100%"
            h="100%"
            {...{ radius }}
            src={image?.src}
            srcSet={image?.src_set}
          />
          <Dropzone
            className={classes.dropzone}
            accept={["image/png", "image/jpeg"]}
            multiple={false}
            onDrop={(files) => {
              const file = first(files);
              if (file) {
                setUploading(true);
                upload(file)
                  .then((blob) => {
                    const value = { signedId: blob.signed_id };
                    handleChange(value);
                  })
                  .catch((error: Error) => {
                    toast.error("Failed to upload image", {
                      description: error.message,
                    });
                  })
                  .finally(() => {
                    setUploading(false);
                  });
              }
            }}
            radius={radius}
            pos="absolute"
            inset={0}
            inputProps={{ id: inputId }}
            style={[
              style,
              ({ colors }) => ({
                "--af-dropzone-backdrop": rgba(colors.dark[5], 0.8),
              }),
            ]}
            mod={{ "with-src": !!image, disabled }}
            {...{ loading, disabled }}
          >
            <Stack align="center" gap={8}>
              <Box component={PhotoIcon} className={classes.dropzoneIcon} />
              <Text
                size="xs"
                c="dark.1"
                lh={1.3}
                style={{ textAlign: "center" }}
              >
                Drag an image or click to upload
              </Text>
            </Stack>
          </Dropzone>
        </Box>
        {!!image && (
          <Anchor
            component="button"
            type="button"
            size="xs"
            disabled={loading}
            onClick={() => {
              if (onChange) {
                onChange(null);
              }
            }}
          >
            Clear
          </Anchor>
        )}
      </Stack>
    </Input.Wrapper>
  );
};

export default ImageInput;
