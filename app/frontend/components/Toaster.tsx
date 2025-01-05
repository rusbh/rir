import { FC } from "react";
import {
  Toaster as _Toaster,
  ToasterProps,
  type ToasterProps as _ToasterProps,
} from "sonner";

import { cn } from "~/lib/utils";

import classes from "./Toaster.module.css";

const Toaster: FC<ToasterProps> = ({ toastOptions, ...otherProps }) => (
  <_Toaster
    position="bottom-right"
    closeButton
    toastOptions={{
      ...toastOptions,
      className: cn(toastOptions?.className, classes.toast),
    }}
    {...otherProps}
  />
);

export default Toaster;
