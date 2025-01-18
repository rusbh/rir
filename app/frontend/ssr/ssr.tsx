import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { SetupOptions } from "node_modules/@inertiajs/react/types/createInertiaApp";
import { renderToString as renderPage } from "react-dom/server";

import { PageComponent, parsePageImports } from "~/helpers/inertia";

import AppWrapper from "~/components/AppWrapper";
import { preparePage } from "~/helpers/inertia/page/server";

import { setupLuxon } from "~/helpers/luxon";
import { SharedPageProps } from "~/types";

setupLuxon();

const pageImports = import.meta.glob("~/pages/**/*.tsx", {
  import: "default",
  eager: true,
}) as Record<string, PageComponent>;

const pages = parsePageImports(pageImports);

createServer((page) =>
  createInertiaApp({
    page,
    render: (page): string => {
      return renderPage(page);
    },
    resolve: (name) => {
      const page = pages[name];
      preparePage(page);
      return page;
    },
    setup: ({ App, props }: SetupOptions<null, SharedPageProps>) => {
      const { initialPage } = props;
      const app = <App {...props} />;
      return <AppWrapper {...{ initialPage }}>{app}</AppWrapper>;
    },
  })
);
