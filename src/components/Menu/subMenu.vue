<template>
  <div>
    <slot name="title"></slot>
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script lang='ts'>
export default { name: 'ElSubMenu' }
</script>

<script lang='ts' setup>
import {} from 'vue'
</script>

<style lang='less' scoped>

</style>