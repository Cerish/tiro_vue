//  用户模块
import fetch from '../config/axios'

// 创建
export const createAcdemicDean = (postData) => fetch('/acdemicDean', postData, 'POST', true)

// 分页查询
export const queryAcdemicDean = (data) => fetch('/acdemicDean/count', data, 'GET', true)


export const deleteAcdemicDeanById = (paramData, data) => fetch(`/acdemicDean/${paramData.acdemicDeanId}`, data, 'DELETE', true)

// 根据ID获取数据
export const queryAcdemicDeanById = (paramData, data) => fetch(`/acdemicDean/${paramData.acdemicDeanId}`, data, 'GET', true)

export const updateAcdemicDean = (paramData, postData) => fetch(`/acdemicDean/${paramData.acdemicDeanId}`, postData, 'PUT', true)
