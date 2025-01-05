import AppLayout from "~/components/AppLayout";
import { SharedPageProps } from "~/types";
import { PageComponent } from "~/helpers/inertia";
import { Center } from "@mantine/core";

interface HomePageProps extends SharedPageProps {
  name: string;
}

const Home: PageComponent<HomePageProps> = ({ name }) => {
  return (
    <>
      <Center>
        <h1>Hello {name}</h1>
      </Center>
    </>
  );
};

Home.layout = (page) => (
  <AppLayout title={undefined} withGutter withContainer>
    {page}
  </AppLayout>
);

export default Home;
