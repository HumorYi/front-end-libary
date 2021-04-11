import { Vue, Component } from 'vue-property-decorator'

import { handleRouteAccessToken } from '@globalUtils/user'

@Component
export default class User extends Vue {
  showLogin = false

  created() {
    handleRouteAccessToken(this)
  }

  mounted() {
    this.showLogin = true
  }
}
