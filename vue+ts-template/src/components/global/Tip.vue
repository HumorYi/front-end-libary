<template>
  <div class="g-tip" :class="[direction, recommend ? 'recommend' : '']">
    <slot>
      <span v-if="msg">{{ msg }}</span>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Tip extends Vue {
  @Prop() readonly msg!: any
  @Prop({ type: String, default: 'left' }) readonly direction!: string
  @Prop({ type: Boolean, default: true }) readonly recommend!: string
}
</script>
