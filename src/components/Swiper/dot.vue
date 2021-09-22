<template>
  <div class="el-swiper-dot" v-if="hasDot">
    <div class="el-swiper-dot-item" v-for="item in len" :key='item'>
      <a
        href="javascript:;"
        class="el-swiper-dot-item-lk"
        :class="currentId === item - 1 ? 'el-swiper-dot-current' : ''"
        @click="currentBtn(item - 1)"
      ></a>
    </div>
  </div>
</template>

<script lang='ts'>
export default { name: 'ElSwiperDot' }
</script>

<script lang='ts' setup>
import {} from 'vue'
const props = defineProps({
  len: Number,
  hasDot: { type: Boolean, default: true },
  currentId: Number
})

const emit = defineEmits(['change'])

const currentBtn = (num: string) => {
  emit('change', num)
}
</script>

<style lang='less' scoped>
.el-swiper-dot{
  position: absolute;
  left: 50%;
  bottom: 20px;
  z-index: 10;
  background-color: rgba(0, 0, 0, .5);
  border-radius: 10px;
  padding: 5px 3px;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  .el-swiper-dot-item{
    width: 100%;
    padding: 0 3px;
    .el-swiper-dot-item-lk{
      display: block;
      text-decoration: none;
      background-color: white;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      &.el-swiper-dot-current{
        background-color: red;
      }
    }
  }
}
</style>