import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { FC, PropsWithChildren } from 'react'

import { THEME } from '~/helpers/mantine'

const AppMantineProvider: FC<PropsWithChildren> = ({ children }) => (
  <>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider theme={THEME} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  </>
)

export default AppMantineProvider
