<template>
  <el-sub-menu>
    <template v-slot:title>
      <el-menu-item :index="data.id">{{data.title}}</el-menu-item>
    </template>
    <template v-for="item in data.children" :key="item.id">
      <el-menu-item v-if="!item.children" :index="item.id">{{item.title}}</el-menu-item>
      <el-menu-tree v-else :data='item'></el-menu-tree>
    </template>
  </el-sub-menu>
</template>

<script lang='ts'>
export default { name: 'ElMenuTree' }
</script>

<script lang='ts' setup>
import {} from 'vue'
defineProps({
  data: Object
})
</script>

<style lang='less' scoped>

</style>