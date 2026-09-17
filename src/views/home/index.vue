<template>
  <div>我是一级路由展示数据</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
// onMounted(async () => {
//   console.log(await userStore.userInfo())
// })
</script>

<style lang="scss" scoped></style>
