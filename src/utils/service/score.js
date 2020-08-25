//  用户模块
import fetch from '../config/axios'

// 创建
export const createScore = (postData) => fetch('/score', postData, 'POST', true)

// 分页查询
export const queryScore = (data) => fetch('/score/count', data, 'GET', true)

// 删除
export const deleteScoreById = (paramData, data) => fetch(`/score/${paramData.scoreId}`, data, 'DELETE', true)

// 根据ID获取数据
export const queryScoreByCourseIdStudentId = (paramData, data) => fetch(`/score/${paramData.studentId}/${paramData.arrangCourseId}`, data, 'GET', true)

// 根据ID获取数据
export const queryScoreByScoreId = (paramData, data) => fetch(`/score/${paramData.scoreId}/view`, data, 'GET', true)

// 更新
export const updateScore = (paramData, postData) => fetch(`/score/${paramData.scoreId}`, postData, 'PUT', true)
