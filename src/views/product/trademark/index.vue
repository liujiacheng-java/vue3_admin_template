<template>
  <el-card>
    <el-button type="primary" icon="Plus" size="default" @click="addTrademark">
      添加品牌
    </el-button>
    <el-table style="margin: 20px" border :data="trademarkList">
      <el-table-column label="ID" width="80px" prop="id" align="center" type="index"></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌Logo">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 50px; height: 50px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
          <el-popconfirm :title="`确认删除品牌${row.tmName}吗？`" width="250px" icon="Delete"
            @confirm="deleteTrademark(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" layout="prev,
                pager, next, jumper,->,sizes,total" :total="total" background @current-change="getHasTrademark"
      @size-change="sizeChange" />
  </el-card>
  <!-- 对话框 -->
  <el-dialog :title="trademarkParams.id ? '修改品牌' : '添加品牌'" v-model="dialogVisible" width="50%">
    <el-form style="width: 80%" :rules="rules" :model="trademarkParams" ref="formRef">
      <el-form-item label="品牌名称" label-width="80px" prop="tmName">
        <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOG0" label-width="80px" prop="logoUrl">
        <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :headers="uploadHeaders"
          :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" alt=""
            style="width: 178px; height: 178px" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 具名插槽:footer -->
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { UploadProps, ElMessage } from 'element-plus'
import { onMounted, ref, reactive } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import { GET_TOKEN } from '@/utils/token'
import { tr } from 'element-plus/es/locale'
//当前页码
let pageNo = ref<number>(1)
//每页显示条数
let limit = ref<number>(3)
//品牌列表
let trademarkList = ref<Records>([])
//品牌总数
let total = ref<number>(0)
//对话框可见性
let dialogVisible = ref<boolean>(false)
//定义收集表单新数据的对象
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
//表单数据的ref对象
const formRef = ref()

const uploadHeaders = {
  Token: GET_TOKEN() || '',
}
//获取已有品牌的接口封装为一个函数:在任何情况下向获取数据，调用次函数即可
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let res: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (res.code === 200) {
    trademarkList.value = res.data.records
    total.value = res.data.total
  }
}

onMounted(() => {
  getHasTrademark()
})
const sizeChange = () => {
  getHasTrademark()
}
//添加品牌
const addTrademark = () => {
  dialogVisible.value = true
  //清空表单数据
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  //第一种写法:ts的问号语法
  // formRef.value?.clearValidate('tmName');// formRef.value?.clearValidate('logoUrl');nextTick(() =
  formRef.value.clearValidate('tmName')
  formRef.value.clearValidate('logoUrl')
}
//修改品牌
const updateTrademark = (row: TradeMark) => {
  dialogVisible.value = true
  //回显数据
  Object.assign(trademarkParams, row)
  formRef.value.clearValidate('tmName')
  formRef.value.clearValidate('logoUrl')
}

//取消
const cancel = () => {
  dialogVisible.value = false
}
//确定
const confirm = async () => {
  //校验全部表单数据
  await formRef.value.validate()

  let result: any = await reqAddOrUpdateTrademark(trademarkParams) //添加或修改品牌成功
  if (result.code == 200) {
    //关闭对话框
    dialogVisible.value = false
    //弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    //再次发请求获取已有全部的品牌数据
    await getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  }
  //添加或修改品牌失败
  else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
}
//删除品牌
const deleteTrademark = async (id: number) => {
  let res = await reqDeleteTrademark(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    //再次发请求获取已有全部的品牌数据
    await getHasTrademark(
      trademarkList.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}

//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //钩子是在图片上传成功之前触发，上传文件之前可以约束文件类型与大小//要求:上传文件格式png|jpglgif 4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小务必小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF',
    })
    return false
  }
}
//上传图片成功之后触发的钩子函数
const handleUploadSuccess = (response: { data: string }) => {
  trademarkParams.logoUrl = response.data
  //删除表单校验对应图片的提示信息
  formRef.value.clearValidate('logoUrl')
}
const validateName = (rule: any, value: string, callback: any) => {
  console.log('validateName', value)
  if (value.length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称至少2个字符'))
  }
}
const validateLogoUrl = (rule: any, value: string, callback: any) => {
  //value是logoUrl的值
  if (value) {
    callback()
  } else {
    callback(new Error('请上传品牌LOGO'))
  }
}
let rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validateName }],
  logoUrl: [{ required: true, trigger: 'change', validator: validateLogoUrl }],
}
</script>
<style lang="scss" scoped></style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
