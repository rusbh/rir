export { default as routes } from "./generated";

import { PathHelper } from "@js-from-routes/client";
import routes from "./generated";

export { setupRoutes } from "./setup";

export const homeRoute = (user: Schema.User): PathHelper =>
  routes.home.index;
