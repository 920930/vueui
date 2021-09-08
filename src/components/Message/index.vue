<template>
  <transition name="face" @before-leave='onClose' @after-leave='$emit("destroy")'>
    <div
      :id="id"
      :key='id'
      v-show="visible"
      class="el-message"
      :class="['el-message--'+type]"
      :style="customStyle"
      @mouseenter="endTimer"
      @mouseout="startTimer"
    >{{message}}</div>
  </transition>
</template>

<script lang='ts'>
  export default {
    name: 'ElMessage'
  }
</script>

<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue'
import type { PropType } from 'vue'
const props = defineProps({
  id: String,
  message: {type: String, default: ''},
  duration: {type: Number, default: 3000},
  center: Boolean,
  showClose: Boolean,
  type: {type: String as  PropType<ComponentType>, default: 'info'},
  zIndex: {type: Number, default: 0},
  offset: Number,
  onClose: {type: Function as PropType<()=>void>, required: true},
})

const customStyle = computed(() => {
  return {
    top: props.offset + 'px',
    zIndex: props.zIndex
  }
})
let timer: any = null
const visible = ref(false)

const startTimer = () => {
  timer = setTimeout(() => visible.value && (visible.value = false), props.duration)
}

const endTimer = () => {
  clearTimeout(timer)
  timer = null
}

onMounted(() => {
  startTimer()
  visible.value = true
})
</script>

<style lang='less' scoped>
.el-message{
  position: fixed;
  padding: 12px 12px 12px 20px;
  font-size: 14px;
  width: 360px;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 4px;
}
.el-message--info{
  background-color: #f4f4f5;
  border: 1px solid #e9e9eb;
  color: #909399;
}
.el-message--success {
  background-color: #f0f9eb;
  border: 1px solid #e1f3d8;
  color: #67c23a;
}
.el-message--warning {
  background-color: #fdf6ec;
  border: 1px solid #faecd8;
  color: #e6a23c;
}
.el-message--error {
  background-color: #fef0f0;
  border: 1px solid #fde2e2;
  color: #f56c6c;
}
.is-center{
  text-align: center;
}

.face-enter-from, .face-leave-to{
  opacity: 0;
  transform: translate(-50%,-100%);
  transition: opacity 0.5s ease;
}
</style>
