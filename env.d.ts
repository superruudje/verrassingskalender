/// <reference types="vite/client" />
import 'vue-i18n'
import type { Composer } from 'vue-i18n'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: Composer['t']
    $n: Composer['n']
  }
}
