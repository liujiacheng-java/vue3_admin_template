<template>
    <div class="layout_container">
        <!-- /* 侧边栏 */ -->
        <div class="layout_slider" :class="{ 'fold': LayoutSettingStore.fold }">
            <Logo />
            <el-scrollbar class="layout_slider_scrollbar">
                <el-menu :default-active="$route.path" @select="goRoute" :collapse="LayoutSettingStore.fold">
                    <Menu :menuList="userStore.menuRoutes" />
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- /* 顶部导航栏 */ -->
        <div class="layout_tabbar" :class="{ 'fold': LayoutSettingStore.fold }">
            <Tabbar />
        </div>
        <!-- /* 主体内容 */ -->
        <div class="layout_main" :class="{ 'fold': LayoutSettingStore.fold }">
            <router-view v-if="refresh"></router-view>
            <!-- <p>这是主体内容</p> -->
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, watch, nextTick, reactive, onMounted } from 'vue'
import Logo from './logo/logo.vue'
import Menu from './menu/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'

let LayoutSettingStore = useLayOutSettingStore()
let refresh = ref(true)
watch(
    () => LayoutSettingStore.refresh,
    () => {
        refresh.value = false

        nextTick(() => {
            refresh.value = !refresh.value
            // console.log(123);

        })
    }
)
const router = useRouter()
const userStore = useUserStore()
function goRoute(e: any) {
    router.push(e)
}


</script>
<script lang='ts'>
export default {
    name: 'Layout',
}
</script>

<style lang='scss' scoped>
//侧边栏的宽度和顶部导航栏的高度用变量代替,方便修改
// $base-menu-width:260px;
// //左侧菜单的背景颜色
// $base-menu-background:#001529;
// $base-menu-min-width:50px;

// 顶部导航的高度
$base-tabbar-height: 50px;

.layout_container {
    position: relative;
    height: 100vh;
    width: 100%;
    background: url('@/assets/images/layout1920x1080.jpg') no-repeat center center;
    background-size: cover;
    overflow: hidden;

    .layout_slider {
        position: fixed;
        top: 0;
        left: 0;
        width: $base-menu-width;
        min-width: $base-menu-min-width;
        height: 100%;
        color: #fff;
        background-color: $base-menu-background;
        box-shadow: 4px 0 18px rgba(13, 29, 47, 0.18);
        transition: width 0.3s ease;

        // backdrop-filter: blur(8px);
        &.fold {
            width: $base-menu-min-width;
            // overflow: hidden;
        }

        .layout_slider_scrollbar {
            height: calc(100vh - $base-menu-logo-height);
            padding: 18px 14px;
            background-color: rgba(255, 255, 255, 0.06);
            // backdrop-filter: blur(4px);

            :deep(.el-menu) {
                border-right: 0;
                background-color: transparent;
            }

            :deep(.el-menu-item),
            :deep(.el-sub-menu__title) {
                position: relative;
                height: 46px;
                margin: 6px 0;
                padding: 0 16px !important;
                color: rgba(255, 255, 255, 0.78);
                border-radius: 10px;
                transition: color 0.2s ease, background-color 0.2s ease;
            }

            :deep(.el-menu-item .el-icon),
            :deep(.el-sub-menu__title .el-icon) {
                flex: 0 0 24px;
                width: 24px;
                margin-right: 10px;
                color: rgba(255, 255, 255, 0.62);
            }

            :deep(.el-menu--collapse .el-menu-item),
            :deep(.el-menu--collapse .el-sub-menu__title) {
                justify-content: center;
                padding: 0 !important;
            }

            :deep(.el-menu--collapse .el-menu-item .el-icon),
            :deep(.el-menu--collapse .el-sub-menu__title .el-icon) {
                margin-right: 0;
            }

            :deep(.el-menu-item:hover),
            :deep(.el-sub-menu__title:hover) {
                color: #fff;
                background-color: rgba(255, 255, 255, 0.12);
            }

            :deep(.el-menu-item:hover .el-icon),
            :deep(.el-sub-menu__title:hover .el-icon) {
                color: #7dd3fc;
            }

            :deep(.el-menu-item.is-active) {
                color: #fff;
                font-weight: 600;
                background: linear-gradient(90deg, rgba(56, 189, 248, 0.28), rgba(56, 189, 248, 0.08));
            }

            :deep(.el-menu-item.is-active::before) {
                position: absolute;
                left: 0;
                width: 3px;
                height: 22px;
                content: '';
                background-color: #38bdf8;
                border-radius: 0 4px 4px 0;
            }

            :deep(.el-menu-item.is-active .el-icon) {
                color: #38bdf8;
            }

            :deep(.el-sub-menu .el-menu) {
                background-color: rgba(0, 0, 0, 0.12);
                border-radius: 10px;
            }

            :deep(.el-sub-menu .el-menu-item) {
                min-width: 0;
                padding-left: 42px !important;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        top: 0;
        right: 0;
        left: $base-menu-width;
        height: $base-tabbar-height;
        line-height: $base-tabbar-height;
        padding: 0 20px;
        color: #243447;
        background-color: rgba(255, 255, 255, 0.78);
        border-bottom: 1px solid rgba(255, 255, 255, 0.9);
        box-shadow: 0 2px 14px rgba(13, 29, 47, 0.1);
        backdrop-filter: blur(12px);
        z-index: 1;
        transition: left 0.3s ease, width 0.3s ease;

        &.fold {

            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        top: $base-tabbar-height;
        right: 0;
        bottom: 0;
        left: $base-menu-width;
        padding: 20px;
        overflow: auto;
        background-color: rgba(255, 255, 255, 0.16);
        backdrop-filter: blur(2px);
        overflow: auto;
        transition: left 0.3s ease, width 0.3s ease;

        &.fold {
            left: $base-menu-min-width;
        }

        p {
            color: #151313;
            font-size: 20px;
            height: 1000px;
        }
    }

    @media (max-width: 768px) {
        $mobile-menu-width: 200px;

        .layout_slider {
            width: $mobile-menu-width;
        }

        .layout_tabbar,
        .layout_main {
            left: $mobile-menu-width;
        }

        .layout_main {
            padding: 12px;
        }
    }

}
</style>