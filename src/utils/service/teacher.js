//  用户模块
import fetch from '../config/axios'

// 创建
export const createTeacher = (postData) => fetch('/teacher', postData, 'POST', true)

// 分页查询
export const queryTeacher = (data) => fetch('/teacher/count', data, 'GET', true)

// 获取院系所有教师,不显示loading
export const queryTeacherNoLoading = (data) => fetch('/teacher/count', data, 'GET', false)

export const deleteTeacherById = (paramData, data) => fetch(`/teacher/${paramData.teacherId}`, data, 'DELETE', true)

// 根据ID获取数据
export const queryTeacherById = (paramData, data) => fetch(`/teacher/${paramData.teacherId}`, data, 'GET', true)

// 学生
export const updateTeacher = (paramData, postData) => fetch(`/teacher/${paramData.teacherId}`, postData, 'PUT', true)
