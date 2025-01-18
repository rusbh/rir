import { Link, type InertiaLinkProps } from "@inertiajs/react";
import {
  Avatar,
  Badge,
  BoxProps,
  Menu,
  type MenuItemProps,
  Skeleton,
  Text,
} from "@mantine/core";
import { ComponentPropsWithoutRef, FC, startTransition, useState } from "react";

import {
  AccountIcon,
  HomeIcon,
  MenuIcon,
  SignInIcon,
  SignOutIcon,
} from "~/components/icons";
import { routes } from "~/helpers/routes";
import { useCurrentUser } from "~/helpers/authentication";
import TimeAgo from "./TimeAgo";
import { useInertiaForm } from "~/helpers/inertia";
import { useFetchRoute } from "~/helpers/fetch";

import classes from "./AppMenu.module.css";

export interface AppMenuProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children" | "onChange"> {}

const AppMenu: FC<AppMenuProps> = ({ ...otherProps }) => {
  const currentUser = useCurrentUser();

  const [opened, setOpened] = useState(false);

  const { data } = useFetchRoute<{ bootedAt: string }>(
    routes.healthcheckHealthchecks.check,
    {
      descriptor: "load server info",
    }
  );
  const { bootedAt } = data ?? {};

  const { submit: logout } = useInertiaForm({
    action: routes.usersSessions.destroy,
    descriptor: "sign out",
  });

  interface MenuLinkProps
    extends MenuItemProps,
      Omit<InertiaLinkProps, "color" | "style"> {}
  const MenuLink: FC<MenuLinkProps> = (props) => (
    <Menu.Item component={Link} {...props} />
  );

  return (
    <Menu
      position="bottom-end"
      trigger="hover"
      offset={4}
      width={220}
      withinPortal={false}
      {...{ opened }}
      onChange={(opened) => {
        startTransition(() => {
          setOpened(opened);
        });
      }}
      classNames={{
        item: classes.item,
        itemSection: classes.itemSection,
        itemLabel: classes.itemLabel,
      }}
      {...otherProps}
    >
      <Menu.Target>
        <Badge
          variant="default"
          size="lg"
          leftSection={
            currentUser ? (
              <Avatar src={currentUser.avatar?.src} size={21} />
            ) : (
              <MenuIcon />
            )
          }
          styles={{
            label: {
              fontWeight: 500,
              maxWidth: 96,
            },
            root: {
              paddingLeft: currentUser ? 2 : 8,
            },
          }}
        >
          {currentUser?.name ?? "menu"}
        </Badge>
      </Menu.Target>
      <Menu.Dropdown>
        <MenuLink href={routes.home.index.path()} leftSection={<HomeIcon />}>
          Home
        </MenuLink>
        <Menu.Divider />
        {currentUser ? (
          <>
            <MenuLink
              href={routes.usersRegistrations.edit.path()}
              leftSection={<AccountIcon />}
            >
              Account
            </MenuLink>
            <Menu.Item
              leftSection={<SignOutIcon />}
              onClick={() => {
                logout();
              }}
            >
              Sign out
            </Menu.Item>
          </>
        ) : (
          <Menu.Item
            leftSection={<SignInIcon />}
            component={Link}
            href={routes.usersSessions.new.path()}
          >
            Sign in
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item component="div" disabled pt={4}>
          <Text span size="xs">
            Server booted{" "}
            {bootedAt ? (
              <TimeAgo>{bootedAt}</TimeAgo>
            ) : (
              <Skeleton
                display="inline-block"
                height="min-content"
                width="fit-content"
                lh={1}
                style={{ verticalAlign: "middle" }}
              >
                <Text span inherit display="inline-block" lh={1}>
                  2 minutes ago
                </Text>
              </Skeleton>
            )}
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AppMenu;
