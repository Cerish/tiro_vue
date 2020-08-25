//  用户模块
import fetch from '../config/axios'

// 创建
export const createArrangCourse = (postData) => fetch('/arrangCourse', postData, 'POST', true)

// 分页查询
export const queryArrangCourse = (data) => fetch('/arrangCourse/count', data, 'GET', true)

// 删除
export const deleteArrangCourseById = (paramData, data) => fetch(`/arrangCourse/${paramData.arrangCourseId}`, data, 'DELETE', true)

// 根据ID获取数据
export const queryArrangCourseById = (paramData, data) => fetch(`/arrangCourse/${paramData.arrangCourseId}/view`, data, 'GET', true)

// 更新
export const updateArrangCourse = (paramData, postData) => fetch(`/arrangCourse/${paramData.arrangCourseId}`, postData, 'PUT', true)
