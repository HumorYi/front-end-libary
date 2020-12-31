import Vue from 'vue'

import directives from '@/directive'

directives.forEach(
  ({ name, definition }: { name: string; definition: {} | Function }) => {
    Vue.directive(name, definition)
  }
)
