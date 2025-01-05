import { usePageProps } from './inertia/page';

export const useCurrentUser = (): Schema.User | null => {
  const { currentUser } = usePageProps();
  return currentUser;
};

export const useAuthenticatedUser = (): Schema.User => {
  const currentUser = useCurrentUser();
  if (!currentUser) {
    throw new Error('User is not authenticated');
  }
  return currentUser;
};
