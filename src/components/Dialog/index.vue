<template>
  <teleport to="body" :disabled='!appenToBody'>
    <transition name="dialog">
      <el-overlay v-show="modelValue" :mask='modal' :z-index="zIndex">
        <div class="el-dialog" :style="[widthInfo, topInfo]"  ref="dialog">
          <div class="el-dialog__header">
            <slot name="header">
              <span :class="{'el-dialog--center': center}">{{title}}</span>
              <span @click="closeBtn" v-if="showClose"><i class="fas fa-times"></i></span>
            </slot>
          </div>
          <div v-if="$slots.default" class="el-dialog__body">
            <slot></slot>
          </div>
          <div v-if="$slots.footer" :class="['el-dialog__footer', {'el-dialog--center': center}]">
            <slot name="footer"></slot>
          </div>
        </div>
      </el-overlay>
    </transition>
  </teleport>
</template>

<script lang='ts'>
import { computed, defineComponent, toRefs, ref } from 'vue'
import { Overlay } from '../Overlay'

export default defineComponent({
  name: 'ElDialog',
  components: {
    'el-overlay': Overlay
  },
  props: {
    modelValue: Boolean,
    title: {
      type: String,
      default: '提示'
    },
    center: Boolean,
    appenToBody: Boolean,
    showClose: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: 400
    },
    top: {
      type: String,
      default: '30%'
    },
    zIndex: Number,
    close: {
      type: Function
    }
  },
  emits: ['update:modelValue', 'close'],
  setup (props, {emit}) {
    const { modelValue, width, top } = toRefs(props)

    const dialog = ref(null)

    const widthInfo = computed(() => {
      if(typeof width.value == 'string'){
        if(/(em|rem|px|%)$/.test(width.value)) return { width: width.value }
        else return { width: width.value + 'px' }     
      }
      else return width.value + 'px'
    })

    const topInfo = computed(() => {
      if(/(vh|%|px|em|rem)/.test(top.value)) return { top: top.value}
      else return { top: top.value + 'px' }
    })

    const closeBtn = () => {
      emit('update:modelValue', !modelValue.value)
      emit('close')
    }

    return {
      dialog,
      closeBtn,
      widthInfo,
      topInfo,
    }
  }
})
</script>

<style lang='less' scoped>
.el-dialog {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  background-color: white;
  padding: 20px 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, .33);
  border-radius: 5px;
  color: #303133;
}
.el-dialog__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.el-dialog__header span:first-of-type{
  flex: 1;
  font-size: 18px;
}
.el-dialog__header span:last-of-type{
  cursor: pointer;
}

.el-dialog__footer{
  margin-top: 25px;
  text-align: right;
}
.dialog--footer button:first-of-type{
  margin-right: 20px;
}

.el-dialog--center {
  text-align: center;
}
</style>
