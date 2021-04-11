<template>
  <div class="icon-sort g-df-c g-cursor-pointer" v-on="$listeners">
    <span>{{ text }}</span>
    <section class="g-df-c column triangle-wrap">
      <span class="g-triangle top" :class="{ active: dir === 'asc' }"></span>
      <span
        class="g-triangle bottom"
        :class="{ active: dir === 'desc' }"
      ></span>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class IconSort extends Vue {
  @Prop({ type: String, required: true }) readonly text!: string
  @Prop({ type: String, required: true }) readonly dir!: string
}
</script>

<style lang="sass" scoped>
.icon-sort
  user-select: none

.triangle-wrap
  margin-left: 4px

  .g-triangle
    $borderSize: 4px
    $activeBorderColor: #06f

    border-left-width: $borderSize
    border-right-width: $borderSize

    &.top
      margin-bottom: 2px
      border-bottom-width: $borderSize

      &.active
        border-bottom-color: $activeBorderColor

    &.bottom
      border-top-width: $borderSize

      &.active
        border-top-color: $activeBorderColor
</style>
