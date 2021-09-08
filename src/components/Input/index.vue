<template>
  <div v-if="type == ('text' || 'password')" class="el-input">
    <input
      ref="dom"
      v-bind="$attrs"
      :type="typeInfo"
      :value="modelValue"
      @input="updateValue"
      :disabled='disabled'
      :class="[
        'el-input__inner',
        {
          is_disabled: disabled,
        },
        size ? 'el-input__' + size : ''
      ]"
    >

    <span v-show="clearable && modelValue.trim().length" @click="clearBtn" class="icon-clear">
      <i class="far fa-times-circle"></i>
    </span>

    <span v-show="showPassword && modelValue.trim().length" @click="showPasswordBtn" class="icon-clear">
      <i class="far fa-eye"></i>
    </span>

    <span class="el-input__prefix">
      <slot name="prefix"> <i v-if="prefixIcon" :class="prefixIcon"></i> </slot>
    </span>

    <span class="el-input__suffix">
      <slot name="suffix"> <i v-if="suffixIcon" :class="suffixIcon"></i> </slot>
    </span>
    
  </div>
  
  <div v-else class="el-input">
    <textarea class="el-input__textarea" :rows='rows' @input="updateValue" :value="modelValue"></textarea>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'ElInput',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (val: string) => ['text', 'password', 'textarea'].includes(val)
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    size: {
      type: String,
      validator: (val: string) => ['medium', 'small', 'mini'].includes(val)
    },
    disabled: Boolean,
    clearable: Boolean,
    showPassword: Boolean,
    prefixIcon: String,
    suffixIcon: String,
    rows: {
      type: [String, Number],
      default: 3
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const dom = ref(null)
    const typeInfo = ref(props.showPassword ? 'password' : (props.type == 'password' ? 'password' : 'text'))

    const updateValue = (e: any) => {
      let value: string = ''
      if(e.target) value = e.target.value
      else value = e.value
      emit('update:modelValue', value)
    }

    const clearBtn = () => {
      const domInput = dom.value as unknown as HTMLInputElement
      domInput.value = ''
      updateValue(domInput)
    }

    const showPasswordBtn = () => {
      // 这里继续工作
      typeInfo.value = typeInfo.value.includes('password') ? 'text' : 'password'
    }

    onMounted(() => {
      const domInput = dom.value as unknown as HTMLInputElement
      if(domInput) {
        const prefix = (domInput.parentNode as HTMLElement).getElementsByClassName('el-input__prefix')[0]
        const suffix = (domInput.parentNode as HTMLElement).getElementsByClassName('el-input__suffix')[0]
        prefix.childNodes.forEach( item => item.nodeType === 1 && (domInput.style.paddingLeft = '30px'))
        suffix.childNodes.forEach( item => item.nodeType === 1 && (domInput.style.paddingRight = '30px'))
      }
    })

    return {
      updateValue,
      clearBtn,
      showPasswordBtn,
      dom,
      typeInfo
    }

  }
})
</script>

<style lang='less' scoped>
.el-input {
  position: relative;
  overflow: hidden;
  font-size: 14px;
  width: 100%;
}
.el-input__inner {
  outline: none;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 13px;
  font-size: inherit;
  box-sizing: border-box;
  color: #606266;
  background-color: white;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: .1s;
  &:hover {
    box-shadow: 0px 0px 8px 0px rgba(232, 237, 250, 0.6), 0px 2px 4px 0px rgba(232, 237, 250, 0.5);
  }
  &:focus {
    border-color: #409eff;
  }
}
.is_disabled{
  cursor: not-allowed;
  background-color: #ebeef5;
}
.icon-clear{
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #606266;
  cursor: pointer;
}

.el-input__medium{
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
}
.el-input__small{
  font-size: 13px;
  height: 32px;
  line-height: 32px;
  padding: 0 11px;
}
.el-input__mini{
  font-size: 12px;
  height: 28px;
  line-height: 28px;
  padding: 0 10px;
}

.el-input__prefix{
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #606266;
  cursor: pointer;
}

.el-input__suffix{
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #606266;
  cursor: pointer;
}


.el-input__textarea{
  border: none;
  outline: none;
  width: 100%;
  font-size: 12px;
  box-sizing: border-box;
  color: #606266;
  background-color: white;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
  transition: .1s;
  &:hover {
    box-shadow: 0px 0px 8px 0px rgba(232, 237, 250, 0.6), 0px 2px 4px 0px rgba(232, 237, 250, 0.5);
  }
  &:focus {
    border-color: #409eff;
  }
}
</style>
