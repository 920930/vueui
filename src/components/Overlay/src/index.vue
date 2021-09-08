<script lang='ts'>
import { createVNode, defineComponent, renderSlot, h } from 'vue'

export default defineComponent({
  name: 'ElOverlay',
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1000
    }
  },
  setup (props, { slots, emit }) {

    return () => {
      return props.mask
        ? createVNode(
          'div',
          {
            class: ['el-overlay-mask'],
            style: { zIndex: props.zIndex }
          },
          [ renderSlot(slots, 'default') ]
        )
        : h(
          'div',
          {
            style: {
              zIndex: props.zIndex
            }
          },
          [ renderSlot(slots, 'default') ]
        )
    }
  }
})
</script>

<style scoped>
.el-overlay-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  overflow: auto;
}
</style>