<template>
  <transition @before-leave='onClose' @after-leave='$emit("destroy")'>
    <div
      class="el-notify"
      v-show="visible"
      :style="styleCustom"
      @mouseenter="endTimer"
      @mouseleave="startTimer"
    >ElNotification</div>
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
  title: String,
  duration: { type: Number, default: 3000 },
  offset: Number,
  type: { type: String as PropType<ComponentType>, default: 'info' },
  position: { type: String, default: 'top' },
  showClose: Boolean,
  iconClass: String,
  onClose: { type: Function as PropType<()=>void>, required: true }
})

const styleCustom = computed(() => {
  return {
    top: props.offset + 'px',
  }
})

const emit = defineEmits(['destroy'])
let timer: any = null;
const visible = ref(false);

const startTimer = () => {
  timer = setTimeout(() => visible.value && (visible.value = false), props.duration)
}

const endTimer = () => {
  clearTimeout(timer)
  timer = null
}

onMounted(() => {
  startTimer();
  visible.value = true
})

</script>

<style lang='less' scoped>
.el-notify{
  position: absolute;
  height: 40px;
  background-color: chocolate;
}
</style>