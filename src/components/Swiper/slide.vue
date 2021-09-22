<template>
  <transition name="slide">
    <div class="el-swiper-slide" v-show="currentId === selfId">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang='ts'>
export default { name: 'ElSwiperSlide' }
</script>

<script lang='ts' setup>
import { getCurrentInstance, reactive, computed } from 'vue';
const instance = getCurrentInstance();
const currentId = computed(() => instance.parent.proxy.initial)
const selfId = instance.vnode.key
</script>

<style lang='less' scoped>
.el-swiper-slide{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.slide-enter-active, .slide-leave-active{
  transition: all 1s linear;
}
.slide-enter-from{
  transform: translateX(100%);
}
.slide-leave-to{
  transform: translateX(-100%);
}
</style>