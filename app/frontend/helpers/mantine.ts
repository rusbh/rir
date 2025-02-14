import {
  type DefaultMantineColor,
  Group,
  JsonInput,
  type MantineColorsTuple,
  NumberInput,
  Overlay,
  Textarea,
} from "@mantine/core";
import {
  ActionIcon,
  Alert,
  Button,
  createTheme,
  DEFAULT_THEME,
  Loader,
  Modal,
  Notification,
  PasswordInput,
  TextInput,
  ThemeIcon,
} from "@mantine/core";

import classes from "./mantine.module.css";
import "./mantine.css";
import { cn } from "~/lib/utils";

export type CustomColors = "primary" | "accent" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, MantineColorsTuple>;
  }
}

export const THEME = createTheme({
  autoContrast: true,
  cursorType: "pointer",
  colors: {
    primary: DEFAULT_THEME.colors.violet,
    accent: DEFAULT_THEME.colors.teal,
    resumeAccent: DEFAULT_THEME.colors.indigo,
  },
  primaryColor: "primary",
  defaultRadius: "md",
  fontFamily:
    "Inter Variable, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, " +
    "Arial, sans-serif",
  fontFamilyMonospace:
    "JetBrains Mono Variable, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, " +
    "Liberation Mono, Courier New, monospace",
  headings: {
    fontFamily:
      "Inter Variable, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, " +
      "Arial, sans-serif",
  },
  focusClassName: cn("mantine-focus-auto", classes.focus),
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "subtle",
      },
    }),
    Alert: Alert.extend({
      styles: {
        title: {
          fontWeight: 800,
        },
      },
    }),
    Button: Button.extend({
      defaultProps: { variant: "light" },
      classNames: {
        root: classes.button,
      },
    }),
    Group: Group.extend({
      defaultProps: {
        wrap: "nowrap",
      },
    }),
    Loader: Loader.extend({
      defaultProps: {
        size: "sm",
        color: "primary.5",
      },
    }),
    Modal: Modal.extend({
      styles: ({ headings: { sizes, ...style } }) => ({
        header: {
          alignItems: "start",
        },
        title: {
          ...sizes.h4,
          ...style,
        },
      }),
    }),
    Overlay: Overlay.extend({
      defaultProps: {
        blur: 2,
      },
    }),
    JsonInput: JsonInput.extend({
      defaultProps: {
        variant: "filled",
      },
      classNames: {
        input: classes.input,
      },
    }),
    Notification: Notification.extend({
      styles: ({ lineHeights, spacing }) => ({
        title: {
          marginBottom: 0,
        },
        description: {
          lineHeight: lineHeights.xs,
        },
        icon: {
          backgroundColor: "transparent",
          color: "var(--notification-color)",
          marginInlineEnd: spacing.xs,
        },
      }),
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        variant: "filled",
      },
      classNames: {
        input: classes.input,
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        variant: "filled",
      },
      classNames: {
        input: classes.input,
      },
    }),
    Textarea: Textarea.extend({
      defaultProps: {
        variant: "filled",
      },
      classNames: {
        input: classes.input,
      },
    }),
    ThemeIcon: ThemeIcon.extend({
      defaultProps: {
        variant: "default",
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        variant: "filled",
      },
      classNames: {
        input: classes.input,
      },
    }),
  },
});

