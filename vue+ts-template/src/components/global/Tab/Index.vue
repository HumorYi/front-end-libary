<template>
  <ul class="tab">
    <li
      v-for="(item, index) in list"
      :key="index"
      :class="{ active: index === active }"
      @click="change(index, params)"
    >
      <template v-if="typeof item === 'object'">
        <router-link
          v-if="item.routerName"
          :to="{
            name: item.routerName,
            params: item.params || {},
            query:
              // 往路由中注入一个参数，动态更改路由参数值 触发 跳转同名路由
              $route.name === item.routerName && force
                ? {
                    ...(item.query || {}),
                    __routerForceJump: Math.random()
                  }
                : item.query || {}
          }"
          :target="item.target || '_self'"
        >
          <TabItem :item="item" v-bind="$attrs" />
        </router-link>
        <a
          v-else-if="item.url"
          :href="item.url"
          :target="item.target || '_self'"
        >
          <TabItem :item="item" v-bind="$attrs" />
        </a>
        <TabItem v-else :item="item" v-bind="$attrs" />
      </template>
      <template v-else>
        <span>{{ item }}</span>
      </template>
    </li>
  </ul>
</template>

<script lang="ts">
import MixinTab from '@globalMixins/tab'
import { Component, Mixins } from 'vue-property-decorator'

@Component
export default class Tab extends Mixins(MixinTab) {}
</script>

<style lang="sass" scoped>
@import '@archSass/variables'

.tab
  display: flex
  align-items: center

  user-select: none

  li
    text-align: center
    font-size: 16px
    cursor: pointer
    color: #666

    &, >*
      width: 100%
      height: 100%
      display: flex
      align-items: center
      justify-content: center

    &.active
      color: #06f

  &.full-underline
    border-bottom: 1px solid #EBEFF5

  &.mb
    margin-bottom: 15px

  &.vertical
    li
      >*
        flex-direction: column

        img
          margin-bottom: 10px

        span
          color: #fff
          font-size: 18px

  &.underline
    li
      position: relative

      >*
        box-sizing: border-box
        padding-bottom: 12px

    &.hover li:hover,
    li.active
      color: #06f

      &:after
        content: ''
        width: 100%
        height: 2px
        position: absolute
        bottom: 0
        background-color: #06F

  &.vertical-line
    li:not(:last-child):after
      $mh: 20px

      content: ''

      display: inline-block
      width: 1px
      height: 14px
      margin-left: $mh
      margin-right: $mh

      background-color: $color-title

  &.width
    $ph: 20px

    li
      width: auto
      margin-right: 20px
      padding-left: $ph
      padding-right: $ph

      font-size: 14px
</style>
