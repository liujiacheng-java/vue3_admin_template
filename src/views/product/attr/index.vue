<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 20px 0">
      <div v-show="scene == 0">
        <el-button
          @click="scene = 1"
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
        >
          添加平台属性
        </el-button>
        <el-table style="margin: 20px 0" border :data="attrList">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          />
          <el-table-column label="属性名称" width="200px" prop="attrName" />
          <el-table-column label="属性值名称">
            <template #default="{ row, $index }">
              <el-tag
                v-for="(item, index) in row.attrValueList"
                :key="index"
                style="margin: 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template #default="{ row, $index }">
              <el-button
                type="success"
                icon="Edit"
                @click="updateAttr(row as Attr)"
              />
              <el-popconfirm
                :title="`你确定删除${row.attrName}吗?`"
                width="200px"
                @confirm="removeAttr(row as Attr)"
              >
                <template #reference>
                  <el-button type="danger" icon="Delete" />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加属性与修改数据的结构 -->
      <div v-show="scene == 1">
        <!-- 展示添加属性与修改数据的结构 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请你输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          @click="addAttrValue"
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!attrParams.attrName"
        >
          添加属性值
        </el-button>
        <el-button type="primary" size="default" @click="scene = 0">
          取消
        </el-button>
        <el-table
          border
          style="margin: 10px 0px"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row, $index }">
              <el-input
                :ref="(element: any) => {
                                inputRefs[$index] = element
                            }"
                @blur="toLook(row as AttrValue, $index)"
                v-if="row.flag"
                v-model="row.valueName"
              ></el-input>
              <div @click="toEdit(row as AttrValue, $index)" v-else>
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #default="{ row, $index }">
              <el-button
                type="danger"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          :disabled="attrParams.attrValueList.length == 0"
          @click="saveAttr"
        >
          保存
        </el-button>
        <el-button type="primary" size="default" @click="scene = 0">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, reactive, watch, nextTick, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
import type {
  AttrResponseData,
  AttrList,
  Attr,
  AttrValue,
} from '@/api/product/attr/type'
let categoryStore = useCategoryStore()
let attrList = ref<AttrList>([])
//场景：添加平台属性切换
let scene = ref<number>(0)
//收集数据
let attrParams = reactive<Attr>({
  attrName: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: [],
})

//表单输入框引用
let inputRefs = ref<any[]>([])
//当三级分类选择完毕之后，获取对应分类下已有的属性与属性值接口
watch(
  () => categoryStore.c3Id,
  (newVal) => {
    //应先清空属性列表
    attrList.value = []
    //保证三级分类有才发请求
    if (!categoryStore.c3Id) return
    getAttr()
  },
)
//获取对应分类下已有的属性与属性值接口
const getAttr = async () => {
  let res = await reqAttr(
    categoryStore.c1Id,
    categoryStore.c2Id,
    categoryStore.c3Id,
  )
  // console.log(res)

  if (res.code == 200) {
    //获取所有属性
    attrList.value = res.data
  }
}
const addAttrValue = () => {
  attrParams.attrValueList.push({ valueName: '', flag: true })
  const index = attrParams.attrValueList.length - 1
  nextTick(() => {
    inputRefs.value[index]?.focus()
  })
}
const updateAttr = (row: Attr) => {
  scene.value = 1
  inputRefs.value = []
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
const removeAttr = async (row: Attr) => {
  // console.log('删除属性', row)
  let res = await reqRemoveAttr(row.id as number)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除属性成功',
    })
    //再次发请求获取已有全部的属性数据
    await getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除属性失败',
    })
  }
}
//发请求添加属性与属性值接口
const saveAttr = async () => {
  attrParams.categoryId = categoryStore.c3Id
  let res = await reqAddOrUpdateAttr(attrParams)
  if (res.code == 200) {
    //切换场景
    scene.value = 0
    //弹出提示信息
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改属性成功' : '添加属性成功',
    })
    //清空表单数据
    attrParams.attrName = ''
    delete attrParams.id
    attrParams.attrValueList = []
    attrParams.categoryId = ''
    inputRefs.value = []
    //再次发请求获取已有全部的属性数据
    await getAttr()
  }
  //添加或修改属性失败
  else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改属性失败' : '添加属性失败',
    })
  }
}
//属性值编辑模式与查看模式切换

const toEdit = (row: AttrValue, index: number) => {
  row.flag = true
  nextTick(() => {
    inputRefs.value[index]?.focus()
  })
}
const toLook = (row: AttrValue, index: number) => {
  // 非法情况1: 判断属性值是否为空,为空则直接删除该属性值
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice(index, 1)
    ElMessage({
      type: 'warning',
      message: '属性值不能为空,已删除该属性值',
    })
    return
  }
  // 非法情况2: 判断属性值是否已存在,已存在则提示用户输入其他属性值
  let exist = attrParams.attrValueList.find((item) => {
    return item.valueName == row.valueName && item != row
  })
  if (exist) {
    ElMessage({
      type: 'warning',
      message: '属性值已存在,请输入其他属性值',
    })
    row.valueName = ''
    return
  }
  row.flag = false
}

onBeforeUnmount(() => {
  categoryStore.$reset()
})
//监视每一个 Input 数组里面的 Flag 值,当 Flag 值为 true 时,自动聚焦到输入框中
// watch(inputRefs, (newVal) => {
//     newVal.forEach((item, index) => {
//         if (item.flag) {
//             //使用 nextTick 方法,保证组件挂载完毕后再调用 focus 方法
//             nextTick(() => {
//                 item.focus()
//             })
//         }
//     })
// }, { deep: true })

//自动聚焦功能:
//在属性值编辑模式下,当用户点击属性值输入框时,自动聚焦到输入框中,方便用户输入属性值
//1.将input输入框添加到数组里,当组件卸载,更新,挂载的时候,会执行ref的回调函数,将input输入框添加到数组里
//2.当退出编辑模式时,数组里对应索引的元素会变为null,进入编辑模式时,要等组件挂载完毕后,再调用focus()方法,所以要使用nextTick()方法
//3.把focus()的逻辑写在ref的回调函数里,当组件挂载完毕后,调用focus()方法,实现自动聚焦功能
//不能传到回调里面，当attrParams.attrValueList发生变化时（添加或删除数组元素时），e-table的每一列就会重新渲染一遍，那回调函数就会被执行好几次
//
</script>

<style lang="scss" scoped>
/* .el - table 改为 .el-table */
.el-table {
  /* margin - top 改为 margin-top */
  margin-top: 20px;
}
</style>
