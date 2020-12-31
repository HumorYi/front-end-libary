<!--
  使用方式：
    调用：
      <pagination></pagination>

    参数：
      page: Number   // 当前数（必传）
      total: Number   // 总页数（必传）
      min:  Number    // 最少展示页数（默认 5）
      max:  Number    // 最多展示页数（默认 9）

    事件：
      jump
        说明：跳转页码事件
        参数：
          page  Number  跳转页码

  实现方式：
    根据判断页码跳转的区域，更改头尾指针位置，动态重置显示的页码数组

  example:
    <pagination :total="totalPage" @jump="jumpPage"></pagination>
-->
<template>
  <div v-if="this.total > 1" class="pagination-wrap">
    <div class="pagination g-df-c">
      <button v-if="page !== start" class="prev" @click="jump(page - 1)">
        &lt;
      </button>
      <div class="pages g-df-c">
        <button
          v-for="pageItem in pages"
          :key="pageItem"
          :class="{ active: page === pageItem }"
          @click="jump(pageItem)"
        >
          {{ pageItem }}
        </button>
      </div>
      <button v-if="page !== total" class="next" @click="jump(page + 1)">
        &gt;
      </button>
      <button v-if="total > min && tail !== total" @click="jump(total)">
        {{ total }}
      </button>
      <span>共{{ total }}页</span>
      <span>前往</span>
      <input type="number" v-model="input" @input="handleInput" />
      <span>页</span>
      <button
        :disabled="!input || input < 0 || input === page"
        @click="jump(input)"
        class="btn-jump"
      >
        跳转
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
  @Prop({ type: Number, required: true }) readonly total!: number
  @Prop({ type: Number, required: true }) readonly page!: number
  @Prop({ type: Number, default: 5 }) readonly min!: number
  @Prop({ type: Number, default: 9 }) readonly max!: number
  @Prop({ type: Number, default: 0 }) readonly scrollTop!: number

  pages: number[] = []
  input = ''
  start = 1
  head = 0
  tail = 0

  verify() {
    const reg = /[^\d]/g
    if (reg.test(this.min + '')) {
      throw new Error('最小显示页数min：' + this.min + '必须是一个正整数')
    }

    if (reg.test(this.max + '')) {
      throw new Error('最小显示页数max：' + this.max + '必须是一个正整数')
    }

    if (this.min < 1) {
      throw new Error(
        '最小显示页数min：' + this.max + '必须是一个大于或等于1的正整数'
      )
    }

    if (this.max < 1) {
      throw new Error(
        '最小显示页数max：' + this.max + '必须是一个大于或等于1的正整数'
      )
    }

    if (this.min > this.max) {
      throw new Error(
        '最小显示页数min：' +
          this.min +
          ' 必须小于或等于 最大显示页数max：' +
          this.max
      )
    }

    return true
  }

  init() {
    this.verify() && this.resetPages(this.page)
  }
  initPages() {
    const pages: number[] = []

    for (let i = this.head; i <= this.tail; i++) {
      pages.push(i)
    }

    this.pages = pages
  }
  handleInput() {
    const page = Number(this.input.replace(/[^\d]/g, ''))

    if (page > this.total) {
      this.input = this.total + ''
    }
  }
  jump(page: number | string) {
    page = Number(page)

    if (this.isForbiddenJump(page)) {
      return
    }

    this.$emit('jump', page)

    typeof this.scrollTop === 'number' && window.scrollTo(0, this.scrollTop)
  }
  isForbiddenJump(page: number) {
    return page === this.page || page < this.start || page > this.total
  }
  isResetPages() {
    return this.total > this.min
  }
  resetPages(page: number) {
    if (this.isJumpMinRange(page)) {
      this.jumpMinRange(page)
    } else if (this.isJumpMaxRangeAndTotalInMax(page)) {
      this.jumpMaxRangeAndTotalInMax()
    } else if (this.isJumpCenter(page)) {
      this.jumpCenter(page)
    } else {
      this.jumpLastRange(page)
    }
  }
  isJumpMinRange(page: number) {
    return page <= this.min
  }
  jumpMinRange(page: number) {
    let tail = this.getMinRangeTail(page)

    if (this.total <= this.max) {
      if (tail > this.total) {
        tail = this.total
      }
    } else {
      if (tail > this.max) {
        tail = this.max
      }
    }

    this.reset(1, tail)
  }
  getMinRangeTail(page: number) {
    const avgMin = Math.floor(this.min / 2)
    let count = page - avgMin + this.start
    count = count <= 0 ? 0 : count

    return this.min + count
  }
  isTailInMin(tail: number) {
    return tail < this.min
  }
  isJumpMaxRangeAndTotalInMax(page: number) {
    return page < this.max && this.total < this.max
  }
  jumpMaxRangeAndTotalInMax() {
    this.reset(1, this.total)
  }
  isJumpCenter(page: number) {
    const avgMax = Math.floor(this.max / 2)

    return this.total >= this.max && page + avgMax <= this.total
  }
  jumpCenter(page: number) {
    const avgMin = Math.floor(this.min / 2)
    const avgMax = Math.floor(this.max / 2)
    let head = page - avgMax
    let tail = page + avgMax

    if (page < avgMax) {
      head = 1
      tail = page + (page - avgMin + this.start)
    } else {
      head = head <= 0 ? 1 : head
    }

    this.reset(head, tail)
  }
  jumpLastRange(page: number) {
    const avgMax = Math.floor(this.max / 2)
    let head = page - avgMax

    if (this.total - head < this.min) {
      head = this.total - this.min + this.start
    }

    this.reset(head, this.total)
  }
  reset(head: number, tail: number) {
    this.head = head
    this.tail = tail
    this.initPages()
  }

  @Watch('page', { immediate: true })
  @Watch('total')
  @Watch('min')
  @Watch('max')
  onChange() {
    this.total > 1 && this.init()
  }
}
</script>

<style lang="sass" scoped>
.pagination-wrap
  $size: 36px

  height: $size
  min-width: 810px
  margin: 30px auto 0

  color: #999
  user-select: none

  .pagination
    height: 100%

    .pages
      height: 100%

    button, input
      height: 100%
      box-sizing: border-box
      border: 1px solid #e6e6e6

      border-radius: 5px
      font-size: 12px

      color: #666
      background-color: #fff
      box-shadow: 0 0 12px #eee

    button
      width: $size
      margin-left: 10px

      &.prev,
      &.next
        padding-left: 0
        padding-right: 0
        width: 36px

      &.btn-jump
        width: 60px

      &:not([disabled]):hover, &.active, &.btn-jump
        color: #fff
        background-color: #06F

    input
      box-sizing: border-box
      width: 60px
      text-align: center

    span
      margin-left: 4px
      margin-right: 4px
</style>
