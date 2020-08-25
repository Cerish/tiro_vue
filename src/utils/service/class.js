//  用户模块
import fetch from '../config/axios'

// 创建班级
export const createClass = (postData) => fetch('/class', postData, 'POST', true)

// 分页查询班级
export const queryClass = (data) => fetch('/class/count', data, 'GET', true)

// 获取院系所有班级,不显示loading
export const queryClassNoLoading = (data) => fetch('/class/count', data, 'GET', false)

// 根据ID获取数据
export const queryClassById = (paramData, data) => fetch(`/class/${paramData.classId}`, data, 'GET', true)

// 根据ID获取数据
export const deleteClassById = (paramData, data) => fetch(`/class/${paramData.classId}`, data, 'DELETE', true)

// 更新班级
export const updateClass = (paramData, postData) => fetch(`/class/${paramData.classId}`, postData, 'PUT', true)
