import { Vue, Component } from 'vue-property-decorator'

// TODO: 暂代api，记得改
const getUser = async function(): Promise<{}> {
  return {}
}
// import { getUser } from '@api/User/index.ts'

import { isMainAccount } from '@bizUtils/user'

import {
  setAllPermission,
  setAssignPermission,
  handleRouterJump
} from '@bizUtils/role'

import { transformPermission } from '@bizUtils/role'

@Component
export default class User extends Vue {
  accessibleMobiles: string[] = []

  hideAccessRouterNames: string[] = ['PromoteMakeMoney']

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

    // 主账号拥有所有权限
    if (isMainAccount(account['type'])) {
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
      mobile: data['phone'],
      balance: Number(data['cash']),
      type: data['account_type'],
      avatar: data['avatar'] || require('@globalImg/user-avatar.png'),
      lastLoginIp: data['last_ip'],
      lastLoginIpLocation: data['ip_location'],
      lastLoginDatetime: data['last_time'],
      seller_id: data['seller_id'],
      qq: data['qq'],
      agentBillDomain: data['agent_domain'],
      permissions: transformPermission(data['rights']),
      isShowMonthlyCard: Boolean(data['is_show_monthly_card']),
      isBuyMonthlyCard: Boolean(data['is_buy_monthly_card']),
      activityType: data['activity_type'],
      agentRenewMonthMoney: data['agent_amount'],
      taobaoAuthExpireDatetime: data['taobao_expire_date'],
      settlementAmount: data['untreated'],
      withdrawAmount: Number(data['withdrawal']),
      popularize: data['popularize']
    }
  }
}
