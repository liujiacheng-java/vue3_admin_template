<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0">
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <!-- 两个输入框 -->
          <!-- 添加表单校验 -->
          <el-form-item :rules="loginFormRules.username" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item :rules="loginFormRules.password" prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" :prefix-icon="Lock" show-password
              type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" style="width: 100%" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getCurrentTime } from '@/utils/time'

let $router = useRouter()
let $route = useRoute()
//加一个按钮加载效果
let loading = ref(false)

let userStore = useUserStore()
let loginForm = reactive({
  username: 'admin',
  password: '111111'
})
let loginFormRef = ref()
//自定义表单校验规则
const validateUsername = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('用户名不能为空'))
  } else if (value.length < 5 || value.length > 10) {
    callback(new Error('用户名必须在6-10个字符之间'))
  } else {
    callback()
  }
}

const validatePassword = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('密码不能为空'))
  } else if (value.length < 6 || value.length > 20) {
    callback(new Error('密码必须在6-20个字符之间'))
  } else {
    callback()
  }
}

let loginFormRules = reactive({
  username: [
    //错误提示信息
    { required: true, validator: validateUsername, trigger: 'change' }
  ],
  password: [
    { required: true, validator: validatePassword, trigger: 'change' }
  ]
})

const login = async () => {
  //表单校验失败不发送请求
  await loginFormRef.value.validate()
  loading.value = true
  try {
    //登录成功
    await userStore.userLogin(loginForm)
    let currentTime = getCurrentTime()
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `HI,${currentTime} `

    })
    loading.value = false
    // 加上 as string
    $router.push(($route.query.redirect as string) || '/');
  } catch (error) {
    ElNotification.error((error as Error).message || '登录失败')
    // console.log(error);
    loading.value = false
  }
}

</script>

<style lang='scss' scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/bg1920x1080.png') no-repeat center center;
  background-size: cover;

  .login-form {
    position: relative;
    top: 30vh;
    left: 10%;
    width: 80%;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;

    h1 {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }


}
</style>