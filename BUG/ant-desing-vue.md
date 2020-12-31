## 1、form 表单设置 input 等表单元素默认值

**问题：**Warning: You cannot set a form field before rendering a field associated with the value. You can use `getFieldDecorator(id, options)` instead `v-decorator="[id, options]"` to register it before render.

**原因：**更改默认值必须要在 form 表单渲染完成之后

**解决：**Dom 更新后再修改

```js
this.$nextTick(() => {
  fileds.forEach((filed: string) => {
    this['form'].setFieldsValue({
      [filed]: item[filed]
    })
  })
})

```

## 2、select 在蒙版层怎么点都不出来？

**原因：**z-index 低于 蒙版

**解决：**使用 dropdownClassName 传递个类名进去更改 z-index

## 3、a-input标签自动填充账号和密码

**原因：**当用户选择浏览器弹窗提示保存账号和密码时，表单输入框出现 type="password" 项，浏览器层面会自动填充

	相关信息链接：
	
		https://developer.mozilla.org/zh-CN/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
	
		https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html

**解决：**使用 readOnly，当表单渲染前，设置 readOnly = true，渲染完成后，设置 readOnly = false

## 4、微信浏览器 表单组件渲染不正常

原因：兼容性问题

解决：

```
// 新增 babel 依赖, 兼容 es 低版本
yarn add @babel/runtime -S
yarn add @babel/plugin-transform-runtime -D

// main.ts
import 'core-js/stable'

// babel.config.js 补充运行时转换插件
plugins: ['@babel/plugin-transform-runtime']

// vue.config.js 显式转译 ant-design-vue 依赖
transpileDependencies: ['ant-design-vue']
```

