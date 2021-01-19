<template>
  <div
    class="sidebar"
    :class="[
      { hover: $route.meta.openSidebarHover },
      $route.name.toLowerCase()
    ]"
  >
    <ul>
      <li v-if="$route.meta.showSidebarAdvisory" class="customer-service">
        <span class="wrap">
          <section class="qrcode-wrap g-por">
            <section class="qrcode g-tip right white">
              <img src="@viewsImg/index/custom-service-qrcode.png" alt="" />
            </section>
          </section>
          <section class="item">
            <i class="iconfont iconweixin1"></i>
            <span class="icon-title">企业微信</span>
          </section>
        </span>
      </li>
      <li class="scroll-top g-cursor-pointer">
        <Top :class="{ wrap: $route.meta.showSidebarIconTop }">
          <img
            v-if="!$route.meta.showSidebarIconTop"
            src="@globalImg/top.png"
            alt=""
          />
        </Top>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Sidebar extends Vue {}
</script>

<style lang="sass" scoped>
$width: 60px

@mixin screen($distance: 0)
  @media screen and (min-width: $max-width)
    margin-left: $max-width / 2 - ($width + $distance)

  @media screen and (max-width: $max-width)
    margin-left: calc(100% / 2 - #{$width + $distance})

.sidebar
  position: fixed
  left: 50%
  z-index: 1000

  &.index
    top: 50%
    transform: translateY(-50%)

    @include screen()

  &:not(.index)
    bottom: 80px

    @include screen(240px)

  >ul >li, .to-top
    border-radius: 5px 0px 0px 5px

  >ul
    width: $width

    >li
      position: relative
      height: 60px
      margin-bottom: 5px
      line-height: 60px
      text-align: center
      font-size: 16px

      .wrap
        $width: 60px

        position: absolute
        right: 0
        overflow: hidden
        height: 60px

        &, .item
          width: 60px
          border-top-left-radius: 5px
          border-bottom-left-radius: 5px
          transition: width 0.3s ease

        .iconfont, .icon-title
          vertical-align: middle
          display: inline-block

        &, .iconfont
          color: #fff

        .iconfont
          font-size: 20px

          + .icon-title
            margin-left: 15px

      &.customer-service
        .qrcode-wrap
          right: -10px
          display: none

        .item
          background: linear-gradient(90deg, #6653F2 0%, #5036C7 100%)

      &.scroll-top .wrap
        background: rgba(0, 0, 0, 0.5)

  &.hover >ul >li:hover

    &.customer-service .wrap
      overflow: visible
      display: flex

      .qrcode-wrap
        display: block

      .item
        overflow: hidden

    .wrap
      $width: 150px

      &, .item
        width: $width
</style>
