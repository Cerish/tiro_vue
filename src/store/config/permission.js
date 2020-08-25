import {
    asyncRouterMap,
    constantRouterMap,
    adminAsyncRouterMap,
    teacherAsyncRouterMap,
    studentAsyncRouterMap,
    visitorAsyncRouterMap
} from '@/router.js'

import role from '@/utils/config/role'

// 初始化state状态
const permission = {
    state: {
        routers: constantRouterMap, // 固定路由
        addRouters: [] // 动态路由,根据权限匹配
    },
    getters: {
        addRouters: (state, getters, rootState) => {
            return state.addRouters
        },
        permissionRouter: (state, getters, rootState) => {
            return state.routers
        }
    },
    actions: {
        // 根据用户角色，动态生成路由
        GenerateRouterByRoleType({
            getters,
            commit
        }) {
            return new Promise(resolve => {
                let accessedRouters;
                let roleType;
                if(getters.user) {
                    roleType = getters.user.roleId;
                }
                if (roleType === role.type.ADMIN) {
                    // 管理员
                    accessedRouters = adminAsyncRouterMap;
                } else if (roleType === role.type.TEACHER) {
                    // 教师
                    accessedRouters = teacherAsyncRouterMap;
                } else if (roleType === role.type.STUDENT) {
                    // 学生
                    accessedRouters = studentAsyncRouterMap;
                } else if (roleType === role.type.VISITOR) {
                    // 游客
                    accessedRouters = visitorAsyncRouterMap;
                } else {
                    accessedRouters = [{path: '*', redirect: '/404'}]
                }
                commit('SET_ROUTERS', accessedRouters);
                resolve();
            })
        }
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
    }
}

// function filterAsyncRouter(asyncRouterMap, roleType) {
//     const accessedRouters = asyncRouterMap.filter(route => {
//         if (hasPermission(roleType, route)) {
//             if (route.children && route.children.length) {
//                 route.children = filterAsyncRouter(route.children, roleType)
//             }
//             return true
//         }
//         return false
//     })
//     return accessedRouters
// }

export default permission;