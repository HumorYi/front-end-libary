<template>
  <div class="login-wrap g-full-page">
    <!-- <div class="container">
      <header class="g-df-c">
        <img src="@viewsImg/Account/logo.png" alt="" />
        <h1 class="platform-title g-color-main g-fwb"></h1>
      </header>
      <div class="content g-df">
        <img src="@viewsImg/Account/left.png" alt="" class="content-img" />
        <div class="form-wrap g-bs-bb">
          <p class="title g-tac g-fwb g-color-main">{{ title }}</p>
          <slot name="form">
            <a-form
              :form="form"
              @submit="handleSubmit"
              class="ant-form login-form"
              :class="formClassName"
            >
              <a-form-item
                v-for="({
                  decorator,
                  placeholder,
                  type,
                  iconClassName,
                  codeType,
                  view,
                  readOnly
                },
                i) in formItems"
                :key="i"
              >
                <i
                  v-if="iconClassName"
                  class="iconfont g-poa icon"
                  :class="iconClassName"
                ></i>
                <i
                  v-if="viewFields.includes(decorator[0])"
                  class="iconfont g-poa g-cursor-pointer icon-view"
                  :class="view ? 'icon-icon-test' : 'icon-icon-test1'"
                  @click="toggleView(formItems[i])"
                ></i>
                <BtnSms
                  v-if="decorator[0] === 'code'"
                  :mobile="form.getFieldValue('mobile') || ''"
                  :type="codeType"
                  class="g-poa btn-sms"
                />
                <a-input
                  :readOnly="readOnly"
                  v-decorator="decorator"
                  :placeholder="placeholder"
                  :type="
                    viewFields.includes(decorator[0])
                      ? view
                        ? 'text'
                        : type
                      : type || 'text'
                  "
                  :ref="i === 0 ? 'firstFormItem' : ''"
                  @blur="blur($event, decorator[0])"
                />
              </a-form-item>

              <FormBtnSumbit :form="form" :btnText="btnText" />
            </a-form>
          </slot>

          <div class="option">
            <slot name="option">
              <p class="g-tac">
                已有账号？
                <router-link :to="{ name: 'Login' }">立即登录</router-link>
              </p>
            </slot>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
/* import { Component, Prop, Mixins, Watch } from 'vue-property-decorator'

import MixinForm from '@bizMixins/Ant/form'

@Component
export default class LoginWrap extends Mixins(MixinForm) {
  @Prop({ type: String, required: true }) readonly title!: string
  @Prop({ type: String, default: '' }) readonly btnText!: string
  @Prop({ type: String, default: '' }) readonly formClassName!: string
  @Prop({ type: Array, default: [] }) readonly formItems!: {}[]

  viewFields = ['password', 'confirmPassword']

  toggleView(formItem: {}) {
    formItem['view'] = !formItem['view']
  }

  created() {
    this.$emit('form', this['form'])
  }

  mounted() {
    this.$nextTick(() => {
      this.$refs.firstFormItem[0]['$el'].focus()
    })
  }

  validateSuccess(values: {}) {
    this.$emit('success', values)
  }

  blur(e: Event, field: string) {
    this.$emit('blur', e, field)
  }

  @Watch('formItems', { immediate: true })
  onChangeFormItems() {
    this.closeReadOnly(this.formItems)
  }
} */
</script>

<style lang="sass" scoped>
.login-wrap
  height: 100%

  background-image: url('~@viewsImg/Account/bg.png')
  background-repeat: no-repeat
  background-position: center center
  background-size: cover

  .container
    width: 960px
    margin: 0 auto
    padding-top: 110px

    .platform-title
      font-size: 32px
      margin-left: 12px

    .content
      height: 560px
      margin-top: 40px

      .content-img
        width: 480px
        height: 560px

    .form-wrap
      $border-radius: 8px
      width: 480px
      padding: 40px 60px

      border-top-right-radius: $border-radius
      border-bottom-right-radius: $border-radius
      background-color: #fff

      .title
        font-size: 22px

      ::v-deep .login-form
        .ant-form-item
          &:not(.ant-form-btn-submit)
            margin: 0
            min-height: 60px

          &.ant-form-btn-submit
            button
              width: 100%
              height: 48px
              font-size: 18px

          .ant-form-item-control
            line-height: normal

            .icon,
            .icon-view,
            .btn-sms
              z-index: 1

            .icon
              left: 0
              top: -2px

              font-size: 20px
              color: #B8BBBF

            .btn-sms
              right: 0

            .icon-view
              right: 0
              top: 0

            .ant-input
              padding: 20px 11px
              border: 0
              border-bottom: 1px solid #D9D9D9

              border-radius: 0
              font-size: 16px
              text-indent: 20px

              @include g_placeholder(#B8BBBF, 16px)

              &:focus,
              &:hover
                border-color: #D9D9D9
                box-shadow: none

      .option
        margin-top: 20px
</style>
