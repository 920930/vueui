<template>
  <li :data-v='value' :class="{'is-disabled': disabled}" @click="itemBtn">
    <span :data-v='value'>{{label}}</span>
  </li>
</template>

<script lang='ts'>
export default { name: 'ElOption' }
</script>

<script lang='ts' setup>
import {} from 'vue'
const props = defineProps({
  label: String,
  value: [Number, String],
  disabled: Boolean
})

const itemBtn = (e: MouseEvent) => props.disabled && e.stopPropagation();

</script>

<style lang='less' scoped>
li{
  cursor: pointer;
  padding: 6px 10px;
  font-size: 14px;
}
li:hover{
  background-color: #f5f7fa;
}
.is-disabled{
  background-color: #f5f7fa;
  cursor: not-allowed;
}
</style>