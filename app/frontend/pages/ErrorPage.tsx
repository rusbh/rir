import { Link } from "@inertiajs/react";
import { Badge, Button, Code, Stack, Text, Title } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import { PageComponent } from "~/helpers/inertia";
import { routes } from "~/helpers/routes";
import { SharedPageProps } from "~/types";

export interface ErrorPageProps extends SharedPageProps {
  title: string;
  description: string;
  code: number;
  error: string | null;
}

const ErrorPage: PageComponent<ErrorPageProps> = ({
  code,
  description,
  error,
  title,
}) => (
  <Stack align="center">
    <Badge variant="outline" color="red">
      Status {code}
    </Badge>
    <Stack align="center" gap={2}>
      <Title size="h2">{title}</Title>
      <Text c="dimmed" ta="center">
        {description}
      </Text>
    </Stack>
    {!!error && (
      <Code block style={{ alignSelf: "stretch", textTransform: "none" }}>
        Error: {error}
      </Code>
    )}
    <Button component={Link} href={routes.home.index.path()} mt={4}>
      Back to Home
    </Button>
  </Stack>
);

ErrorPage.layout = page => (
  <AppLayout<ErrorPageProps>
    title={({ title }) => title}
    description={({ description }) => description}
    withContainer
    containerSize="xs"
    containerProps={{ my: "xl" }}
  >
    {page}
  </AppLayout>
);

export default ErrorPage;
