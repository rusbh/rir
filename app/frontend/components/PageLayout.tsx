import { ModalsProvider } from "@mantine/modals";
import { FC, PropsWithChildren } from "react";

import AppFlash from "./AppFlash";
import PageMeta from "./PageMeta";

import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/inter";

import "./PageLayout-lowercasing.css"; // lowercasing
import "@mantine/core/styles.layer.css";

const PageLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <ModalsProvider modalProps={{ size: "md" }}>{children}</ModalsProvider>
    <PageMeta />
    <AppFlash />
  </>
);

export default PageLayout;
