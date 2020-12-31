<template>
  <ul v-if="previewList.length > 0" class="drag-list">
    <li
      v-for="(item, i) in previewList"
      :key="i"
      :class="{ 'g-cursor-pointer': previewList.length > 1 }"
      :draggable="previewList.length > 1"
      @click="click($event, item)"
      @dragstart="dragstart(i)"
      @dragover="dragover($event)"
      @drop="drop($event, i)"
    >
      <slot :item="item" :i="i" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DragList extends Vue {
  @Prop({ type: Array, required: true }) readonly previewList!: any[]
  @Prop({ type: Array }) readonly dataList!: any[]

  originIndex!: number

  click(e: Event, item: any) {
    e.preventDefault()
    this.$emit('click', item)
  }

  dragstart(i: number) {
    this.originIndex = i
  }

  dragover(e: Event) {
    e.preventDefault()
  }

  drop(e: Event, i: number) {
    console.log('drop')
    e.preventDefault()

    this.dropList(this.previewList, i)

    if (this.dataList && this.dataList.length > 0) {
      this.dropList(this.dataList, i)
    }
  }

  dropList(list: any[], i: number) {
    const originData = list[this.originIndex]
    const targetData = list[i]

    list.splice(this.originIndex, 1, targetData)
    list.splice(i, 1, originData)
  }
}
</script>
