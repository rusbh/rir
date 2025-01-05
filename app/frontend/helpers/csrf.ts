import { usePageProps } from "./inertia/page";

export const useCSRFToken = (): string => {
  const {
    csrf: { token },
  } = usePageProps();
  return token;
};
