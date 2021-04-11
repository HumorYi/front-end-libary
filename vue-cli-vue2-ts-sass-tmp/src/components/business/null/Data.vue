<template>
  <div class="null-data-wrap" :class="{ exist: !exist }">
    <template v-if="!loading">
      <slot v-if="exist" />

      <section v-else class="g-tac null-data">
        <img :src="isSearch ? searchImgSrc : imgSrc" alt="" />

        <p v-if="tip || searchtip" class="g-color-desc tip">
          {{ isSearch ? searchtip : tip }}
        </p>
      </section>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NullData extends Vue {
  @Prop({ type: Boolean, required: true }) readonly loading!: boolean
  @Prop({ type: Boolean, required: true }) readonly exist!: boolean
  @Prop({ type: Boolean, default: false }) readonly isSearch!: boolean
  @Prop({ type: String }) readonly tip!: string

  @Prop({ type: String, default: '搜索结果为空，请输入其他筛选条件试试！' })
  readonly searchtip!: string

  @Prop({
    type: String /* ,
    default() {
      return require('@viewsImg/' + this.$route.name + '/null-data.png')
    } */
  })
  readonly imgSrc!: string

  @Prop({
    type: String /* ,
    default() {
      return require('@globalImg/search-null-data.png')
    } */
  })
  readonly searchImgSrc!: string
}
</script>

<style lang="sass" scoped>
.null-data-wrap
  .null-data
    padding-top: 60px
    margin: 0 auto

    .tip
      margin-top: 10px

  &.exist
    min-height: 250px
</style>
