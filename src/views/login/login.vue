<template>
  <div class="login_container">
    <div class="flex justify-center items-center">
      <div class="flex-center z-99 logo mr110px">
        <div class="mr-60px">
          <div class="text-30px c-#fff text-center">
            <span>VVT Admin</span>
          </div>
          <SvgIcon
            name="login"
            width="400"
            height="400"
          />
          <h2 class="white text-left mb10px">开箱即用的中后台管理系统</h2>
          <h5 class="white text-left mb10px">输入您的个人详细信息开始使用！</h5>
        </div>
      </div>
      <div class="flex-center">
        <div>
          <h1 class="c-#000 text-left mb10px">登录</h1>
          <n-form
            ref="formRef"
            label-placement="left"
            label-width="auto"
            :model="model"
            :rules="rules"
            :show-label="false"
          >
            <n-form-item
              path="number"
              label="账号"
            >
              <n-input
                placeholder="账号"
                clearable
                v-model:value="model.number"
                @keydown.enter.prevent
                size="large"
              >
                <template #prefix>
                  <n-icon :component="Person" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item
              path="password"
              label="密码"
            >
              <n-input
                v-model:value="model.password"
                clearable
                type="password"
                show-password-on="click"
                @keydown.enter.prevent
                size="large"
              >
                <template #prefix>
                  <n-icon :component="LockClosed" />
                </template>
              </n-input>
            </n-form-item>
            <!-- <n-form-item
              ref="rPasswordFormItemRef"
              first
              path="reenteredPassword"
              label="重复密码"
            >
              <n-input
                v-model:value="model.reenteredPassword"
                :disabled="!model.password"
                type="password"
                @keydown.enter.prevent
              >
                <template #prefix>
                  <n-icon :component="LockClosed" />
                </template>
              </n-input>
            </n-form-item> -->
            <n-form-item
              ref="codeRef"
              first
              path="code"
              label="验证码"
              size="large"
            >
              <n-input
                v-model:value="model.code"
                clearable
                type="text"
                @keydown.enter.prevent
              >
                <template #prefix>
                  <n-icon :component="ShieldCheckmarkSharp" />
                </template>
              </n-input>
              <div style="width: 120px; height: 34px">
                <VerificationCode @getIdentifyCode="getIdentifyCode"></VerificationCode>
              </div>
            </n-form-item>
            <n-row :gutter="[0, 24]">
              <n-col :span="24">
                <div style="display: flex; justify-content: center">
                  <n-button
                    style="width: 100%"
                    :disabled="model.number === null"
                    type="primary"
                    @click="handleValidateButtonClick"
                  >
                    验证
                  </n-button>
                </div>
              </n-col>
            </n-row>
            <n-row :gutter="[0, 24]">
              <n-col
                class="white"
                :span="6"
                >账号: root</n-col
              >
              <n-col
                class="white"
                :span="6"
                >密码: 123456</n-col
              >
            </n-row>
          </n-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FormInst, FormItemInst, FormItemRule, useMessage, FormRules } from 'naive-ui'
import { Person, LockClosed, ShieldCheckmarkSharp } from '@vicons/ionicons5'
import VerificationCode from '@/components/VerificationCode/VerificationCode.vue'
import { getVaildCode } from '@/api/login/login'

getVaildCode().then((res: any) => {
  console.log('验证码1', res)
})

interface ModelType {
  number: string | null
  password: string | null
  code: string | null
}
const router = useRouter()
const formRef = ref<FormInst | null>(null)
// const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const codeRef = ref<FormItemInst | null>(null)
const message = useMessage()

const model = ref<ModelType>({
  number: 'root',
  password: '123456',
  code: null
})

function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
  return (
    !!model.value.password &&
    model.value.password.startsWith(value) &&
    model.value.password.length >= value.length
  )
}

const rules: FormRules = {
  number: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('请输入账号')
        } else if (value.length > 13) {
          return new Error('账号不超过13位')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码'
    },
    {
      validator: validateCode,
      message: '验证码不正确'
      // trigger: 'input'
    }
  ],
  reenteredPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
}
const vaildCode = ref('')
function getIdentifyCode(val: string) {
  getVaildCode()
  vaildCode.value = val
}

// function handlePasswordInput () {
//   if (model.value.reenteredPassword) {
//     rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
//   }
// }

function validateCode() {
  return model.value.code === vaildCode.value
}

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === model.value.password
}

function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(errors => {
    if (!errors) {
      router.push('/index')
      message.success('登录成功')
    } else {
      console.log(errors)
      message.error('验证失败')
    }
  })
}
</script>

<style scoped lang="less">
.login_container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  .logo {
    @media (max-width: 950px) {
      display: none;
    }
  }
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url('@/assets/svgs/login-bg.svg');
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
    @media (max-width: 950px) {
      display: none;
    }
  }
  .white {
    color: #fff;
  }
  .code {
    width: auto;
    height: 100%;
    cursor: pointer;
    padding-left: 4px;
  }
}
</style>
