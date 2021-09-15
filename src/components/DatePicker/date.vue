<template>
  <div class="el-date-init">
    <div class="el-date-year"></div>
    <div class="el-date-weeks">
      <span v-for="(week, index) in weeks" :key="index">{{week}}</span>
    </div>
  </div>
</template>


<script lang='ts'>
import { defineComponent, ref } from 'vue'
let date = new Date()
let nowYear = date.getFullYear()
let nowMonth = date.getMonth() + 1
let nowDate = date.getDate()
let nowDay = date.getDay()

export default defineComponent({
  name: 'ElDate',
  props: {
    year: {type: Number, default: nowYear},
    month: {type: Number, default: nowMonth}
  },
  setup(props){
    let weeks = ['日', '一', '二', '三', '四', '五', '六'];
    const showYear = ref<number>(props.year)
    const showMonth = ref<number>(props.month)

    const setDate = (year: number = showYear.value, month: number = showMonth.value, date: number = 0) => {
      let checkDate = new Date(nowYear, 9, date)
      return {
        year: checkDate.getFullYear(),
        month: checkDate.getMonth(),
        date: checkDate.getDate(),
        week: checkDate.getDay()
      }
    }
    console.log(setDate())
    return {
      weeks
    }
  }
})


</script>

<style lang='less' scoped>
.el-date-init{
  width: 100%;
  .el-date-weeks{
    display: flex;
    justify-content: space-between;
  }
}
</style>