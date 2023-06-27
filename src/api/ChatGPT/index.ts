import request from '@/utils/axios'

const model = 'gpt-3.5-turbo'
const apiKey = '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'

export async function chatGPT(prompt: string) {
  const res = await request.post('https://api.openai.com/v1/chat/completions', {
    // prompt,
    messages: [{
      role: 'system',
      content: prompt
    }],
    model
    // temperature: 0.5,
    // max_tokens: 160, // 返回字符长度
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0
  }, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })
  console.log('res', res)
  return processResponse(res)
}

function processResponse(response: any) {
  if (!response || !response.choices || response.choices.length === 0) {
    // 如果响应中不包含任何文本，则返回空数组
    return []
  }

  // 如果响应包含多个文本，则返回一个文本数组
  if (response.choices.length > 1) {
    return response.choices.map((choice: any) => choice.message.content)
  }

  // 如果响应只包含一个文本，则返回一个文本数组
  return [response.choices[0].message.content]
}
