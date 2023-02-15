'use strict'
import fs from 'fs'
import path from 'path'
import moment from 'moment'
import { exit } from 'process'
// const fs = require('fs')
// const path = require('path')
// const moment = require('moment')
// const { exit } = require('process')

// const fileName = process.argv[2]

const sourceDir = process.argv[2]
const targetDir = process.argv[3]

// step 1 备份旧文件,重命名
function rename(oldName) {
  // eslint-disable-next-line promise/param-names
  return new Promise((res, rej) => {
    const now = moment().format('YYYY-MM-DD(HH:mm:ss)')
    const newName = oldName + `${now}`
    fs.rename(oldName, newName, (error) => {
      if (error) {
        console.log(error)
        rej(error)
      } else {
        console.log('ok')
        res()
      }
    })
  })
}
// 压缩

// 新文件拷贝
function isExist(path) { // 判断文件夹是否存在, 不存在创建一个
  if (!fs.existsSync(path)) {
    console.log(`文件夹路径${path}不存在,已创建完成`)
    fs.mkdirSync(path)
  }
}

// 文件拷贝到指定目录
function copyFile(sourcePath, targetPath) {
  // eslint-disable-next-line promise/param-names
  return new Promise((res, rej) => {
    try {
      const sourceFile = fs.readdirSync(sourcePath, { withFileTypes: true })
      sourceFile.forEach((file) => {
        const newSourcePath = path.resolve(sourcePath, file.name)
        const newTargetPath = path.resolve(targetPath, file.name)
        if (file.isDirectory()) {
          isExist(newTargetPath)
          copyFile(newSourcePath, newTargetPath)
        } else {
          fs.copyFileSync(newSourcePath, newTargetPath)
        }
      })
      res('copy finished')
    } catch (err) {
      rej(err)
    }
  })
}
(async () => {
  try {
    // 备份
    await rename(targetDir)
    console.log('========= 备份已完成 =========')
    // 新建文件夹
    fs.mkdirSync(targetDir)
    console.log('查看process.argv', JSON.stringify(process.argv))
    console.log('========= 新建文件夹完成 =========')
    // 拷贝动作
    await copyFile(sourceDir, targetDir)
    console.log('========= 部署已完成 =========')
  } catch (err) {
    console.log('========= 部署异常 =========')
    console.log(err)
    exit(1)
  }
})()
