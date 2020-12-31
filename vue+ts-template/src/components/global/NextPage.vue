<template>
  <div
    class="g-container next-page-wrap"
    :class="{ loading: loading }"
    ref="nextPage"
  >
    <button v-if="open && !loading" @click="next">下一页</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Emit, Vue } from 'vue-property-decorator'

@Component
export default class NextPage extends Vue {
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean
  @Prop({ type: Boolean, required: true }) readonly open!: boolean
  @Ref('loading') readonly nextPage!: HTMLDivElement

  @Emit()
  next() {
    return this.$refs.nextPage
  }
}
</script>

<style lang="sass" scoped>
.next-page-wrap
  margin: 0 auto 50px
  text-align: center

  button
    width: 300px
    height: 44px
    border-radius: 5px
    font-size: 16px
    color: #fff
    background-color: #7f57ff

  &.loading
    position: relative
    height: 100px
</style>
