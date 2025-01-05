import { BoxProps, Button, Center, Group, HoverCard, Stack, Text } from '@mantine/core';
import { ComponentPropsWithoutRef, FC } from 'react';

import { CodeIcon } from './icons';

export interface AttributionProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<'div'>, 'style' | 'children'> {}

const Attribution: FC<AttributionProps> = ({ ...otherProps }) => (
  <Center h="100%" {...otherProps}>
    <HoverCard withArrow>
      <HoverCard.Target>
        <Group justify="center" gap={4}>
          <Text size="xs" c="gray.6" fw={500}>
            Made by{' '}
            <Text span fw={700}>
              Rusbh
            </Text>
          </Text>
        </Group>
      </HoverCard.Target>
      <HoverCard.Dropdown style={({ radius }) => ({ borderRadius: radius.md })}>
        <Stack gap={6} align="center">
          <Text size="sm" lh={1.4}>
            Did you know this website is{' '}
            <Text span inherit fw={700}>
              open source
            </Text>
            ?
          </Text>
          <Button
            component="a"
            href="https://github.com/rusbh/rir"
            target="_blank"
            size="compact-xs"
            leftSection={<CodeIcon />}
            radius="xl"
            px={8}
            py={4}
          >
            Take me to the code!
          </Button>
        </Stack>
      </HoverCard.Dropdown>
    </HoverCard>
  </Center>
);

export default Attribution;
