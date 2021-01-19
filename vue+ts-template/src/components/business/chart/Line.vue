<template>
  <div class="line" ref="line"></div>
</template>

<script lang="ts">
/* import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import echarts from 'echarts'

@Component
export default class ChartLine extends Vue {
  @Prop({ type: Array, required: true }) readonly xList!: any[]
  @Prop({ type: Array, required: true }) readonly yList!: any[]
  @Prop({ type: Function, required: true }) readonly formatter!: Function
  // @Prop({ type: Number, default: 0 }) readonly xLabelInterval!: number

  chart!: object
  change = false

  mounted() {
    const ref: any = this.$refs.line
    this.chart = echarts.init(ref)

    this.update()
  }

  getOption() {
    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'unset',
        formatter: (params: any) => this.formatter(params)
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.xList,
        offset: 10,
        axisLine: {
          lineStyle: {
            width: 1,
            type: 'solid',
            color: '#E1E4E6'
          }
        },
        axisLabel: {
          // interval: this.xLabelInterval
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        offset: 20
      },
      grid: [
        {
          bottom: '10%'
        }
      ],
      series: [
        {
          type: 'line',
          data: this.yList,
          symbolSize: 8,
          symbol: 'circle',
          color: '#7F57FF',
          emphasis: {
            itemStyle: {
              symbolSize: 12,
              color: '#7F57FF',
              borderWidth: 2,
              borderColor: '#fff',
              shadowColor: 'rgba(127,87,255, 0.5)',
              shadowBlur: 10
            }
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(127,87,255,0)'
              },
              {
                offset: 1,
                color: 'rgba(127,87,255,1)'
              }
            ])
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fff',
              label: {
                show: true,
                position: 'top',
                color: '#333'
              },
              lineStyle: {
                width: 3,
                type: 'solid',
                color: '#7F57FF'
              }
            }
          }
        }
      ],
      textStyle: {
        color: '#999'
      }
    }
  }

  update() {
    this.chart['setOption'](this.getOption())
    this.change = false
  }

  @Watch('xList')
  @Watch('yList')
  onChangeList() {
    // 防止两个坐标同时改变时执行两次
    if (this.change === false) {
      this.change = true
      this.update()
    }
  }
} */
</script>

<style lang="sass" scoped>
.line
  width: 100%
  height: 320px
</style>
