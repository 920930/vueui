<template>
  <li class="el-menu-item">
    <span><slot name="title"></slot></span>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>

<script lang='ts'>
export default { name: 'ElSubMenu' }
</script>

<script lang='ts' setup>
import {} from 'vue'

</script>

<style lang='less' scoped>
.el-menu-item{
  padding: 5px 0;
}
</style>