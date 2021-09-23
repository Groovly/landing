import { UserModule } from '../types'

// Module that imports and initializes polyfill to make
// smooth scrolling work on Apple's garbage browsers
export const install: UserModule = async ({ isClient }) => {
  if (isClient) {
    const smoothscroll = await import('smoothscroll-polyfill')
    smoothscroll.polyfill()
  }
}
