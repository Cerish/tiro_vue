//  用户模块
import fetch from '../config/axios'

// 登录接口
export const login = (paramData, postData) => fetch('/login', postData, 'POST')

// 获取用户的基本信息
export const getUserInfo = (paramData, postData) => fetch(`/user/${paramData.userId}`, postData, 'GET')

// 登录接口
export const logout = (data) => fetch('/logout', data, 'POST')

// 修改密码
export const changePassword = (paramData, postData) => fetch(`/user/${paramData.userId}/changePassword`, postData, 'POST', true)

// 获取用户的角色信息
export const getUserRoleInfo = (paramData, postData) => fetch(`/user/${paramData.userId}/role`, postData, 'GET', true)

// 分页查询
export const queryUser = (data) => fetch('/user/count', data, 'GET', true)

// 删除
export const deleteUserById = (paramData, data) => fetch(`/user/${paramData.userId}`, data, 'DELETE', true)

// 重置密码
export const resetPassword = (paramData, postData) => fetch(`/user/${paramData.userId}/resetPassword`, postData, 'POST', true)

// 禁用账号
export const disableUser = (paramData, postData) => fetch(`/user/${paramData.userId}/disableUser`, postData, 'PUT', true)

// 启用账号
export const enableUser = (paramData, postData) => fetch(`/user/${paramData.userId}/enableUser`, postData, 'PUT', true)
