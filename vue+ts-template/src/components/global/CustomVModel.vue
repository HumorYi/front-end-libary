<template>
  <!--
    直接使用v-mode为以下使用标签的语法糖，
    默认子组件使用value接受prop传值使用emit调用input方法修改值，
    在使用model参数prop修改如何接受，event修改emit调用哪个方法来修改值
  -->
  <div class="test-v-model">
    <input
      type="text"
      v-model="inputValue"
      @input="valueChange($event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Emit } from 'vue-property-decorator'

@Component({})
export default class TestVModel extends Vue {
  private inputValue = ''

  private created() {
    this.inputValue = this.valueFromModel
  }

  @Model('changeValueFromModel') valueFromModel!: string

  @Emit('changeValueFromModel')
  valueChange(val: string) {}
}
</script>
