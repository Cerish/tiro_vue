//  配置信息模块
import fetch from '../config/axios'

// 获取院系信息
export const getDepartments = (postData) => fetch('/departments', postData, 'GET')

// 获取专业信息
export const getProfessionals = (postData) => fetch('/professionals', postData, 'GET')
