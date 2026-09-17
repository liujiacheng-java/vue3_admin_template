<template>
  <div class="tabbar">
    <!-- 左侧面包屑导航 -->
    <div class="tabbar_left">
      <el-icon>
        <component
          :is="LayoutSettingStore.fold ? 'Expand' : 'Fold'"
          @click="LayoutSettingStore.fold = !LayoutSettingStore.fold"
        />
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="item.path"
          v-show="item.meta?.title !== '展示'"
          :to="item.path"
        >
          <span class="breadcrumb-item">
            <el-icon v-if="item.meta?.icon" :size="18">
              <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右侧按钮组 -->
    <div class="tabbar_right">
      <el-button
        link
        icon="Refresh"
        circle
        @click="LayoutSettingStore.refresh = !LayoutSettingStore.refresh"
      ></el-button>
      <el-button link icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-button link icon="Setting" circle></el-button>
      <img :src="userStore.avatar" alt="" class="user-avatar" />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
import { useRoute, useRouter } from 'vue-router'
const userStore = useUserStore()

let LayoutSettingStore = useLayOutSettingStore()
let $route = useRoute()
let $router = useRouter()
const fullScreen = () => {
  //DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]let full = document.fullscreenElement;
  //切换为全屏模式
  let full = document.fullscreenElement

  if (!full) {
    //文档根节点的方法requestFullscreen,实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    //变为不是全屏模式->退出全屏模式
    document.exitFullscreen()
  }
}
// const userStore = useUserStore()
//退出登录点击回调
const logout = async () => {
  //第一件事情:需要向服务器发请求[退出登录接口]******
  //第二件事情:仓库当中关于用于相关的数据清空[token|username|avatar]
  // //第三件事情:跳转到登录页面
  await userStore.userLogout()
  // 跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
<style lang="scss" scoped>
.tabbar {
  display: flex;
  align-items: center;
  // space-between两侧靠边对齐
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .tabbar_left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    font-size: 20px;
    height: 100%;
    cursor: pointer;

    :deep(.el-breadcrumb) {
      white-space: nowrap;
    }

    .breadcrumb-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
  }

  .tabbar_right {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    font-size: 24px;
    height: 100%;
    cursor: pointer;
  }

  .user-avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
