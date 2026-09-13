<template>
    <div>
        <Category />
        <el-card style="margin:20px 0; ">
            <el-button type="primary" icon="Plus">添加平台属性</el-button>
            <el-table style="margin:20px 0" border>
                <el-table-column label="序号" type="index" width="80px" align="center" />
                <el-table-column label="属性名称" width="200px" />
                <el-table-column label="属性值名称" />
                <el-table-column label="操作" width="200px" />
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { el } from 'element-plus/es/locale';
import { ref, reactive } from 'vue'

</script>

<style lang='scss' scoped></style>