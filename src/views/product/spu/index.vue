<template>
    <div>
        <Category :scene="scene" />
        <el-card>
            <el-button @click="scene = 1" type="primary" icon="Plus" :disabled="!categoryStore.c3Id">
                添加spu属性
            </el-button>
            <el-table style="margin: 20px 0" border :data="records">
                <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>

                <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                <el-table-column label="SPU操作">
                    <!-- row即为已有的spu对象 -->
                    <template #default="{ row, $index }">
                        <el-button type="primary" size="small" icon="plus" title="添加SKU"></el-button>
                        <el-button type="primary" size="small" icon="Edit" title="修改SPU"></el-button>
                        <el-button type="primary" size="small" icon="View" title="查看SKU列表"></el-button>
                        <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                :total="total" layout="prev, pager, next, jumper, ->, sizes, total" background
                @current-change="getHasSpu" @size-change="getHasSpu"></el-pagination>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu } from '@/api/product/spu'
import type { Records, HasSpuResponseData } from '@/api/product/spu/type'
import { ElCard } from 'element-plus'
//切换场景
let scene = ref<number>(0)
//当前页码
let pageNo = ref<number>(1)
//每页显示条数
let pageSize = ref<number>(3)
// 当前分类下的 SPU 总数，接入接口后替换为接口返回值
let total = ref<number>(0)
// 当前分类下的 SPU 列表，接入接口后替换为接口返回值
let records = ref<Records>()
let categoryStore = useCategoryStore()
// 监听三级分类id变化，获取当前三级分类下的所有已有的SPU
watch(() => categoryStore.c3Id, () => {
    pageNo.value = 1
    getHasSpu()
})
// 此方法执行：可以获取某一个三级分类下全部的已有的SPU
const getHasSpu = async () => {
    let res: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    if (res.code === 200) {
        total.value = res.data.total
        records.value = res.data.records
    }
}
</script>

<style lang="scss" scoped></style>
