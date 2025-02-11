import EmailLayout from "~/components/EmailLayout";
import PageLayout from "~/components/PageLayout";
import { PageComponent, PageType } from "~/helpers/inertia/page";
import { SharedPageProps } from "~/types";

export const preparePage = <Props extends SharedPageProps>(
  page: PageComponent<Props>,
  type: PageType,
): void => {
  if (!page.layout) {
    if (type == PageType.Email) {
      page.layout = (children) => <EmailLayout>{children}</EmailLayout>;
    } else {
      page.layout = (children) => <PageLayout>{children}</PageLayout>;
    }
  }
};
