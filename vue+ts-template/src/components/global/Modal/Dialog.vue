<template>
  <Modal v-bind="$attrs" v-on="$listeners">
    <Dialog v-bind="$attrs" v-on="$listeners">
      <template v-slot:content>
        <slot name="content" />
      </template>
      <template v-slot:footer>
        <slot name="footer" />
      </template>
    </Dialog>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  inheritAttrs: false
})
export default class ModelDialog extends Vue {}
</script>
