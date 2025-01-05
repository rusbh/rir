import { useWindowEvent } from '@mantine/hooks'
import invariant from 'tiny-invariant'
import { FC, useEffect } from 'react'
import { toast } from 'sonner'
import { pick } from 'lodash-es'

import { usePageProps } from '~/helpers/inertia'

const AppFlash: FC = () => {
  // Clear flash messages when going back in history
  useWindowEvent('popstate', ({ state }) => {
    if (state instanceof Object && 'props' in state) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { props } = state
      invariant(
        props instanceof Object,
        'Expected `state.props` to be an Object'
      )
      if (props && 'flash' in props) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        props.flash = {}
      }
    }
  })

  // Show flash messages
  const { flash } = usePageProps()
  useEffect(() => {
    if (flash) {
      const messages = pick(flash, 'notice', 'alert', 'success')
      Object.entries(messages).forEach(([type, message]) => {
        if (message) {
          switch (type) {
            case 'notice':
              toast.info(message)
              break
            case 'alert':
              toast.error(message)
              break
            case 'success':
              toast.success(message)
              break
            default:
              toast(message)
          }
        }
      })
    }
  }, [flash])

  return null
}

export default AppFlash
