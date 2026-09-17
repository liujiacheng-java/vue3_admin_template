<template>
    <div>
        <Category :scene="scene" />
        <el-card>
            <elt
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import Category from '@/components/Category.vue'
import { ElCard } from 'element-plus';
//切换场景
let scene = ref<number>(0)
//当前页码
let pageNo = ref<number>(1)
//每页显示条数
let pageSize = ref<number>(10)
</script>

<style lang='scss' scoped></style>