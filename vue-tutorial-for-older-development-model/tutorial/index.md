

# 项目架构 - 以 php + vue 为例

```
├─Application 								// 所有应用程序根目录
│  └─Publish 								// 后台应用程序根目录
│      └─View  								// 视图，所有 html 文件根目录
│          ├─Favorites						// 页面根目录，存放该页面的所有 html 文件
│          │      							  // 	可将根页面拆分子页面，再组装到根页面中，
│          │      							  //  类似子组件，页面解耦，职责分明，便于管理维护
│          │      							  //  后续发现有功能跟该子页面类似，拿过去改即可
│          │
│          │      index.html				// 页面入口 html 文件
│          │
│          └─Public 						// 公共 html 文件 根目录，最外层为公共 html
│              │  vue.html 					// vue 环境，包含 axios、loading、error等
│              │
│              └─components 				// 公共组件
│                      checkbox.html 		// 复选框
│
├─Public 									// 资源根目录
│  └─assets 								// 静态资源根目录，css、js、images等
│      ├─common 							// 公共静态资源根目录
│      │  ├─api 							// api 接口根目录，子文件为页面
│      │  │      product.js 				// 封装页面所有接口，在页面 js 中只需调用接口方法
│      │  │      							      //  便于后续接口的管理、维护、复用等
│      │  │
│      │  ├─config 							// 配置根目录，存储项目配置、公共配置等
│      │  │      api.js 					// api 配置，根据接口返回的状态码对对应的操作
│      │  │
│      │  ├─css 							// css 根目录，最外层为公用 css
│      │  │  │  animation.css
│      │  │  │  common.css
│      │  │  │  keyframes.css
│      │  │  │  loading.css
│      │  │  │  mixin.css
│      │  │  │  reset.css
│      │  │  │  variables.css
│      │  │  │
│      │  │  └─components 					// 组件 css 根目录
│      │  │          checkbox.css
│      │  │
│      │  ├─filter 							// 过滤器 根目录
│      │  │      index.js 					// 入口文件，由于目前使用的过滤器较少，
│      │  │          						    //  都存放在入口中，后续如果多了可根据过滤器类型
│      │  │          						    //  拆分到根目录下新建类型文件中
│      │  │
│      │  ├─http 							// http 请求根目录
│      │  │      interceptors.js 			// axios 拦截器配置，接口文件只需处理正确逻辑
│      │  │      request.js 				  // 普通请求，get、post
│      │  │      requestFile.js 			// 文件请求，例如：视频、excel等
│      │  │
│      │  ├─images 							// 图片 根目录
│      │  │      logo.png 					// logo
│      │  │
│      │  ├─mixin 							// mixin 根目录，用于封装复用逻辑
│      │  │      dialog.js 					// 对话框
│      │  │
│      │  ├─sass 							// sass 根目录，使用 sass 预处理 css 语言，
│      │  │	 │      						// 	便于后续 css 管理、维护、复用
│      │  │  │  animation.sass				// 动画类
│      │  │  │  common.sass					  // 公共 - 缩略符、蒙版、居中等
│      │  │  │  keyframes.sass				// 动画函数
│      │  │  │  loading.sass				  // 加载提示
│      │  │  │  mixin.sass					  // mixin 函数，通过参数来复用 css 结构
│      │  │  │  reset.sass					  // 浏览器默认样式重置，后续有新发现可自主完善
│      │  │  │  variables.sass				// 变量 - 公共颜色、背景色等
│      │  │  │
│      │  │  └─components					// html 组件 样式，与 公共 html 组件目录一致
│      │  │  						// Application/Publish/View/Public/components
│      │  │
│      │  │          checkbox.sass
│      │  │
│      │  └─util							// 工具根目录，存放通用工具
│      │          animation.js				// 动画
│      │          copy.js					    // 复制 - clipboard.js，封装成功和失败监听
│      │          counter.js				  // 计算器
│      │          loading.js				  // 加载器
│      │          tip.js					    // 提示器，模仿 element-ui 消息提示，
│      │          verify.js					  // 验证器 - 是否手机号码、身份证等
│      │
│      └─publish							// 页面级别（后台） 静态资源根目录
│          ├─css							// css 根目录，理念同上面 View 划分一致
│          │  └─favorites					// 收藏页面根目录
│          │          index.css				// 收藏页面 css 样式入口文件
│          │
│          ├─images							// 图片 根目录，理念同上面 View 划分一致
│          │  ├─favorites					// 收藏页面根目录
│          │  │      null-product.png		// 图片资源
│          │
│          ├─js								// js 根目录
│          │  └─favorites					// 收藏页面 根目录
│          │          index.js				// 入口 js
│          │
│          └─sass							// sass 根目录
│              └─favorites					// 收藏页面 根目录
│                      index.sass			// 入口 js

```

