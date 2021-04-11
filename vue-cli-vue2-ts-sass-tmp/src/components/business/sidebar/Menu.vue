<template>
  <aside class="sidebar g-pof g-oxh g-oya">
    <!-- <section class="g-df-vc logo-wrap">
      <img src="@globalImg/logo.png" alt="" />
      <span class="platform"></span>
    </section>

    <a-menu
      v-if="sidebar.length > 0"
      :selectedKeys="[$route.name]"
      :mode="mode"
      :inlineIndent="inlineIndent"
    >
      <a-menu-item v-for="item in sidebar" :key="item.routerName">
        <router-link
          :key="item.routerName"
          :to="{
            name: item.routerName,
            query:
              $route.name === item.routerName
                ? { __routerForceJump: Math.random() }
                : {}
          }"
        >
          <i class="iconfont" :class="item.iconClassName"></i>
          <span>{{ item.title }}</span>
        </router-link>
      </a-menu-item>
    </a-menu> -->
  </aside>
</template>

<script lang="ts">
/* import { Component, Mixins, Watch } from 'vue-property-decorator'

import { getSidebar, hadAccessAuth } from '@bizUtils/route-auth'
import MixinUser from '@bizMixins/user'

@Component
export default class Sidebar extends Mixins(MixinUser) {
  mode = 'inline'
  inlineIndent = 0

  sidebar: {}[] = []

  // 获取到用户信息时，更新侧边栏
  @Watch('$root.user')
  onChangeUser(val: {}) {
    const sidebar = getSidebar()
    if (val['hadAllPermission']) {
      this.sidebar = this.filterAccessList(sidebar)
      return
    }

    const accessAuthSidebar: {}[] = []

    val['permissions'].forEach((permission: {}) => {
      for (let i = sidebar.length - 1; i >= 0; i--) {
        const item = sidebar[i]

        if (item['routerName'] === permission['routerName']) {
          sidebar.splice(i, 1)

          if (hadAccessAuth(permission['permission'])) {
            accessAuthSidebar.push(item)
          }
        }
      }
    })

    this.sidebar = this.filterAccessList(accessAuthSidebar)
  }
} */
</script>

<style lang="sass" scoped>
@import '@bizSass/variables'

.sidebar
  z-index: 1000
  top: 0
  left: 0

  width: $sidebar-width
  height: 100%

  background-image: url('~@globalImg/sidebar-bg.png')
  background-color: #06F

  .platform
    margin-left: 10px
    font-size: 24px
    color: #fff

  .logo-wrap
    height: $header-height
    padding-left: 22px
    background-color: #005CE6

  .ant-menu
    background-color: unset

    &:not(.ant-menu-horizontal) .ant-menu-item-selected,
    .ant-menu-item-active:active,
    .ant-menu-item-active:hover
      background-color: #2491FF

  .ant-menu-inline
    border: 0

    .ant-menu-item-selected,
    .ant-menu-item-selected>a,
    .ant-menu-item-selected>a:hover,
    .ant-menu-item,
    .ant-menu-item > a
      font-size: 16px
      color: #fff

    .ant-menu-item-active:after
      transform: scaleY(1)
      opacity: 1
      transition: transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1)

    .ant-menu-item
      padding: 0
      height: 60px
      line-height: 60px
      margin: 0

      > a
        display: flex
        align-items: center
        padding-left: 28px

        .iconfont
          margin-right: 10px
          font-size: 20px

      &:after
        right: 100%
        left: 0
        border-right-color: #91C8FF
</style>
