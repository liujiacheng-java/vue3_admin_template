<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!--没有子路由-->
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="!item.meta.hidden">
        <el-icon v-if="item.meta?.icon" :size="20">
          <component :is="item.meta.icon" />
        </el-icon>
        <template #title>

          {{ item.meta?.title }}
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由但是只有一个子路由 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden">
        <el-icon v-if="item.children[0].meta?.icon" :size="20">
          <component :is="item.children[0].meta.icon" />
        </el-icon>
        <template #title>

          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由且个数大于一个1 -->
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
      <template #title>
        <el-icon v-if="item.meta?.icon" :size="20">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang='ts'>
import { el } from 'element-plus/es/locale';
import { useRouter } from 'vue-router';

defineProps(['menuList'])

const router = useRouter();
function goRoute(e: any) {
  router.push(e);
}




</script>

<script lang='ts'>
export default {
  name: 'Menu',
  // props: {
  //   menuList: {
  //     type: Array,
  //     default: () => []
  //   }
  // }
}
</script>
<style lang='scss' scoped></style>