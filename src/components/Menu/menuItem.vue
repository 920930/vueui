<template>
  <li @click.stop="liBtn"><span><slot></slot></span></li>
</template>

<script lang='ts'>
export default { name: 'ElMenuItem' }
</script>

<script lang='ts' setup>
import {} from 'vue'
const liBtn = (e: MouseEvent) => {
  let tag = e.target as HTMLElement
  let id = ''
  switch (tag.tagName) {
    case 'LI':
      id = tag.getAttribute('index') as string
      break;
    default:
      let oli = tag.parentElement as HTMLElement 
      id = oli.getAttribute('index') as string
      break;
  }
  console.log(id)
}
</script>

<style lang='less' scoped>

</style>