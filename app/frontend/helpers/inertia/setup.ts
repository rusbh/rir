import { router } from "@inertiajs/core";
import { closeAllModals } from "@mantine/modals";

import { getMeta } from "../meta";

export const setupInertia = (): void => {
  router.on("before", ({ detail: { visit } }) => {
    const csrfToken = getMeta("csrf-token");
    if (csrfToken) {
      visit.headers["X-CSRF-Token"] = csrfToken;
    }
  });
  router.on("invalid", (event) => {
    const { response } = event.detail;
    const contentType = response.headers["Content-Type"];
    if (
      response.data &&
      typeof contentType === "string" &&
      contentType.startsWith("text/html")
    ) {
      event.preventDefault();
      console.error("Invalid Inertia response", event.detail.response.data);
    }
  });
  router.on("navigate", () => {
    closeAllModals();
  });
};
