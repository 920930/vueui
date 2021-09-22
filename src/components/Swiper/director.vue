<template>
  <div class="el-swiper-director">
    <div class="el-swiper-left">
      <i class="fas fa-chevron-circle-left" @click="dirClick('prev')"></i>
    </div>
    <div class="el-swiper-right">
      <i class="fas fa-chevron-circle-right" @click="dirClick('next')"></i>
    </div>
  </div>
</template>

<script lang='ts'>
export default { name: 'ElSwiperDirector' }
</script>

<script lang='ts' setup>
import {} from 'vue';

const emit = defineEmits(['change'])

const dirClick = (dir: string) => {
  emit('change', dir)
}
</script>

<style lang='less' scoped>
.el-swiper-director{
  font-size: 30px;
  .el-swiper-left{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .el-swiper-right{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>