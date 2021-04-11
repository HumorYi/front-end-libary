import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Tab extends Vue {
  @Prop({ type: Array, required: true }) readonly list!: any[]
  @Prop({ type: Number, default: 0 }) readonly active!: number
  @Prop({ type: Boolean, default: true }) readonly open!: boolean
  @Prop({ type: Boolean, default: false }) readonly force!: boolean
  @Prop() readonly params!: any

  change(index: number): void {
    if (!this.open || (!this.force && this.active === index)) {
      return
    }

    const current = this.list[index]
    const isObjectCurrent = typeof current === 'object'

    // 跳外链开新页不触发改变事件
    if (isObjectCurrent && current.url && current.target === '_blank') {
      return
    }

    /**
     * 强制跳转同名路由，为了保持可以鼠标右键开新页，不能把 router-link 换成其它标签
     * 暂时没找到阻止 router-link 调整的方法，下面这种会在路由跳转后重刷一次页面，
     * 目前处理的方式是：往路由中注入一个参数，动态更改路由参数值 触发 跳转同名路由
     */
    /* const routerName = isObjectCurrent ? current.routerName : ''
    if (
      this.force &&
      this.$route.name === routerName &&
      this.active === index
    ) {
      this.$router.go(0)
    } */

    this.$emit('change', index, this.params)
  }
}
