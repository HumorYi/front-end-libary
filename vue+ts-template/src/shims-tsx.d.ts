/**
 *  JSX 语法的全局命名空间，这是因为基于值的元素会简单的在它所在的作用域里
 * 按标识符查找（此处使用的是 无状态函数组件 (SFC) 的方法来定义），
 * 当在 tsconfig 内开启了 jsx 语法支持后，自动识别 .tsx 文件
 */

import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
