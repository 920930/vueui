<template>
  <div class="el-date" v-picker>
    <div class="el-date-input">
      <input type="text" :class="size?'el-date' + size:''">
      <i class="far fa-calendar-alt"></i>
    </div>

    <el-date></el-date>
  </div>
</template>

<script lang='ts'>
import picker from '../../directive/datePicker'
export default { 
  name: 'ElDatePicker',
  directives: {
    picker,
  }
}
</script>

<script lang='ts' setup>
import { ref } from 'vue'
import type { PropType } from 'vue'
import ElDate from './date.vue'
defineProps({
  size: String as PropType<ComponentSize>
})

</script>

<style lang='less' scoped>
.el-date{
  width: 100%;
  color: #333;
  position: relative;
  .el-date-input{
    position: relative;
    input{
      width: 100%;
      height: 36px;
      outline: none;
      padding-left: 28px;
      padding-right: 16px;
      box-sizing: border-box;
      border: 1px solid #999;
      border-radius: 3px;
      color: inherit;
    }
    i{
      position: absolute;
      top: 50%;
      left: 8px;
      transform: translateY(-50%);
      color: rgba(0, 0, 0, .5);
    }
  }
}
</style>