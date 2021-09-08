<template>
  <transition name="face" @before-leave='onClose' @after-leave='$emit("destroy")'>
    <div
      v-show="visible"
      :id='id'
      :key='id'
      :class="[
        'el-message',
        'el-message--' + type,
        {
          'is-center': center
        }
      ]"
      :style="customStyle"
      @mouseenter="endTimer"
      @mouseout="startTimer"
    >{{ message }}</div>
  </transition>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, PropType, ref } from 'vue'

export default defineComponent({
  name: 'ElMessage',
  props: {
    id: { type: String, default: '' },
    message: { type: String, default: '' },
    offset: { type: Number, default: 20 },
    zIndex: { type: Number, default: 1000 },
    duration: { type: Number, default: 3000 },
    center: { type: Boolean, default: false },
    showClose: { type: Boolean, default: false },
    type: { type: String, default: 'info' },
    onClose: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  emits: ['destroy'],
  setup (props) {
    const visible = ref(false)
    let timer: any = null
    const customStyle = computed(() => {
      return {
        top: props.offset + 'px',
        zIndex: props.zIndex
      }
    })

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

    return {
      customStyle,
      visible,
      startTimer,
      endTimer
    }
  }
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
