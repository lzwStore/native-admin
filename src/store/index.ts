import { useUserStore } from './modules/user'
import { useAppStore } from './modules/app'
import { useConfigStore } from './modules/config'
import { useTabsViewStore } from './modules/tabsView'

const useStore = () => ({
  app: useAppStore(),
  user: useUserStore(),
  config: useConfigStore(),
  tabsView: useTabsViewStore()
})

export default useStore
