import { App } from 'vue'
import { SFCWitchInstall } from '@/utils/types'
import Switch from './index.vue'

Switch.install = (app: App) => {
  app.component(Switch.name, Switch)
}

const _Switch: SFCWitchInstall<typeof Switch> = Switch

export default _Switch