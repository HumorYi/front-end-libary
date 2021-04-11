<template>
  <div class="g-df-vc">
    <!-- <Tab
      v-if="openDayTab"
      :active="ownDaysActiveIndex"
      :list="days"
      class="tab-days g-df-vc g-bs-bb"
      @change="daysChange"
    ></Tab>

    <el-date-picker
      v-model="selectedDates"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      popper-class="g-datepicker"
      value-format="yyyy-MM-dd"
      :editable="editable"
      :default-value="defaultDates"
      :picker-options="options"
      @focus="dateFocus"
      @change="dateChange"
      class="datepicker"
      ref="datePicker"
    >
    </el-date-picker>

    <Help v-if="help" msg="双击选中当天日期"></Help> -->
  </div>
</template>

<script lang="ts">
/* import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator'
import {
  getCurrentDate,
  getPrevMonthDate,
  getDiffDay,
  toDate
} from '@globalUtils/date'

@Component
export default class DatePicker extends Vue {
  @Prop({ type: Boolean, default: true }) readonly help!: boolean
  @Prop({ type: Boolean, default: true }) readonly openDayTab!: boolean
  @Prop({ type: Boolean, default: false }) readonly editable!: boolean
  @Prop({ type: Date, required: true }) readonly currentDate!: Date
  @Prop({
    type: String,
    default() {
      return toDate(this.currentDate)
    }
  })
  readonly startDate!: string
  @Prop({ type: Number, default: 0 }) readonly daysActiveIndex!: number

  @Prop({
    type: Array,
    default() {
      return [
        {
          text: '近30天',
          day: 30,
          onClick(picker: any) {
            this['setShortcutsDate'](picker, this.day)
          }
        },
        {
          text: '近60天',
          day: 60,
          onClick(picker: any) {
            this['setShortcutsDate'](picker, this.day)
          }
        },
        {
          text: '近90天',
          day: 90,
          onClick(picker: any) {
            this['setShortcutsDate'](picker, this.day)
          }
        }
      ]
    }
  })
  readonly days!: {}[]

  @Prop({
    type: Object,
    default() {
      return {
        // shortcuts: this.openDayTab ? this.days : [],
        disabledDate: (date: Date) => {
          //设置选择今天以及今天以前的日期
          return date.getTime() > this.currentDate.getTime()
        }
      }
    }
  })
  readonly options!: {}

  ownDaysActiveIndex = 0
  defaultDates: string[] = []
  selectedDates: string[] = []

  get currentDateStr() {
    return getCurrentDate(this.currentDate)
  }

  @Emit('change')
  created(): {} {
    return this.init()
  }

  mounted(): void {
    // 将时间图标 替换成 日历图标
    this.$refs.datePicker['$el'].querySelector('.el-icon-time').className +=
      ' el-icon-date'
  }

  init(): {} {
    const currentDate = toDate(this.currentDate)
    const selectedDates = [this.startDate, currentDate]

    this.selectedDates = selectedDates
    this.setActiveDayIndex(this.startDate, currentDate)

    return { selected: selectedDates }
  }

  setActiveDayIndex(start: string, end: string): void {
    // 不是 近 n 天
    if (end !== this.currentDateStr) {
      this.ownDaysActiveIndex = -1
      return
    }

    let day = getDiffDay(start, end)

    if (day !== 0) {
      day += 1
    }

    for (let i = this.days.length - 1; i >= 0; i--) {
      if (this.days[i]['day'] === day) {
        this.ownDaysActiveIndex = i
        return
      }
    }

    this.ownDaysActiveIndex = -1
  }

  getDate(day = 0): string[] {
    const start = new Date(this.currentDate)
    const end = new Date(this.currentDate)

    start.setTime(start.getTime() - 1000 * 60 * 60 * 24 * day)

    return [toDate(start), toDate(end)]
  }

  setShortcutsDate(picker: any, day = 0): void {
    picker.$emit('pick', this.getDate(day))
  }

  dateFocus() {
    if (!this.selectedDates) {
      return
    }

    const end = this.selectedDates[1]
    this.defaultDates = [getPrevMonthDate(end), end]
  }

  emitChange(selected: string[]) {
    this.$emit('change', { selected })
  }

  dateChange(dates: any): void {
    if (dates === null) {
      return
    }

    const [start, end] = dates

    this.setActiveDayIndex(start, end)

    this.emitChange(dates)
  }

  daysChange(index: number) {
    const day = this.days[index]['day']
    this.ownDaysActiveIndex = index
    this.selectedDates = this.getDate(day === 0 ? day : day - 1)

    this.emitChange(this.selectedDates)
  }

  @Watch('daysActiveIndex')
  onDaysActiveIndex(val: number) {
    this.daysChange(val)
  }

  @Watch('startDate')
  onStartDate() {
    this.init()
  }
} */
</script>

<style lang="sass">
.datepicker
  &.el-date-editor--datetimerange.el-input__inner
    width: 220px

    .el-range-input
      width: 70px
      padding-left: 6px

      cursor: context-menu

    .el-range-input,
    .el-range-separator
      font-size: 12px

.tab.tab-days
  height: 36px
  margin-right: 20px
  padding: 4px

  background-color: #F5F5F5

  li
    width: 80px

    border-radius: 4px
    font-size: 12px
    background-color: #fff

    &:not(:last-child)
      margin-right: 4px

    &.active
      color: #fff
      background-color: #7F57FF
</style>
