<template>
  <button class="g-btn main box" v-on="$listeners">
    <i v-if="isIconDirleft" class="iconfont" :class="iconClassName"></i>
    {{ btnText }}
    <i v-if="isIconDirRight" class="iconfont" :class="iconClassName"></i>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BtnIcon extends Vue {
  @Prop({ type: String, required: true }) readonly btnText!: string
  @Prop({ type: String, default: 'icon-lujing' })
  readonly iconClassName!: string
  @Prop({ type: String, default: 'left' })
  readonly iconDir!: string

  get isIconDirleft() {
    return this.iconDir === 'left'
  }

  get isIconDirRight() {
    return this.iconDir === 'right'
  }
}
</script>

<style lang="sass" scoped>
.iconfont
  font-size: 12px
  margin-right: 4px
</style>
