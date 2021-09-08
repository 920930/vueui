<template>
  <ul class="el-menu">
    <slot></slot>
  </ul>
</template>

<script lang='ts'>
export default { name: 'ElMenu' }
</script>

<script lang='ts' setup>
import {} from 'vue'
import data from '../../data/menu'
console.log(data)
</script>

<style lang='less' scoped>
.el-menu{
  width: 160px;
  background-color: black;
  color: white;
  text-align: center;
  padding: 5px 0;
}
</style>