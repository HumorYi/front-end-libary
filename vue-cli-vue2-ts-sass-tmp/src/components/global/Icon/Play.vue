<template>
  <div
    class="g-poa-center-before g-cursor-pointer play-icon"
    v-on="$listeners"
  ></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class IconPlay extends Vue {}
</script>

<style lang="sass" scoped>
.play-icon
  $size: 24px
  $borderSize: 6px
  $borderSizeH: $borderSize * 1.7

  width: $size
  height: $size
  border-radius: 50%

  background-color: rgba(0, 0, 0, 0.8)

  &:before
    content: ''
    position: absolute

    margin-left: 7px

    border-bottom: $borderSize solid transparent
    border-top: $borderSize solid transparent
    border-left: $borderSizeH solid #fff
    border-right: $borderSizeH solid transparent
</style>
