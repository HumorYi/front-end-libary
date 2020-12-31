<template>
  <footer class="g-df-c">
    <button class="g-btn main box" @click="confirm">
      {{ confirmBtnText }}
    </button>
    <button class="g-btn plain box" @click="close">
      {{ cancelBtnText }}
    </button>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

@Component
export default class DialogFooter extends Vue {
  @Prop({ type: String, default: '确定' }) readonly confirmBtnText!: string
  @Prop({ type: String, default: '取消' }) readonly cancelBtnText!: string

  @Emit()
  confirm() {}

  @Emit()
  close() {}
}
</script>

<style lang="sass" scoped>
.g-btn.main
  margin-right: 20px
</style>
