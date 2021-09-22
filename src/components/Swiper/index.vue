<template>
  <div class="el-swiper-container">
    <div class="el-swiper-wapper" @mouseover="autoEnd" @mouseout="autoStart">
      <slot></slot>
    </div>
    <dot :len='childLen' :hasDot='hasDot' :currentId='initial' @change="initialBtn"></dot>
    <director @change='dirBtn'></director>
  </div>
</template>

<script lang='ts'>
export default { name: 'ElSwiper' }
</script>

<script lang='ts' setup>
import { getCurrentInstance, ref, onMounted } from 'vue';
import dot from './dot.vue';
import director from './director.vue';

const props = defineProps({
  autoplay: { type: Boolean, default: true },
  duration: { type: Number, default: 3000 },
  initial: { type: Number, default: 0 },
  hasDot: { type: Boolean, default: true },
  hasDirector: { type: Boolean, default: true }
})
const initial= ref(props.initial)
const instance = getCurrentInstance();
const childLen = instance.slots.default()[0].children.length as number;
let autoTimer: NodeJS.Timeout | null = null;

const autoplay = () => {
  autoTimer = setInterval(() => {
    setIndex('next')
  }, props.duration)
}

const setIndex = (key: string) => {
  switch (key) {
    case 'next':
      initial.value++;
      if(initial.value >= childLen) initial.value = 0
      break;
    case 'prev':
      initial.value--;
      if(initial.value < 0) initial.value = childLen
      break;
    default:
      break;
  }
}

const autoStart = () => {
  autoplay()
}

const autoEnd = () => {
  autoTimer && clearInterval(autoTimer)
}

onMounted(() => {
  autoplay()
})

const initialBtn = (num: number) => {
  initial.value = num
}

const dirBtn = (val: string) => {
  setIndex(val)
}
</script>

<style lang='less' scoped>
.el-swiper-container{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .el-swiper-wapper{
    position: relative;
    left: 0;
    top: 0;
  }
}
</style>