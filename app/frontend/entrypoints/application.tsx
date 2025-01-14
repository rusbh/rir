import { createInertiaApp } from "@inertiajs/react";
import { ReactNode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import AppWrapper from "~/components/AppWrapper";
import { setupInertia } from "~/helpers/inertia";
import { setupLuxon } from "~/helpers/luxon";
import { setupActiveStorage } from "~/helpers/activestorage";
import { SharedPageProps } from "~/types";
// Temporary type definition, until @inertiajs/react provides one
type ResolvedComponent = {
  default: ReactNode;
  layout?: (page: ReactNode) => ReactNode;
};

setupInertia();
setupLuxon();
setupActiveStorage();

document.addEventListener("DOMContentLoaded", () => {
  createInertiaApp<SharedPageProps>({
    progress: false,
    resolve: (name) => {
      const pages = import.meta.glob<ResolvedComponent>("../pages/**/*.tsx", {
        eager: true,
      });
      const page = pages[`../pages/${name}.tsx`];
      if (!page) {
        console.error(`Missing Inertia page component: '${name}.tsx'`);
      }
      return page;
    },

    setup: ({ App, el, props }) => {
      const { initialPage } = props;
      const app = (
        <AppWrapper {...{ initialPage }}>
          <App {...props} />
        </AppWrapper>
      );
      if (el.hasChildNodes()) {
        hydrateRoot(el, app);
      } else {
        createRoot(el).render(app);
      }
    },
  });
});
