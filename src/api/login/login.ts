import request from '@/utils/axios'

// 获取验证码
export const getVaildCode = () => {
  return request({
    url: '/api/captcha?t=' + new Date().getTime().toString(),
    method: 'get'
  })
}
