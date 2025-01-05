import PageLayout from '~/components/PageLayout';

import { type PageComponent } from '.';
import { SharedPageProps } from '~/types';

export const preparePage = <Props extends SharedPageProps>(
  page: PageComponent<Props>
): void => {
  if (!page.layout) {
    page.layout = (children) => <PageLayout>{children}</PageLayout>;
  }
};
