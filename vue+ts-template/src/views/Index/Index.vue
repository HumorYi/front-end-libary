<template>
  <div class="index">
    <h1>welcome to vue + ts world</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Index extends Vue {}
</script>
