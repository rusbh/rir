import { FC, type PropsWithChildren } from 'react'
import { type Page } from '@inertiajs/core'

import Toaster from './Toaster'
import { SharedPageProps } from '~/types';
import AppNavProgress from './AppNavProgress'
import AppMantineProvider from './AppMantineProvider'

export interface AppWrapperProps extends PropsWithChildren {
  initialPage: Page<SharedPageProps>
}

const AppWrapper: FC<AppWrapperProps> = ({ children }) => (
  <AppMantineProvider>
    <AppNavProgress />
    <Toaster />
    {children}
  </AppMantineProvider>
)

export default AppWrapper
