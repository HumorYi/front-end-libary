<template>
  <ul class="tab g-df-vc">
    <li
      v-for="(item, index) in list"
      :key="index"
      class="g-por"
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
                    _time: new Date().getTime() / 1000
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
        <IconSort
          v-else-if="item.dir !== undefined"
          :text="item.name || item.text"
          :dir="item.dir"
        />
        <TabItem
          v-else
          :item="item"
          :isActive="index === active"
          v-bind="$attrs"
        />
      </template>
      <template v-else>
        <span>{{ item }}</span>
      </template>
    </li>
  </ul>
</template>

<script lang="ts">
import MixinsTab from '@globalMixins/tab'
import { Component, Mixins } from 'vue-property-decorator'

@Component
export default class Tab extends Mixins(MixinsTab) {}
</script>

<style lang="sass" scoped>
.tab
  user-select: none

  li
    text-align: center
    font-size: 16px
    cursor: pointer

    &,
    >*
      height: 100%
      display: flex
      align-items: center
      justify-content: center

    >*
      min-width: 100%

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
        padding-bottom: 10px

    &.hover li:hover,
    li.active
      &:after
        content: ''
        min-width: 100%
        height: 2px
        position: absolute
        bottom: 0
        left: 0
        background-color: #7F57FF
</style>
