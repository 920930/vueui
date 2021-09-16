<template>
  <div class="el-date-picker">
    <div class="el-date-year">
      <div @click="beforeBtn">
        <i class="fas fa-angle-double-left" style="margin-right:10px"></i>
        <span class="fas fa-angle-left"></span>
      </div>
      <div>{{nowYear}}年{{nowMonth}}月</div>
      <div @click="nextBtn">
        <span class="fas fa-angle-right" style="margin-right:10px"></span>
        <i class="fas fa-angle-double-right"></i>
      </div>
    </div>
    <ul class="el-date-weeks">
      <li v-for="(week, index) in weeks" :key="index">{{week}}</li>
      <li class="gray" v-for="item in beforeMonthDates" :key='item.month-item.date'>{{item.date}}</li>
      <li :class="{'current': showMonth === item.month && nowDate === item.date}" v-for="item in getNowMonthDate" :key='item.month-item.date'>{{item.date}}</li>
      <li class="gray" v-for="item in nextMonthDates" :key='item.month-item.date'>{{item.date}}</li>
    </ul>
  </div>
</template>

<script lang='ts'>
export default{
  name: 'el-date'
}
</script>

<script lang='ts' setup>
import { ref, watch, computed } from 'vue'
import {
  nowYear,
  nowMonth,
  showMonth,
  nowDate,
  weeks,
  getBeforeMonth,
  getNowMonthDate,
  getNextMonth,
  beforeBtn,
  nextBtn
} from './date';
let beforeMonthDates = computed(() => getBeforeMonth.value.dates);
let nextMonthDates = computed(() => getNextMonth.value.dates);
</script>

<style lang='less' scoped>
.el-date-picker{
    position: absolute;
    // display: none;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0 0 6px rgba(0, 0, 0, .3);
    transition: 1s;
    background-color: white;
  .el-date-year{
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .el-date-weeks{
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    height: 100%;
    li{
      width: 100%;
      height: 50px;
      border-right: 1px solid rgba(0, 0, 0, .2);
      border-bottom: 1px solid rgba(0, 0, 0, .2);
      text-align: center;
      line-height: 50px;
      &:nth-child(-n+7){
        border-top: 1px solid rgba(0, 0, 0, .2);
      }
      &:nth-child(7n+1){
        border-left: 1px solid rgba(0, 0, 0, .2);
      }
      &.current{
        color: #409eff;
      }
      &.gray{
        color: rgba(0, 0, 0, .5);
      }
    }
  }
}
</style>