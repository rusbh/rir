import { router } from "@inertiajs/react";
import { Card, Center, Stack, Text, Title } from "@mantine/core";

import AccountDeleteAccountForm from "~/components/AccountDeleteAccountForm";
import AccountEmailForm from "~/components/AccountEmailForm";
import AccountPasswordForm from "~/components/AccountPasswordForm";
import AccountProfileForm from "~/components/AccountProfileForm";
import AppLayout from "~/components/AppLayout";
import { PageComponent } from "~/helpers/inertia";

import { routes } from "~/helpers/routes";

const AccountPage: PageComponent = () => (
  <Stack>
    <Card withBorder>
      <Stack gap="sm">
        <Center>
          <Title order={2} size="h4" lh="xs">
            Your profile
          </Title>
        </Center>
        <AccountProfileForm
          onProfileUpdated={() => {
            router.reload({ only: ["currentUser"] });
          }}
        />
      </Stack>
    </Card>
    <Card withBorder>
      <Stack gap="sm">
        <Stack align="center" gap={0}>
          <Title order={2} size="h4" lh="xs">
            Email address
          </Title>
          <Text size="sm" c="dimmed" lh="xs">
            Change your account email address
          </Text>
        </Stack>
        <AccountEmailForm
          onEmailChanged={() => {
            router.reload({ only: ["currentUser"] });
          }}
        />
      </Stack>
    </Card>
    <Card withBorder>
      <Stack gap="sm">
        <Stack align="center" gap={0}>
          <Title order={2} size="h4" lh="xs">
            Password
          </Title>
          <Text size="sm" c="dimmed" lh="xs">
            Change your login password
          </Text>
        </Stack>
        <AccountPasswordForm />
      </Stack>
    </Card>
    <Card withBorder bd="red.outline">
      <Stack gap="sm">
        <Stack align="center" gap={0} lh="xs">
          <Title order={2} size="h4">
            Danger zone
          </Title>
          <Text size="sm" c="dimmed" lh="xs">
            Destructive actions, and the like.
          </Text>
        </Stack>
        <AccountDeleteAccountForm />
      </Stack>
    </Card>
  </Stack>
);

AccountPage.layout = (page) => (
  <AppLayout
    title="Account"
    breadcrumbs={[
      { title: "Home", href: routes.home.index.path() },
      { title: "Account", href: routes.usersRegistrations.edit.path() },
    ]}
    withContainer
    withGutter
    containerSize={440}
  >
    {page}
  </AppLayout>
);

export default AccountPage;
