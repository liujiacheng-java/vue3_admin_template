<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          :disabled="scene === 1"
          style="width: 200px; margin-right: 20px"
          v-model="categoryStore.c1Id"
          @change="handlerC1"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene === 1"
          style="width: 200px; margin-right: 20px"
          v-model="categoryStore.c2Id"
          @change="handlerC2"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="scene === 1"
          style="width: 200px; margin-right: 20px"
          v-model="categoryStore.c3Id"
        >
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'
const { scene } = defineProps<{ scene: number }>()
const categoryStore = useCategoryStore()

onMounted(() => {
  //获取一级分类数据
  categoryStore.getC1()
})
//处理一级分类变化的函数,一级分类变化时，获取对应一级分类下的二级分类数据
const handlerC1 = () => {
  //清空分类数据
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  //获取二级分类数据
  categoryStore.getC2()
}
//处理2级分类变化的函数,2级分类变化时，获取对应2级分类下的3级分类数据
const handlerC2 = () => {
  //清空3级分类数据
  categoryStore.c3Id = ''
  //获取三级分类数据
  categoryStore.getC3()
}
</script>

<style lang="scss" scoped></style>
