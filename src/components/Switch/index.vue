<template>
  <div class="el-switch" :class="{'is-disabled': isDisabled}" @click.prevent.stop="switchValue">
    <input
      ref="input"
      type="checkbox"
      class="el-switch__input"
      :disabled='isDisabled'
      @change="handleChange"
      @keydown.enter="switchValue"
    >
    <span class="el-switch__label el-switch__left" :class="{'is-checked': checked}" v-if="activeText">{{activeText}}</span>
    <span
      ref='core'
      class="el-switch__core"
      :style="{'width': width+'px'}"
    >
      <div class="el-switch__active"></div>
    </span>
    <span class="el-switch__label el-switch__right" :class="{'is-checked': !checked}" v-if="inactiveText">{{inactiveText}}</span>
  </div>
</template>

<script lang='ts'>
  export default {
    name: 'ElSwitch'
  }
</script>

<script lang='ts' setup>
import { computed, onMounted, ref, watch, nextTick } from 'vue'
const props = defineProps({
  modelValue: { type: [Boolean, String, Number], default: false },
  activeValue: { type: [Boolean, String, Number], default: true },
  inactiveValue: { type: [Boolean, String, Number], default: false },
  activeColor: { type: String, default: '#409EFF' },
  inactiveColor: { type: String, default: '#C0CCDA' },
  borderColor: { type: String, default: '' },
  width: { type: Number, default: 40 },
  activeText: String,
  inactiveText: String,
  disabled: Boolean,
  loading: Boolean
})
const emit = defineEmits(['update:modelValue'])
const input = ref(null)
const core = ref(null)
const checked = computed(() => props.modelValue === props.activeValue)
const reverseValue = computed(() => checked.value ? props.inactiveValue : props.activeValue)
const newColor = computed(() => checked.value ? props.activeColor : props.inactiveColor)
const isDisabled = computed(() => props.disabled || props.loading)

const checkValue = () => {
  ![props.activeValue, props.inactiveValue].includes(props.modelValue) ? emit('update:modelValue', props.inactiveValue) : ''
}
watch(checked, () => setBackgroundColor())

const switchValue = () => {
  if(isDisabled.value) return;
  handleChange()
}

const handleChange = () => {
  checkValue()
  emit('update:modelValue', reverseValue.value)
  nextTick(() => {
    const inputEl = input.value as unknown as HTMLInputElement
    inputEl.checked = checked.value
    console.log(inputEl)
  })
}
const setBackgroundColor = () => {
  const coreEl = core.value as unknown as HTMLSpanElement
  const coreChild = coreEl.children[0] as unknown as HTMLDivElement
  coreEl.style.backgroundColor = newColor.value
  coreEl.style.borderColor = props.borderColor ? props.borderColor : newColor.value
  coreChild.style.color = newColor.value
  coreChild.style.left = checked.value ? `${props.width - 17}px` : '3px'
}

onMounted(() => {
  checkValue()
  setBackgroundColor()
})
</script>

<style lang='less' scoped>
.el-switch{
  position: relative;
  display: inline-flex;
  align-items: center;
  &.is-disabled{
    opacity: .6;
    cursor: not-allowed;
  }
  .el-switch__input{
    position: absolute;
    opacity: 0;
  }
  .el-switch__core{
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    background-color: tomato;
    border-radius: 20px;
    transition-duration: .3s;
    .el-switch__active{
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: white;
      top: 3px;
      transition-duration: .3s;
    }
  }
  .el-switch__label{
    display: inline-block;
    font-size: 14px;
    &.el-switch__left{
      margin-right: 5px;
    }
    &.el-switch__right{
      margin-left: 5px;
    }
    &.is-checked{
      color: #409EFF;
    }
  }
}
</style>