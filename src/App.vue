<template>
  <div class="init">
    <el-swiper>
      <el-swiper-slide v-for="(item, index) in swiperData" :key="index">
        <img :src="item.url" :alt="item.title">
      </el-swiper-slide>
    </el-swiper>
  </div>
</template>

<script lang="ts" setup>
import {swiperData} from './data/swiper'
</script>

<style>
@import url('https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/all.min.css');
*{
  margin: 0;
  padding: 0;
}
body{
  width: 100%;
  height: 100%;
  overflow:auto
}
li{
  list-style: none;
}
.init{
  margin: 150px;
  width: 520px;
  height: 280px;
}
</style>
