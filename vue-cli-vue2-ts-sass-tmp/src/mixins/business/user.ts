import { Vue, Component } from 'vue-property-decorator'

// TODO: 暂代api，记得改
const getUser = async function(): Promise<{}> {
  return {}
}
// import { getUser } from '@api/User/index.ts'

import {
  setAllPermission,
  setAssignPermission,
  handleRouterJump
} from '@bizUtils/role'

import { transformPermission } from '@bizUtils/role'

@Component
export default class User extends Vue {
  accessibleMobiles: string[] = []

  hideAccessRouterNames: string[] = ['']

  get accessAuth() {
    return this.accessibleMobiles.includes(this.userMobile)
  }

  get user() {
    return this.$root['user']
  }

  get userMobile() {
    return this.user.mobile
  }

  filterAccessList(list: {}[]) {
    if (this.accessAuth || this.hideAccessRouterNames.length === 0) {
      return list
    }

    return list.filter(
      (item: {}) => !this.hideAccessRouterNames.includes(item['routerName'])
    )
  }

  async getUser() {
    const data = await getUser()

    this.setUser(data)

    this.handleAccountPermission(this.user)
  }

  handleAccountPermission(account: {}) {
    const routerOptions = this.$router.options
    const routes = routerOptions && routerOptions.routes
    if (!routes) {
      return
    }

    if (account['hadAllPermission']) {
      setAllPermission(routes)

      return
    }

    const firstAccessAuthRoute = setAssignPermission(
      routes,
      account['permissions']
    )

    handleRouterJump(this.$router, this.$route, firstAccessAuthRoute)
  }

  setUser(data: {}) {
    this.$root['user'] = {
      permissions: transformPermission(data['permissions'])
    }
  }
}
