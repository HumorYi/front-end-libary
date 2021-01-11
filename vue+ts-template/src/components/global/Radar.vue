<template>
  <div class="radar-container-wrap g-tac">
    <ul class="g-poa-center radar-container">
      <li
        v-for="i in count"
        :key="i"
        class="g-animation-radar"
        :style="{ animationDelay: i + delay + 's' }"
      ></li>
    </ul>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Radar extends Vue {
  @Prop({ type: Number, default: 3 }) readonly count!: number
  @Prop({ type: Number, default: -1 }) readonly delay!: number
}
</script>

<style lang="sass" scoped>
.radar-container-wrap
  position: relative

  .radar-container
    z-index: 0
    border-radius: 50%

    li
      position: absolute
      width: 100%
      height: 100%
      border-radius: inherit

    + *
      position: relative
</style>
