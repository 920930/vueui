import { ref, reactive, computed, watchEffect } from 'vue'

const now = ref(new Date())
const nowMonth = ref(now.value.getMonth() + 1)
const nowYear = ref(now.value.getFullYear())
const nowDate = ref(now.value.getDate())
const showMonth = ref(now.value.getMonth() + 1);

const weeks = ['一', '二', '三', '四', '五', '六', '日'];
// 月最后一天 日期值
const getLastDate = (month = nowMonth.value, year = nowYear.value) => {
  return new Date(year, month, 0).getDate()
}
// 本月最后一天
const nowMonthLastDate = computed(() => getLastDate());
// 月某一天 星期值
const getDateDay = (dateDay = nowMonthLastDate.value, month = nowMonth.value, year = nowYear.value) => {
  return new Date(`${year}-${month}-${dateDay}`).getDay() || 7;
}
// 月 所有日期 集合
const getMonthAllDate = (lastday = nowMonthLastDate.value, month = nowMonth.value, year = nowYear.value) => {
  return Array.from({length: lastday}, (_, i) => {
    return {year, month, date: i + 1}
  })
}
// 本月
const nowMonthFirstDateDay = computed(() => getDateDay(1, nowMonth.value, nowYear.value));
const nowMonthLastDateDay = computed(() => getDateDay(getLastDate()))
const getNowMonthDate = computed(() => getMonthAllDate())
// 上月
const getBeforeMonth = computed(() => {
  let month = nowMonth.value - 1 === 0 ? 12 : nowMonth.value - 1 ;
  let year = month === 12 ? nowYear.value - 1 : nowYear.value;
  let lastDate = getLastDate(month, year)
  let dates = [1].includes(nowMonthFirstDateDay.value) ? [] : getMonthAllDate(lastDate, month, year).slice(-nowMonthFirstDateDay.value+1)
  return {
    dates
  }
})
// 下月
const getNextMonth = computed(() => {
  let month = nowMonth.value + 1 === 13 ? 1 : nowMonth.value + 1 ;
  let year = month === 1 ? nowYear.value + 1 : nowYear.value;
  let lastDate = getLastDate(month, year)
  let dates = nowMonthLastDateDay.value === 7 ? [] : getMonthAllDate(lastDate, month, year).slice(0, 7 - nowMonthLastDateDay.value);
  return {
    dates
  }
})

const beforeBtn = (e: MouseEvent) => {
  let tagName = (e.target as HTMLElement).tagName
  switch (tagName) {
    case 'I':
      nowYear.value --
      break;
    case 'SPAN':
      nowMonth.value - 1 === 0 ? nowMonth.value = 12 : nowMonth.value--;
      nowMonth.value === 12 ? nowYear.value-- : nowYear.value;
      break;
    default:
      break;
  }
}

const nextBtn = (e: MouseEvent) => {
  let tagName = (e.target as HTMLElement).tagName
  switch (tagName) {
    case 'I':
      nowYear.value ++
      break;
    case 'SPAN':
      nowMonth.value + 1 === 13 ? nowMonth.value = 1 : nowMonth.value++;
      nowMonth.value === 1 ? nowYear.value++ : nowYear.value;
      break;
    default:
      break;
  }
}

export {
  nowYear,
  nowMonth,
  nowDate,
  weeks,
  getBeforeMonth,
  getNowMonthDate,
  getNextMonth,
  beforeBtn,
  nextBtn,
  showMonth
}