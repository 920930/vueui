<template>
  <div
    class="el-magn"
    :style="imgStyle"
    v-magn
  >
    <a class="el-magn-box" :style="magnStyle" :href="link" :target="blank ? '_blank' : ''">
      <img class="el-magn-box--image" :style="imgStyle" :src="imgUrl" :alt="imgAlt">
    </a>
    <a class="el-magn-static" :href="link" :target="blank ? '_blank' : ''">
      <img :style="imgStyle" :src="imgUrl" :alt="imgAlt">
    </a>
  </div>
</template>

<script lang='ts'>
import magn from '../../directive/magn'
export default { 
  name: 'ElMagn',
  directives: {
    magn
  }
}
</script>

<script lang='ts' setup>
import { computed, withDirectives } from 'vue'
const props = defineProps({
  imgUrl: { type: String, default: 'https://rs1.huanqiucdn.cn/dp/api/files/imageDir/166ff2201a97cf50bb6fcd04095c452d.jpg'},
  imgAlt: { type: String, default: '920930.com' },
  link: { type: String, default: 'http://www.920930.com' },
  blank: { type: Boolean, default: false },
  imgWidth: { type: Number, default: 400 },
  imgHeight: { type: Number, default: 595 },
  magnWidth: { type: Number, default: 100 },
  magnHeight: { type: Number, default: 100 },
})

const imgStyle = computed(() => {
  return {
    width: props.imgWidth + 'px',
    height: props.imgHeight + 'px',
  }
})

const magnStyle = computed(() => {
  return {
    width: props.magnWidth + 'px',
    height: props.magnHeight + 'px',
  }
})
</script>

<style lang='less' scoped>
.el-magn{
  position: relative;
  .el-magn-box{
    position: absolute;
    display: none;
    left: 0;
    top: 0;
    border: 1px solid white;
    z-index: 2;
    overflow: hidden;
    cursor: move;
    &.show{
      display: block;
      transform: scale(1.5);
    }
    .el-magn-box--image{
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .el-magn-box{
    width: 100%;
    height: 100%;
  }
}
</style>