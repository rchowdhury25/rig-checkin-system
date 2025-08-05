import { registerSW } from 'virtual:pwa-register'
export const updateSW = registerSW({
  onNeedRefresh() { /* prompt user to reload */ },
  onOfflineReady() { console.log('App ready to work offline') }
})
