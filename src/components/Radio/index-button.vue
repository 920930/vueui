<template>
  <label class="el-radio" :class="[size?'el-radio--'+size:'', {'is-checked': checked, 'is-disabled': disabled}]">
    <span class="el-radio__input">
      <input
        ref="input"
        type="radio"
        v-model="model"
        :value="label"
        class='el-radio__origan'
        :disabled='disabled'
      >
    </span>
    <span class='el-radio--label'>
      <slot>radio</slot>
    </span>
  </label>
</template>

<script lang='ts'>
  export default {
    name: 'ElRadioButton'
  }
</script>

<script lang='ts' setup>
import { computed, ref } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, Boolean], default: false },
  label: { type: [String, Number, Boolean], default: '' },
  disabled: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
    validator: (val: string) => ['', 'medium', 'small', 'mini'].includes(val)
  }
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get(){
    return props.modelValue
  },
  set(val){
    emit('update:modelValue', val);
  }
})

const checked = computed(() => props.modelValue === props.label)

</script>

<style lang='less' scoped>
.el-radio {
  position: relative;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  padding: 8px 12px;
  border: 1px solid #f6f6f6;
  background-color: #dcdfe6;
  transition: .5s;
  &.is-checked{
    color: white;
    border: 1px solid #f6f6f6;
    background-color: #409eff;
  }
  .el-radio__input{
    display: inline-block;
    position: relative;
    .el-radio__origan{
      position: absolute;
      transform: scale(0);
    }
  }
  &.is-disabled{
    cursor: not-allowed;
    color: #999;
    background-color: #dcdfe6;
    &.is-checked{
      opacity: .7;
      color: white;
      border: 1px solid #f6f6f6;
      background-color: #409eff;
    }
  }
  &.el-radio--medium{
    padding: 7px 11px;
  }
  &.el-radio--small{
    padding: 5px 10px;
  }
  &.el-radio--mini{
    padding: 3px 8px;
  }
}
</style>