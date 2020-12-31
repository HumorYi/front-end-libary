import { Vue, Component } from 'vue-property-decorator'

import { showLogin, handleRouteAccessToken } from '@globalUtils/user'

@Component
export default class User extends Vue {
  showLogin = false

  created() {
    handleRouteAccessToken(this)

    setTimeout(() => {
      this.showLogin = showLogin(this['$route'])
    }, 50)
  }
}
