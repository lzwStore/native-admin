<template>
  <div class="login_container">
    <div>
      <h2 class="white align_center mb10">登录</h2>
      <div style="width: 400px">
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
            <n-col class="white" :span="6">账号: 随便填</n-col>
            <n-col class="white" :span="6">密码: 随便输入</n-col>
          </n-row>
        </n-form>
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
  code: string | null,
}
const router = useRouter()
const formRef = ref<FormInst | null>(null)
// const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const codeRef = ref<FormItemInst | null>(null)
const message = useMessage()

const model = ref<ModelType>({
  number: null,
  password: null,
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
  background-color: #2d3a4b;
  .white {
    color: #fff;
  }
  .align_center {
    text-align: center;
  }
  .mb10 {
    margin-bottom: 10px;
  }
  .n-form {
    .n-input, .n-input--disabled {
      --n-color: transparent !important;
      --n-border: 1px solid rgba(255, 255, 255, 0.1) !important;
      background: transparent !important;
      :deep(.n-input__input .n-input__input-el) {
        color: #FFF !important;
      }
    }
    .n-form-item {
      color: #fff;
    }
  }
  .code {
    width: auto;
    height: 100%;
    cursor: pointer;
    padding-left: 4px;
  }
}
</style>
