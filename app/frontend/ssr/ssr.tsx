import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { SetupOptions } from "node_modules/@inertiajs/react/types/createInertiaApp";
import { renderToString as renderPage } from "react-dom/server";
import { render as renderEmail } from "@react-email/render";
import { isValidElement } from "react";

import {
  PageComponent,
  PageType,
  parsePageImports,
  resolvePageType,
} from "~/helpers/inertia";

import AppWrapper from "~/components/AppWrapper";
import EmailWrapper from "~/components/EmailWrapper";
import { preparePage } from "~/helpers/inertia/page/server";

import { setupLuxon } from "~/helpers/luxon";
import { SharedPageProps } from "~/types";
import invariant from "tiny-invariant";

setupLuxon();

const pageImports = import.meta.glob("~/pages/**/*.tsx", {
  import: "default",
  eager: true,
}) as Record<string, PageComponent>;
const pages = parsePageImports(pageImports);

const emailImports = import.meta.glob("~/emails/**/*.tsx", {
  import: "default",
  eager: true,
}) as Record<string, PageComponent>;
const emails = parsePageImports(emailImports);

createServer(async (page) => {
  const type = resolvePageType(page.component);
  return createInertiaApp({
    page,
    render: (page): string => {
      switch (type) {
        case PageType.Page: {
          return renderPage(page);
        }
        case PageType.Email: {
          invariant(isValidElement(page), "Page is not a valid element");
          return renderEmail(page);
        }
      }
    },
    resolve: (name) => {
      switch (type) {
        case PageType.Page: {
          const page = pages[name];
          if (!page) {
            throw new Error(`Missing page '${name}'`);
          }
          preparePage(page, type);
          return page;
        }
        case PageType.Email: {
          const email = emails[name];
          if (!email) {
            throw new Error(`Missing email '${name}'`);
          }
          preparePage(email, type);
          return email;
        }
      }
    },
    setup: ({ App, props }: SetupOptions<null, SharedPageProps>) => {
      const { initialPage } = props;
      const pageType = resolvePageType(initialPage.component);
      const app = <App {...props} />;
      switch (pageType) {
        case PageType.Page:
          return <AppWrapper {...{ initialPage }}>{app}</AppWrapper>;
        case PageType.Email:
          return <EmailWrapper>{app}</EmailWrapper>;
      }
    },
  });
});
