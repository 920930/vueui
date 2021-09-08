<template>
  <el-sub-menu>
    <template v-slot:title>{{data.title}}</template>
    <template v-for="c in data.children" :key="c.id">
      <el-menu-item v-if="!c.children">{{c.title}}</el-menu-item>
      <el-menu-tree v-else :data='c'></el-menu-tree>
    </template>
  </el-sub-menu>
</template>

<script lang='ts'>
export default { name: 'ElMenuTree' }
</script>

<script lang='ts' setup>
import {} from 'vue'
const props = defineProps({
  data: Object
})
</script>

<style lang='less' scoped>

</style>