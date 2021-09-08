<template>
  <label class="el-radio" :class="['el-radio--'+size, {'is-border': border, 'is-checked': checked, 'is-disabled': disabled}]">
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
    name: 'ElRadio'
  }
</script>

<script lang='ts' setup>
import { computed, ref } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, Boolean], default: false },
  label: { type: [String, Number, Boolean], default: '' },
  disabled: Boolean,
  border: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
    validator: (val: string) => ['', 'medium', 'small', 'mini'].includes(val)
  }
})
const emit = defineEmits(['update:modelValue'])
const input = ref(null)

const model = computed({
  get(){
    return props.modelValue
  },
  set(val){
    if(!props.border && props.size) return
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
  margin-right: 15px;
  display: inline-flex;
  align-items: center;
  &.is-checked{
    color: #409eff;
    .el-radio__input{
      border: 1px solid #409eff;
      background-color: #409eff;
      &.el-radio__input::before{
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: white;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .el-radio__input{
    display: inline-block;
    position: relative;
    transition: .5s;
    margin-right: 5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #dcdfe6;
    .el-radio__origan{
      position: absolute;
      transform: scale(0);
    }
  }
  &.is-disabled{
    cursor: not-allowed;
    color: #999;
    .el-radio__input{
      border: 1px solid #dcdfe6;
      background-color: #dcdfe6;
    }
  }
  &.is-border{
    transition: .5s;
    border: 1px solid #dcdfe6;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    &.is-checked{
      border: 1px solid #409eff;
    }
    &.el-radio--medium{
      padding: 5px 9px;
    }
    &.el-radio--small{
      padding: 4px 8px;
    }
    &.el-radio--mini{
      padding: 3px 8px;
    }
  }
}
</style>