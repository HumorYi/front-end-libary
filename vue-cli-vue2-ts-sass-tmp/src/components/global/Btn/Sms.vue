<template>
  <button
    class="g-df-c g-btn height padding-h g-bs-bb g-cursor-pointer btn-sms"
    :disabled="disabled"
    :class="active && second === startSecond && isOpen ? 'active' : 'disabled'"
    @click="getCode"
  >
    {{ second === startSecond ? '发送验证码' : second + 's后重新发送' }}
  </button>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

// TODO: 暂代api，记得改
const sendSms = async function(a: any, b: any) {
  console.log(a, b)
}
// import { sendSms } from '@api/common'

import { isMobile } from '@globalUtils/verify'

import Message from '@archUtils/message'

const message = new Message()

@Component
export default class BtnSms extends Vue {
  @Prop({ type: Boolean, default: true }) readonly isOpen!: boolean
  @Prop({ type: String, required: true }) readonly mobile!: string
  @Prop({ type: Number, required: true }) readonly type!: number
  @Prop({ type: Object }) readonly apiParam!: {}
  @Prop({
    type: Object,
    default() {
      return this.beforeSmsSuccess ? { isExternalHandleRes: true } : {}
    }
  })
  readonly apiOtherParam!: {}
  @Prop({ type: Function }) readonly beforeGetCode!: Function
  @Prop({ type: Function }) readonly beforeSmsSuccess!: Function

  startSecond = 60
  second = 60
  interval = 1000
  isSend = false
  active = false

  get disabled() {
    return (
      !this.isOpen || !isMobile(this.mobile) || this.second !== this.startSecond
    )
  }

  getCode(e: Event) {
    e.preventDefault()
    e.stopPropagation()

    if (this.disabled) {
      return
    }

    if (this.beforeGetCode && this.beforeGetCode(this.mobile) === false) {
      return
    }

    if (this.isSend) {
      return
    }

    this.toggleIsSend()

    this.sendRequest()
  }

  toggleIsSend() {
    this.isSend = !this.isSend
  }

  sendRequest() {
    sendSms(
      this.apiParam || {
        type: this.type,
        phone: this.mobile
      },
      this.apiOtherParam
    )
      .then(res => {
        if (this.beforeSmsSuccess && !this.beforeSmsSuccess(res)) {
          this.toggleIsSend()
          return
        }

        this.success()
      })
      .catch(() => this.toggleIsSend())
  }

  success() {
    this.second--
    message.success('已发送短信验证码，请注意接收')

    const codeTimer = setInterval(() => {
      if (this.second !== 1) {
        this.second--
      } else {
        this.second = this.startSecond
        this.isSend = false
        clearInterval(codeTimer)

        this.$emit('finish')
      }
    }, this.interval)
  }

  @Watch('mobile', { immediate: true })
  onMobileChange(val: string) {
    const active = isMobile(val)

    if (this.active !== active) {
      this.active = active
    }
  }
}
</script>

<style lang="sass" scoped>
.btn-sms
  $color: #06f

  border: 1px solid #06f
  font-size: 14px
  user-select: none

  &.disabled
    color: #999
    border-color: #E6EAF0
    background-color: #F2F4F7

  &.active
    color: #fff
    background-color: $color
</style>
