<template>
  <div class="null-search">
    <img src="@globalImg/null-search.png" alt="" />
    <p v-if="title" class="g-color-desc null-tip">{{ title }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NullSearch extends Vue {
  @Prop({ type: String, default: '抱歉，暂无搜索结果!' })
  readonly title!: string
}
</script>

<style lang="sass" scoped>
.null-search
  margin-top: 60px
  text-align: center

  .null-tip
    margin-top: 16
</style>
