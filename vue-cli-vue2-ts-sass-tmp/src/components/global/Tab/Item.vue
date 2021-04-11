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

    <span>{{ item.name || item.text }}</span>

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

    <template v-if="item.tabChecked">
      <section
        class="g-poa custom-checked"
        :class="{ 'custom-checked-active': isActive }"
      >
        <i
          v-if="item.tabChecked"
          class="g-poa"
          :class="{ 'g-icon-success': isActive }"
        ></i>
      </section>
    </template>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TabItem extends Vue {
  @Prop({ type: Object, required: true }) private item!: string
  @Prop({ type: String, default: 'left' }) readonly iconPosition!: string
  @Prop({ type: String, default: '' }) readonly iconClass!: string
  @Prop({ type: Number, default: false }) readonly isActive!: boolean
}
</script>

<style lang="sass">
.tab-item
  width: max-content

  .custom-checked
    right: 0
    bottom: 0

    $size: 12px
    width: $size
    height: $size

    border-radius: 6px 0px 3px 0px
    background-color: #E4E4E4

    &.custom-checked-active
      background-color: #fff

      .g-icon-success
        $border-width: 1px

        right: 3px
        bottom: 2px
        width: 4px
        height: 9px
        border-right-width: $border-width
        border-bottom-width: $border-width
        border-color: #7F57FF
</style>
