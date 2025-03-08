import { SharedPageProps } from "~/types";
import {
  Anchor,
  AppShell,
  AppShellProps,
  Box,
  Breadcrumbs,
  ContainerProps,
  MantineSize,
  rem,
} from "@mantine/core";
import { ReactNode, useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";
import { isEmpty } from "lodash-es";
import { Link } from "@inertiajs/react";

import AppMeta, { AppMetaProps } from "./AppMeta";
import { SidebarControls } from "~/helpers/sidebar";
import PageContainer from "./PageContainer";
import AppHeader from "./AppHeader";
import { usePageProps } from "~/helpers/inertia";
import classes from "./AppLayout.module.css";
import Attribution from "./Attribution";
import PageLayout from "./PageLayout";
import { SidebarControlsProvider } from "./SidebarControlsProvider";
import { resolveDynamicProp, useResolveDynamicProp } from "~/helpers/layout";

export interface AppLayoutProps<PageProps extends SharedPageProps>
  extends Omit<AppMetaProps, "title" | "description">,
    Omit<AppShellProps, "title"> {
  title?: DynamicProp<PageProps, AppMetaProps["title"]>;
  description?: DynamicProp<PageProps, AppMetaProps["description"]>;
  breadcrumbs?: DynamicProp<PageProps, (AppBreadcrumb | null | false)[]>;
  withContainer?: boolean;
  containerSize?: MantineSize | (string & {}) | number;
  containerProps?: ContainerProps;
  withGutter?: boolean;
  gutterSize?: MantineSize | (string & {}) | number;
  sidebar?: DynamicProp<PageProps, ReactNode>;
}

export interface AppBreadcrumb {
  title: string;
  href: string;
}

export type DynamicProp<PageProps extends SharedPageProps, T> =
  | T
  | ((props: PageProps) => T);

const AppLayout = <PageProps extends SharedPageProps = SharedPageProps>({
  title: titleProp,
  description: descriptionProp,
  imageUrl,
  noIndex,
  breadcrumbs: breadcrumbsProp,
  withContainer,
  containerSize,
  containerProps,
  withGutter,
  gutterSize,
  sidebar: sidebarProp,
  children,
  padding,
  ...otherProps
}: AppLayoutProps<PageProps>) => {
  const pageProps = usePageProps<PageProps>();

  const title = useResolveDynamicProp(titleProp, pageProps);
  const description = useResolveDynamicProp(descriptionProp, pageProps);

  const breadcrumbs = useMemo<AppBreadcrumb[]>(() => {
    return breadcrumbsProp
      ? resolveDynamicProp(breadcrumbsProp, pageProps).filter((x) => !!x)
      : [];
  }, [breadcrumbsProp, pageProps]);

  const sidebar = useResolveDynamicProp(sidebarProp, pageProps);
  const [
    sidebarOpened,
    { toggle: toggleSidebar, close: closeSidebar, open: openSidebar },
  ] = useDisclosure();
  const sidebarControls = useMemo<SidebarControls | null>(() => {
    return sidebar
      ? {
          opened: sidebarOpened,
          toggle: toggleSidebar,
          close: closeSidebar,
          open: openSidebar,
        }
      : null;
  }, [sidebar, sidebarOpened, toggleSidebar, closeSidebar, openSidebar]);

  const { style: containerStyle, ...otherContainerProps } =
    containerProps ?? {};
  const content = withContainer ? (
    <PageContainer
      size={containerSize ?? containerProps?.size}
      {...{ withGutter, gutterSize }}
      style={[
        { flexGrow: 1, display: "flex", flexDirection: "column" },
        containerStyle,
      ]}
      {...otherContainerProps}
    >
      {children}
    </PageContainer>
  ) : (
    children
  );

  const shell = (
    <AppShell
      header={{ height: 46 }}
      {...(sidebar && {
        navbar: {
          width: 240,
          breakpoint: "sm",
          collapsed: { mobile: !sidebarOpened },
        },
      })}
      padding={padding ?? (withContainer ? undefined : "md")}
      style={{ "--app-shell-footer-height": rem(44) }}
      classNames={{
        header: classes.header,
        navbar: classes.navbar,
      }}
      {...otherProps}
    >
      <AppHeader />
      {sidebar}
      <AppShell.Main className={classes.main}>
        {!isEmpty(breadcrumbs) && (
          <Breadcrumbs
            mx={10}
            mt={6}
            classNames={{
              separator: classes.breadcrumbSeparator,
            }}
            styles={{
              root: {
                flexWrap: "wrap",
                rowGap: rem(4),
              },
              separator: {
                marginLeft: 6,
                marginRight: 6,
              },
            }}
          >
            {breadcrumbs.map(({ title, href }, index) => (
              <Anchor component={Link} href={href} key={index} size="sm">
                {title}
              </Anchor>
            ))}
          </Breadcrumbs>
        )}
        {content}
      </AppShell.Main>
      <Box className={classes.footer}>
        <Attribution h="100%" style={{ flexShrink: 1 }} />
      </Box>
    </AppShell>
  );
  return (
    <PageLayout>
      <AppMeta {...{ title, description, imageUrl, noIndex }} />
      <SidebarControlsProvider controls={sidebarControls}>
        {shell}
      </SidebarControlsProvider>
    </PageLayout>
  );
};

export default AppLayout;
