import { type PageProps } from '@inertiajs/core'

export default interface SharedPageProps extends PageProps {
  csrf: {
    param: string
    token: string
  }
  flash: {
    notice?: string
    alert?: string
    // warning?: string
    success?: string
  }
  currentUser: Schema.User | null
}
