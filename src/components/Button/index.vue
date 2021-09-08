<template>
  <span v-if="text"><slot></slot></span>

  <button v-else :class="['btn',
    type == 'default' ? '' : 'btn-'+type,
      {
        'is_plain': plain,
        'is_round': round,
        'is_circle': circle,
        'is_disabled': disabled
      },
      size ? 'btn-'+size : ''
    ]">
    <template v-if="loading">
      <i class="fas fa-spinner" ref="load"></i>
      <span style="margin-left:5px"><slot></slot></span>
    </template>
    <template v-else>
      <i :class="[icon, 'icon-left']"></i>
      <span><slot></slot></span>
    </template>
  </button>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'ElButton',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (val: string) => ['text', 'primary', 'success', 'warning', 'danger', 'info', 'default'].includes(val)
    },
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
    disabled: Boolean,
    text: Boolean,
    icon: String,
    loading: Boolean,
    size: {
      type: String,
      validator: (val: string) => ['medium', 'small', 'mini'].includes(val)
    }
  },
  setup (props) {
    const name = ref('xuan-lang')
    const load = ref(null)
    let rotate = ref(0)
    onMounted(() => {
      const dom = load.value as unknown as HTMLElement
      if(dom && props.loading) {
        setInterval(() => {
          rotate.value += 1
          dom.style.transform = 'rotate('+ rotate.value +'deg)'
        })
      }
    })
    return {
      load,
      name
    }
  }
})
</script>

<style lang='less' scoped>
button, input, select, textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}
.btn{
  display: inline-block;
  line-height: 1;
  min-height: 40px;
  white-space: nowrap;
  cursor: pointer;
  color: #606266;
  border: 1px solid #dcdfe6;
  background-color: white;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
  transition: .1s;
  &:hover{
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6),
      0 2px 4px 0 rgba(232, 237, 250, .5);
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  &.is_plain{
    &:hover{
      color: #409eff;
      border-color: #409eff;
      background-color: white;
    }
  }
  &.is_round{
    border-radius: 20px;
  }
  &.is_circle{
    border-radius: 50%;
    padding: 12px;
  }
}

.btn-primary{
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  &:hover{
    color: #fff;
    background-color: #66b1ff;
    border-color: #66b1ff;
  }
  &.is_plain{
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
    &:hover{
      color: #fff;
      background-color: #66b1ff;
      border-color: #66b1ff;
    }
  }
}

.btn-success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
  &:hover{
    color: #fff;
    background-color: #85ce61;
    border-color: #85ce61;
  }
  &.is_plain{
    color: #67c23a;
    background: #f0f9eb;
    border-color: #c2e7b0;
  }
}

.is_disabled{
  cursor: not-allowed;
}
.btn-medium {
  min-height: 36px;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.btn-small {
  min-height: 32px;
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
}
.btn-mini {
  min-height: 28px;
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
}

.icon-left{
  margin-right: 4px;
}
</style>
