<template>
  <section class="tab-item">
    <img v-if="item.img" :src="item.img" alt="" />

    <i
      v-if="
        (item.iconClass || iconClass) &&
          (item.iconPosition === 'left' || iconPosition === 'left')
      "
      class="iconfont"
      :class="[
        item.iconClass ? item.iconClass : '',
        iconPosition ? iconPosition : '',
        iconClass ? iconClass : ''
      ]"
    ></i>

    <span>{{
      (item.name || item.text) +
        (item.count !== undefined ? '（' : '') +
        (item.count !== undefined ? item.count : '') +
        (item.count !== undefined ? '）' : '')
    }}</span>

    <i
      v-if="
        (item.iconClass || iconClass) &&
          (item.iconPosition === 'right' || iconPosition === 'right')
      "
      class="iconfont"
      :class="[
        item.iconClass ? item.iconClass : '',
        iconPosition ? iconPosition : '',
        iconClass ? iconClass : ''
      ]"
    ></i>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TabItem extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: string
  @Prop({ type: String, default: 'left' }) readonly iconPosition!: string
  @Prop({ type: String, default: '' }) readonly iconClass!: string
}
</script>

<style lang="sass" scoped>
.tab-item
  width: max-content
</style>
