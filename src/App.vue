<template>
  <el-button @click="btn">提交</el-button>
</template>

<script lang="ts" setup>
import { ref, watchEffect, inject } from "vue"
const notify: any = inject('notify')
const btn = () => {
  notify('hah')
}
</script>

<style>
@import url('https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/all.min.css');
*{
  margin: 0;
  padding: 0;
}
body{
  width: 100%;
  height: 100%;
}
li{
  list-style: none;
}
</style>
