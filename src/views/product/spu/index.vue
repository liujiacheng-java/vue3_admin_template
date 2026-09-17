<template>
  <div>
    <Category :scene="scene" />
    <el-card>
      <el-button @click="scene = 1" type="primary" icon="Plus">
        添加spu属性
      </el-button>
      <el-table style="margin: 20px 0" border>
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>

        <el-table-column label="SPU名称"></el-table-column>
        <el-table-column label="SPU描述"></el-table-column>
        <el-table-column label="SPU操作"></el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        layout="prev,
                pager, next, jumper,->,sizes,total"
        background
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElCard } from 'element-plus'
//切换场景
let scene = ref<number>(0)
//当前页码
let pageNo = ref<number>(1)
//每页显示条数
let pageSize = ref<number>(10)
</script>

<style lang="scss" scoped></style>
