<template>
  <div
    :class="[ 'el-select', {'is-disabled': disabled} ]"
    v-select='{disabled, modelValue}'
  >
    <input
      type="text"
      :placeholder='placeholder'
      :disabled='disabled'
      class="el-select--input"
      v-if="filterable"
    />
    <div class="el-select--input" v-else>{{placeholder}}</div>
    <i class="fas fa-angle-down el-select--icon"></i>
    <ul @click="changeBtn" class="el-select--list" style="display: none">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang='ts'>
import select from '../../directive/select'
export default {
  name: 'ElSelect',
  directives: {
    select
  }
}
</script>

<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue'
const props = defineProps({
  modelValue: [String, Number, Boolean, Object],
  placeholder: { type: String, default: '请选择' },
  disabled: Boolean,
  filterable: Boolean
})
const emit = defineEmits(['update:modelValue'])
const changeBtn = (e: MouseEvent) => {
  let tar = e.target as HTMLLIElement
  if(tar.tagName === 'LI' || tar.tagName === 'SPAN') {
    if(tar.dataset.v === props.modelValue) return;
    emit('update:modelValue', tar.dataset.v)
  } else {
    e.stopPropagation()
  }
}
</script>

<style lang='less' scoped>
.el-select {
  position: relative;
  width: 100%;
  font-size: 13px;
  box-sizing: border-box;
}
.is-disabled{
  width: 100%;
  cursor: not-allowed;
  border-radius: 5px;
}
.el-select--list {
  position: absolute;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, .2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
  border-radius: 5px;
  margin-top: 15px;
  background-color: white;
  &.el-select--list::after, &.el-select--list::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    border-style: solid;
  }
  &.el-select--list::after {
    border-color: transparent transparent white;
    border-width: 10px;
  }
  &.el-select--list::before {
    border-color: transparent transparent black;
    border-width: 10px;
  }
}
.el-select--input {
  width: 100%;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  box-sizing: border-box;
  color: #333;
}
.el-select--icon{
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #666;
}
</style>