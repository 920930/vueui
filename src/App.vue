<template>
  <div class="init">
    <el-date-picker></el-date-picker>
    <div style="height: 600px; margin-top: 14px"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, inject } from "vue"

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
  overflow:auto
}
li{
  list-style: none;
}
.init{
  width: 400px;
}
</style>
