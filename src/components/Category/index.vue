<template>
    <el-card>
        <el-form inline>
            <el-form-item label="一级分类">
                <el-select style="width: 200px;margin-right: 20px;" v-model="categoryStore.c1Id">
                    <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select style="width: 200px;margin-right: 20px;">
                    <el-option label="手机" value="phone" />
                    <el-option label="电脑" value="computer" />
                    <el-option label="平板" value="tablet" />
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select style="width: 200px; margin-right: 20px;">
                    <el-option label="手机" value="phone" />
                    <el-option label="电脑" value="computer" />
                    <el-option label="平板" value="tablet" />
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()

onMounted(() => {
    //获取一级分类数据
    categoryStore.getC1()
})
</script>

<style lang='scss' scoped></style>