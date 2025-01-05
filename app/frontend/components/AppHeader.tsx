import {
  AppShell,
  type AppShellHeaderProps,
  Burger,
  Button,
  Group,
} from '@mantine/core';
import { Image } from '@mantine/core';
import { Link } from '@inertiajs/react';
import { forwardRef } from 'react';

// import logoSrc from '~/assets/images/logo-circle.png';
import { useSidebarControls } from '~/helpers/sidebar';
// import AppMenu from './AppMenu';
// import CurrentlyPlayingIsland from './CurrentlyPlayingIsland';
import classes from './AppHeader.module.css';
import { cn } from '~/lib/utils';
import AppMenu from './AppMenu';
import { routes } from '~/helpers/routes';

export interface AppHeaderProps extends Omit<AppShellHeaderProps, 'children'> {}

const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>(
  ({ className, ...otherProps }, ref) => {
    const sidebarControls = useSidebarControls();
    return (
      <AppShell.Header
        {...{ ref }}
        px={8}
        className={cn('AppHeader-root', className)}
        {...otherProps}
      >
        <Group justify="space-between" gap={8} h="100%">
          <Group gap={8}>
            {sidebarControls && (
              <Burger
                opened={sidebarControls.opened}
                onClick={sidebarControls.toggle}
                hiddenFrom="sm"
                size="sm"
              />
            )}
            <Button
              component={Link}
              href={routes.home.index.path()}
              variant="subtle"
              size="compact-md"
              // leftSection={<Image src={logoSrc} w={24} />}
              h="unset"
              py={2}
              px={4}
              fw={800}
              fz="md"
              className={classes.logoButton}
            >
              Rir
            </Button>
          </Group>
          {/* <CurrentlyPlayingIsland /> */}
          <AppMenu style={{ flexShrink: 0 }} />
        </Group>
      </AppShell.Header>
    );
  }
);

export default AppHeader;
