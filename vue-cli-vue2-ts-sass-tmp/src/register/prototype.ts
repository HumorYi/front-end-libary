import 'core-js/stable'

import Vue from 'vue'

import Message from '@archUtils/message'
import Loading from '@archUtils/loading'

Vue.prototype.$message = new Message()
Vue.prototype.$loading = new Loading()

// event bus
/* Vue.prototype.$bus = new Vue() */

// 图片懒加载，使用于大图、列表图
// import VueLazyload from 'vue-lazyload'
/* Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@archImg/loading-fail.png'),
  loading: require('@archImg/loading-lazy.gif'),
  attempt: 1,
  adapter: {
    error(config: {}) {
      config['el'].style.maxWidth = '268px'
      config['el'].style.maxHeight = '268px'
    }
  }
}) */
