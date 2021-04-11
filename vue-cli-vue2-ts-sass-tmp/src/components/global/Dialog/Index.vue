<template>
  <div>
    <div
      v-if="content"
      v-html="content"
      class="content g-tac g-color-main"
    ></div>

    <slot name="content" />

    <slot name="footer">
      <DialogFooter v-bind="$attrs" v-on="$listeners"></DialogFooter>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Dialog extends Vue {
  @Prop({ type: String }) readonly content!: string
}
</script>

<style lang="sass" scoped>
.content
  margin-bottom: 20px
</style>
