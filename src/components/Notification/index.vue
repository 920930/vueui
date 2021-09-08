<template>
  <transition @before-leave='onClose' @after-leave='$emit("destroy")'>
    <div
      class="el-notify"
      v-show="visible"
      :style="styleCustom"
      @mouseenter="endTimer"
      @mouseleave="startTimer"
    >
      <header>
        <h3>{{title}}</h3>
        <span v-if="showClose" @click="closeBtn"><i class="fas fa-times"></i></span>
      </header>
      <footer>
        <div v-if="type"><i class="fas" :class="typeClass"></i></div>
        <span>{{message}}</span>
      </footer>
    </div>
  </transition>
</template>

<script lang='ts'>
export default { name: 'ElNotification' }
</script>

<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue'
import type { PropType } from 'vue'
const props = defineProps({
  id: String,
  title: { type: String, default: '提示' },
  message: String,
  duration: { type: Number, default: 3000 },
  offset: Number,
  type: String as PropType<ComponentType>,
  position: { type: String, default: 'top-right' },
  showClose: { type: Boolean, default: true },
  iconClass: String,
  onClose: { type: Function as PropType<()=>void>, required: true }
})


const styleCustom = computed(() => {
  let [positionA, positionB] = props.position.split('-');
  let offset = (props.offset ? props.offset : '20') + 'px';
  return {
    [positionA]: offset,
    [positionB]: '20px',
  }
})

const emit = defineEmits(['destroy'])
let timer: any = null;
const visible = ref(false);

const startTimer = () => {
  if(props.duration) timer = setTimeout(() => visible.value && (visible.value = false), props.duration)
}

const endTimer = () => {
  clearTimeout(timer)
  timer = null
}

const closeBtn = () => visible.value = false

onMounted(() => {
  startTimer();
  visible.value = true
})

const typeClass = computed(() => {
  let icon = ''
  switch (props.type) {
    case 'success':
      icon = 'fa-check-circle el-notify--success'
      break;
    case 'warning':
      icon = 'fa-exclamation-circle el-notify--warning'
      break;
    case 'error':
      icon = 'fa-times-circle el-notify--error'
      break;
    default:
      icon = 'fa-info-circle el-notify--info'
      break;
  }
  return icon
})

</script>

<style lang='less' scoped>
.el-notify{
  position: fixed;
  width: 300px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  border-radius: 5px;
  background-color: white;
  header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    color: #444;
    h3{
      font-size: 20px;
    }
    span{cursor: pointer;}
  }
  footer{
    display: flex;
    div{
      margin-right: 15px;
      font-size: 18px;
    }
    .el-notify--success{color: green}
    .el-notify--info{color: gray}
    .el-notify--error{color: red;}
    .el-notify--warning{color: goldenrod;}
  }
}
</style>