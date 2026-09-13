<template>
    <div class="logo" v-if="settings.logoHidden">
        <img :src="settings.logo" :alt="settings.logo">
        <p>{{ settings.title }}</p>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import settings from '@/setting'

</script>
<script lang='ts'>
export default {
    name: 'Logo',
}
</script>
<style lang='scss' scoped>
.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    // margin-bottom: 20px;
    height: $base-menu-logo-height;
    padding: 20px;

    img {
        //左侧菜单logo高度设置
        // $base-menu-logo-height: 50px;

        // //左侧菜单logo右侧文字大小
        // $base-logo-title-fontSize: 20px;
        width: 40px;
        height: 40px;
        // margin-bottom: 10px;
    }

    p {
        font-size: 20px;
        color: #fefdfd;
        margin-left: 15px;
        font-weight: bold;
        overflow: hidden;
    }
}
</style>