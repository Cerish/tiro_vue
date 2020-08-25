//  用户模块
import fetch from '../config/axios'

// 创建班级
export const createStudent = (postData) => fetch('/student', postData, 'POST', true)

// 分页查询班级
export const queryStudent = (data) => fetch('/student/count', data, 'GET', true)

export const deleteStudentById = (paramData, data) => fetch(`/student/${paramData.studentId}`, data, 'DELETE', true)

// 根据ID获取数据
export const queryStudentById = (paramData, data) => fetch(`/student/${paramData.studentId}/class`, data, 'GET', true)

// 更新学生
export const updateStudent = (paramData, postData) => fetch(`/student/${paramData.studentId}`, postData, 'PUT', true)