## 创建组件实例

```vue
<!--
  使用方式：
    调用：
      <checkbox></checkbox>

    参数：
      checked:  Boolean   // 是否选中，默认不选中
      open:     Boolean   // 是否开启，默认开启
      title:    String    // 标题，默认 全选
      param:    Any       // 参数，用于做数据传递，点击时在事件中传递回去

    事件：
      check
        说明：选中事件
        参数：
          checked   Boolean   是否选中
          param     Any       传递进来的数据

  实现方式：
    通过 css 模拟复选框

  example:
    <checkbox @check="check"></checkbox>
-->
<link rel="stylesheet" href="/Public/assets/common/css/components/checkbox.css" />

<!-- 兼容 旧版浏览器环境 - IE -->
<script type="text/template" id="c-checkbox">
  <div class="c-checkbox" @click="check">
    <span v-if="open" class="checkbox" :class="{active: ownChecked}">
      <i v-if="ownChecked" class="iconfont icon-dui"></i>
    </span>
    <span v-if="title">{{title}}</span>
  </div>
</script>

<!-- 主流浏览器环境 - 不需要兼容老旧浏览器
<template id="c-checkbox">
  <div class="c-checkbox" @click="check">
    <span v-if="open" class="checkbox" :class="{active: ownChecked}">
      <i v-if="ownChecked" class="iconfont icon-dui"></i>
    </span>
    <span v-if="title">{{title}}</span>
  </div>
</template>
-->

<script>
  Vue.component('checkbox', {
    template: '#c-checkbox',
    data: function () {
      return {
        ownChecked: false
      }
    },
    props: {
      param: {},
      open: {
        type: Boolean,
        default: true
      },
      checked: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '全选'
      }
    },
    methods: {
      check: function () {
        if (!this.open) {
          return
        }

        this.ownChecked = !this.ownChecked

        this.$emit('check', this.ownChecked, this.param)
      }
    },
    watch: {
      checked: function () {
        this.ownChecked = this.checked
      }
    }
  })
</script>
```

### 注意事项

```
1、由于是使用 css 文件 引入的方式，如何避免 类名、ID 名 被覆盖？ -- 使用命名前缀，c-文件名
2、在 template 中统一使用 id 标识改模板的唯一性，命名同上,例如：id="c-checkbox"
3、注册组件，组件名为文件名，模板,例如：Vue.component('checkbox', { tempalte: '#checkbox' })
4、使用 props 如果确定传递参数数据类型，应指定类型，例如：props: { open: Boolean }
5、props 参数数据类型范围有多个时，使用数组存放，例如：props: { score: [Number, String] }
6、props 参数数据类型不确定时，不指定，代表任意类型，例如：props: { param: {} }
```

### 利用代码片段，快速创建模板，以 vscode IDE 为例

#### 第一步：打开用户代码片段

![](.\vscode-snippets-1.png)

#### 第二步：创建全局代码片段

![](.\vscode-snippets-2.png)

#### 第三步: 输入代码片段名

![](.\vscode-snippets-3.png)

#### 第四步：输入代码片段，注意："prefix": "vue-dom" 就是代码前缀，后续在文件中一敲就出来了

```json
{
	"Print to console": {
			"prefix": "vue-dom",
      "body": [
        "<link rel=\"stylesheet\" href=\"/Public/assets/common/css/components/$1.css\" />",
        "",
        "<template id=\"c-$1\">",
        "\t<div class=\"c-$1\"></div>",
        "</template>",
        "",
        "<script>",
        "\tVue.component(\"$1\", {",
        "\t\ttemplate: \"#c-$1\",",
        "\t\tdata: function () { ",
        "\t\t\treturn {$3}",
        "\t\t},",
        "\t\tprops: {$4},",
        "\t\tmethods: {$4}",
        "\t})",
        "</script>"
      ],
      "description": "vue-dom template"
	}
}
```

#### 第五步：使用代码片段，在文件中输入 vue-dom

![](.\vscode-snippets-5.png)

## [vscode 推荐插件](https://blog.csdn.net/caijunfen/article/details/78749766)

