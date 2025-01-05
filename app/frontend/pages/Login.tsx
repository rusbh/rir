import { Link } from "@inertiajs/react";
import {
  Anchor,
  Card,
  Center,
  Divider,
  List,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import LoginForm from "~/components/LoginForm";
import { PageComponent } from "~/helpers/inertia";
import { routes } from "~/helpers/routes";
import { SharedPageProps } from "~/types";

export interface LoginProps extends SharedPageProps {
  failed: boolean;
}

const Login: PageComponent<LoginProps> = () => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack align="center" gap={2}>
        <Title size="h3">Sign in</Title>
        <Text size="sm" c="dimmed" lh={1.3}>
          Welcome back to{" "}
          <Anchor
            component={Link}
            href={routes.home.index.path()}
            fw={600}
            c="primary.4"
          >
            rir
          </Anchor>
        </Text>
      </Stack>
      <LoginForm />
      <Text size="xs" c="gray.6">
        Don&apos;t have an account?{" "}
        <Anchor component={Link} href={routes.usersRegistrations.new.path()}>
          Sign up instead.
        </Anchor>
      </Text>
      <Divider />
      <List listStyleType="none" fz="xs">
        <List.Item>
          <Text span inherit c="gray.6">
            <Anchor
              component={Link}
              href={routes.usersPasswords.new.path()}
              inherit
            >
              Forgot your password?
            </Anchor>
          </Text>
        </List.Item>
        <List.Item>
          <Text span inherit c="gray.6">
            <Anchor
              component={Link}
              href={routes.usersConfirmations.new.path()}
              inherit
            >
              Didn&apos;t get a verification email?
            </Anchor>
          </Text>
        </List.Item>
      </List>
    </Stack>
  </Card>
);

Login.layout = (page) => (
  <AppLayout title="Sign in">
    <Center style={{ flexGrow: 1 }}>{page}</Center>
  </AppLayout>
);

export default Login;
