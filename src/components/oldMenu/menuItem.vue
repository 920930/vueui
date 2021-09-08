<template>
  <li class="el-menu-item" @click="itemBtn">
    <span><slot></slot></span>
  </li>
</template>

<script lang='ts'>
export default { name: 'ElMenuItem' }
</script>

<script lang='ts' setup>
import {} from 'vue'
const itemBtn = (e: MouseEvent) => {
  console.log(e.target)
}
</script>

<style lang='less' scoped>
.el-menu-item{
  padding: 5px 0;
}
</style>