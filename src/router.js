import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

// login 相关 (组件模块化)
const Login = () => import(/*webpackChunkName:'Login'*/ './views/login/Login.vue');
const signup = () => import(/*webpackChunkName:'Login'*/ './views/login/signup.vue');

//  路径 /
const layout = () => import('./views/layout/index.vue');

// dashboard
const dashboard = () => import('./views/dashboard/index.vue');

const FriendChat = () => import('./views/chat/FriendChat.vue');

// documentation
const documentation = r => require.ensure([], () => r(require('./views/documentation')), 'documentation')


// -----example
// form
const form = r => require.ensure([], () => r(require('./views/example/form')), 'form')
// table
const table = r => require.ensure([], () => r(require('./views/example/table')), 'table')
const complexTable = r => require.ensure([], () => r(require('./views/example/table/complexTable')), 'complexTable')
const drapTable = r => require.ensure([], () => r(require('./views/example/table/drapTable')), 'drapTable')


// svg图标
const svgIcons = r => require.ensure([], () => r(require('./views/svgIcons')), 'svgIcons')

// 班级管理
const createClass = r => require.ensure([], () => r(require('./views/class/createClass')), 'createClass')
const editClass = r => require.ensure([], () => r(require('./views/class/editClass')), 'editClass')
const queryClass = r => require.ensure([], () => r(require('./views/class/queryClass')), 'queryClass')

// 学生管理
const createStudent = r => require.ensure([], () => r(require('./views/student/createStudent')), 'createStudent')
const editStudent = r => require.ensure([], () => r(require('./views/student/editStudent')), 'editStudent')
const queryStudent = r => require.ensure([], () => r(require('./views/student/queryStudent')), 'queryStudent')

// 教师管理
const createTeacher = r => require.ensure([], () => r(require('./views/teacher/createTeacher')), 'createTeacher')
const editTeacher = r => require.ensure([], () => r(require('./views/teacher/editTeacher')), 'editTeacher')
const queryTeacher = r => require.ensure([], () => r(require('./views/teacher/queryTeacher')), 'queryTeacher')

// 课程管理
const createArrangCourse = r => require.ensure([], () => r(require('./views/course/createArrangCourse')), 'createArrangCourse')
const editArrangCourse = r => require.ensure([], () => r(require('./views/course/editArrangCourse')), 'editArrangCourse')
const queryArrangCourse = r => require.ensure([], () => r(require('./views/course/queryArrangCourse')), 'queryArrangCourse')

// 成绩管理
const createCourseScore = r => require.ensure([], () => r(require('./views/score/createCourseScore')), 'createCourseScore')
const editCourseScore = r => require.ensure([], () => r(require('./views/score/editCourseScore')), 'editCourseScore')
const queryCourseScore = r => require.ensure([], () => r(require('./views/score/queryCourseScore')), 'queryCourseScore')

// 系统管理
const changePassword = r => require.ensure([], () => r(require('./views/system/changePassword')), 'changePassword')
const resetPassword = r => require.ensure([], () => r(require('./views/system/resetPassword')), 'resetPassword')

// 用户管理
const user = r => require.ensure([], () => r(require('./views/user')), 'user')

// 游客管理
const gdpu = () => import('./views/visitor/gdpu.vue');
const editVisitor = () => import('./views/visitor/editVisitor.vue');

Vue.use(Router);

// 路由白名单 如 login signup 等
const whiteList = ["/login","/signup","/404"];

// 全局路由
export const constantRouterMap = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        hidden:true,
        meta:{
            title: "login",
        },
    },
    {
        path: '/signup',
        name: 'signup',
        component: signup,
        meta:{
            title: "signup",
        },
        hidden:true
    },
    {
        path: '',
        redirect: '/dashboard',
        component: layout,
        name: 'layout',
        meta: {
            title: 'dashboard',
            icon: 'icondashboard'
        },
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: dashboard,
                hidden:false,
                meta:{
                    title: 'dashboard',
                    icon: 'icondashboard'
                },
            }
        ],
    },
    {
        path: '',
        component: layout,
        redirect: '/chat',
        hidden:true,
        children: [
            {
                path: '/chat',
                name: 'chat',
                component: FriendChat,
                meta:{
                    title: "chat",
                }
            }
        ]
    },
    {
        path: '/404',
        name: 'page404',
        component: (resolve) => require(['./views/error/404.vue'], resolve),
        meta: {
            title: 'page404'
        }
    }
]

// 动态权限(管理员)
export const asyncRouterMap = [{
    path: '/example',
    component: layout,
    redirect: 'noredirect',
    hidden: true,
    name: 'example',
    meta: {
        title: 'example',
        icon: 'example'
    },
    children: [{
        path: 'form',
        component: form,
        name: 'testForm',
        meta: { title: 'form', icon: 'form', noCache: false }
    }, {
        path: '/example/table',
        component: table,
        redirect: 'noredirect',
        name: 'table',
        meta: { title: 'Table', icon: 'table' },
        children: [{
            path: 'complex-table',
            component: complexTable,
            name: 'complexTable',
            meta: { title: 'complexTable', icon: 'table', noCache: true }
        }, {
            path: 'drap-table',
            component: drapTable,
            name: 'drapTable',
            meta: { title: 'dragTable', icon: 'table', noCache: false }
        }]
    }]
}, {
    path: '/documentation',
    component: layout,
    redirect: '/documentation/index',
    hidden: true,
    children: [{
        path: 'index',
        component: documentation,
        name: 'documentation',
        meta: { title: 'documentation', icon: 'documentation', noCache: true }
    }]
}, {
    path: '/error',
    component: layout,
    redirect: 'noredirect',
    hidden: true,
    name: 'errorPages',
    meta: {
        title: 'errorPages',
        icon: '404'
    },
    // children: [
    //     { path: '401', component: errorPage401, name: 'page401', meta: { title: 'page401', noCache: true } },
    //     { path: '404', component: errorPage404, name: 'page404', meta: { title: 'page404', noCache: true } }
    // ]
}, {
    path: '/icon',
    component: layout,
    redirect: 'noredirect',
    hidden: true,
    children: [
        { path: 'index', component: svgIcons, name: 'icon', meta: { title: 'icons', icon: 'icon', noCache: true } }
    ]
}, {
    path: '/class',
    component: layout,
    redirect: 'noredirect',
    name: 'class',
    meta: {
        title: 'class',
        icon: 'iconkecheng'
    },
    children: [{
        path: 'queryClass',
        component: queryClass,
        name: 'queryClass',
        meta: { title: 'queryClass', icon: 'iconkecheng', noCache: true }
    }, {
        path: 'createClass',
        component: createClass,
        name: 'createClass',
        meta: { title: 'createClass', icon: 'iconkecheng', noCache: true }
    }, {
        path: 'editClass',
        component: editClass,
        hidden: true,
        name: 'editClass',
        meta: { title: 'editClass', icon: 'iconkecheng', noCache: true }
    }]
}, {
    path: '/student',
    component: layout,
    redirect: 'noredirect',
    name: 'student',
    meta: {
        title: 'student',
        icon: 'iconxuesheng'
    },
    children: [{
        path: 'queryStudent',
        component: queryStudent,
        name: 'queryStudent',
        meta: { title: 'queryStudent', icon: 'iconxuesheng', noCache: true }
    }, {
        path: 'createStudent',
        component: createStudent,
        name: 'createStudent',
        meta: { title: 'createStudent', icon: 'iconxuesheng', noCache: true }
    }, {
        path: 'editStudent',
        component: editStudent,
        name: 'editStudent',
        meta: { title: 'editStudent', icon: 'iconxuesheng', noCache: true }
    }]
}, {
    path: '/teacher',
    component: layout,
    redirect: 'noredirect',
    name: 'teacher',
    meta: {
        title: 'teacher',
        icon: 'iconjiaoshi'
    },
    children: [{
        path: 'queryTeacher',
        component: queryTeacher,
        name: 'queryTeacher',
        meta: { title: 'queryTeacher', icon: 'iconjiaoshi', noCache: true }
    }, {
        path: 'createTeacher',
        component: createTeacher,
        name: 'createTeacher',
        meta: { title: 'createTeacher', icon: 'iconjiaoshi', noCache: true }
    }, {
        path: 'editTeacher',
        component: editTeacher,
        name: 'editTeacher',
        meta: { title: 'editTeacher', icon: 'iconjiaoshi', noCache: true }
    }]
}, {
    path: '/course',
    component: layout,
    redirect: 'noredirect',
    name: 'course',
    meta: {
        title: 'course',
        icon: 'iconkecheng'
    },
    children: [{
        path: 'queryArrangCourse',
        component: queryArrangCourse,
        name: 'queryArrangCourse',
        meta: { title: 'queryArrangCourse', icon: 'iconkecheng', noCache: true }
    }, {
        path: 'createArrangCourse',
        component: createArrangCourse,
        name: 'createArrangCourse',
        meta: { title: 'createArrangCourse', icon: 'iconkecheng', noCache: true }
    }, {
        path: 'editArrangCourse',
        component: editArrangCourse,
        name: 'editArrangCourse',
        meta: { title: 'editArrangCourse', icon: 'iconkecheng', noCache: true }
    }]
}, {
    path: '/score',
    component: layout,
    redirect: 'noredirect',
    name: 'score',
    meta: {
        title: 'score',
        icon: 'iconchengjiguanli'
    },
    children: [{
        path: 'queryCourseScore',
        component: queryCourseScore,
        name: 'queryCourseScore',
        meta: { title: 'queryCourseScore', icon: 'iconchengjiguanli', noCache: true }
    }, {
        path: 'createCourseScore',
        component: createCourseScore,
        name: 'createCourseScore',
        meta: { title: 'createCourseScore', icon: 'iconchengjiguanli', noCache: true }
    }, {
        path: 'editCourseScore',
        component: editCourseScore,
        name: 'editCourseScore',
        meta: { title: 'editCourseScore', icon: 'iconchengjiguanli', noCache: true }
    }]
}, {
    path: '/system',
    component: layout,
    redirect: 'noredirect',
    name: 'system',
    meta: {
        title: 'system',
        icon: 'iconxitong'
    },
    children: [{
        path: 'changePassword',
        component: changePassword,
        name: 'changePassword',
        meta: { title: 'changePassword', icon: 'iconxitong', noCache: true }
    }, {
        path: 'resetPassword',
        component: resetPassword,
        name: 'resetPassword',
        meta: { title: 'resetPassword', icon: 'iconxitong', noCache: true }
    }]
}, {
    path: '/user',
    component: layout,
    redirect: '/user/index',
    hidden: true,
    children: [{
        path: 'index',
        component: user,
        name: 'user',
        meta: { title: 'user', icon: 'iconuser1', noCache: true }
    }]
},
{path: '*', redirect: '/404'}]


// 动态权限(admin)=>(班级管理,学生管理，教师管理，课程管理，成绩管理，系统管理)
export const adminAsyncRouterMap = [
    {
        path: '/class',
        component: layout,
        redirect: 'noredirect',
        name: 'class',
        meta: {
            title: 'class',
            icon: 'iconbanjiguanli'
        },
        children: [{
            path: 'queryClass',
            component: queryClass,
            name: 'queryClass',
            meta: { title: 'queryClass', icon: 'iconbanjiguanli', noCache: true }
        }, {
            path: 'createClass',
            component: createClass,
            hidden: true,
            name: 'createClass',
            meta: { title: 'createClass', icon: 'iconbanjiguanli', noCache: true }
        }, {
            path: 'editClass',
            hidden: true,
            component: editClass,
            name: 'editClass',
            meta: { title: 'editClass', icon: 'iconbanjiguanli', noCache: true }
        }]
    }, 
    {
        path: '/student',
        component: layout,
        redirect: 'noredirect',
        name: 'student',
        meta: {
            title: 'student',
            icon: 'iconxuesheng'
        },
        children: [{
            path: 'queryStudent',
            component: queryStudent,
            name: 'queryStudent',
            meta: { title: 'queryStudent', icon: 'iconxuesheng', noCache: true }
        }, {
            path: 'createStudent',
            component: createStudent,
            hidden: true,
            name: 'createStudent',
            meta: { title: 'createStudent', icon: 'iconxuesheng', noCache: true }
        }, {
            path: 'editStudent',
            component: editStudent,
            hidden: true,
            name: 'editStudent',
            meta: { title: 'editStudent', icon: 'iconxuesheng', noCache: true }
        }]
    }, 
    {
        path: '/teacher',
        component: layout,
        redirect: 'noredirect',
        name: 'teacher',
        meta: {
            title: 'teacher',
            icon: 'iconjiaoshi'
        },
        children: [{
            path: 'queryTeacher',
            component: queryTeacher,
            name: 'queryTeacher',
            meta: { title: 'queryTeacher', icon: 'iconjiaoshi', noCache: true }
        }, {
            path: 'createTeacher',
            component: createTeacher,
            hidden: true,
            name: 'createTeacher',
            meta: { title: 'createTeacher', icon: 'iconjiaoshi', noCache: true }
        }, {
            path: 'editTeacher',
            component: editTeacher,
            hidden: true,
            name: 'editTeacher',
            meta: { title: 'editTeacher', icon: 'iconjiaoshi', noCache: true }
        }]
    }, 
    {
        path: '/course',
        component: layout,
        redirect: 'noredirect',
        name: 'course',
        meta: {
            title: 'course',
            icon: 'iconkecheng'
        },
        children: [{
            path: 'queryArrangCourse',
            component: queryArrangCourse,
            name: 'queryArrangCourse',
            meta: { title: 'queryArrangCourse', icon: 'iconkecheng', noCache: true }
        }, {
            path: 'createArrangCourse',
            component: createArrangCourse,
            hidden: true,
            name: 'createArrangCourse',
            meta: { title: 'createArrangCourse', icon: 'iconkecheng', noCache: true }
        }, {
            path: 'editArrangCourse',
            component: editArrangCourse,
            hidden: true,
            name: 'editArrangCourse',
            meta: { title: 'editArrangCourse', icon: 'iconkecheng', noCache: true }
        }]
    }, 
    {
        path: '/score',
        component: layout,
        redirect: 'noredirect',
        name: 'score',
        meta: {
            title: 'score',
            icon: 'iconchengjibeifen'
        },
        children: [{
            path: 'queryCourseScore',
            component: queryCourseScore,
            name: 'queryCourseScore',
            meta: { title: 'queryCourseScore', icon: 'iconchengjibeifen', noCache: true }
        }]
    }, 
    {
        path: '/person',
        component: layout,
        redirect: 'noredirect',
        name: 'person',
        meta: {
            title: 'person',
            icon: 'iconjiaodaozhuren'
        },
        children: [
            {
                path: 'changePassword',
                component: changePassword,
                name: 'changePassword',
                meta: { title: 'changePassword', icon: 'iconzhongzhimima', noCache: true }
            }
        ]
    },
{path: '*', redirect: '/404'}]

// 动态权限(教师)=>(查询课程，成绩管理，系统管理)
export const teacherAsyncRouterMap = [
    {
        path: '/course',
        component: layout,
        redirect: 'noredirect',
        name: 'course',
        meta: {
            title: 'course',
            icon: 'iconpaike'
        },
        children: [{
            path: 'queryArrangCourse',
            component: queryArrangCourse,
            name: 'queryArrangCourse',
            meta: { title: 'queryArrangCourse', icon: 'iconpaike', noCache: true }
        }]
    },
    {
        path: '/score',
        component: layout,
        redirect: 'noredirect',
        name: 'score',
        meta: {
            title: 'score',
            icon: 'iconchengjibeifen'
        },
        children: [{
            path: 'queryCourseScore',
            component: queryCourseScore,
            name: 'queryCourseScore',
            meta: { title: 'queryCourseScore', icon: 'iconchengjibeifen', noCache: true }
        }, {
            path: 'createCourseScore',
            component: createCourseScore,
            hidden: true,
            name: 'createCourseScore',
            meta: { title: 'createCourseScore', icon: 'iconchengjibeifen', noCache: true }
        },
        {
            path: 'editCourseScore',
            component: editCourseScore,
            name: 'editCourseScore',
            hidden: true,
            meta: { title: 'editCourseScore', icon: 'iconchengjiguanli', noCache: true }
        }]
    }, 
{
    path: '/person',
    component: layout,
    redirect: 'noredirect',
    name: 'person',
    meta: {
        title: 'person',
        icon: 'icontubiaozhizuomoban-'
    },
    children: [{
        path: 'teacherPersonInfo',
        component: editTeacher,
        name: 'teacherPersonInfo',
        meta: { title: 'personInfo', icon: 'iconjiaoshi', noCache: true }
    }, {
        path: 'changePassword',
        component: changePassword,
        name: 'changePassword',
        meta: { title: 'changePassword', icon: 'iconzhongzhimima', noCache: true }
    }]
},
{path: '*', redirect: '/404'}]

// 动态权限(学生)=>(查询课程，查询成绩，系统管理)
export const studentAsyncRouterMap = [
    {
        path: '/course',
        component: layout,
        redirect: 'noredirect',
        name: 'course',
        meta: {
            title: 'course',
            icon: 'iconkecheng'
        },
        children: [{
            path: 'queryArrangCourse',
            component: queryArrangCourse,
            name: 'queryArrangCourse',
            meta: { title: 'queryArrangCourse', icon: 'iconpaike', noCache: true }
        }]
    }, 
    {
    path: '/score',
    component: layout,
    redirect: 'noredirect',
    name: 'score',
    meta: {
        title: 'score',
        icon: 'iconchengjibeifen'
    },
    children: [{
        path: 'queryCourseScore',
        component: queryCourseScore,
        name: 'queryCourseScore',
        meta: { title: 'queryCourseScore', icon: 'iconchengjibeifen', noCache: true }
    }]
    }, 
    {
        path: '/person',
        component: layout,
        redirect: 'noredirect',
        name: 'person',
        meta: {
            title: 'person',
            icon: 'icontubiaozhizuomoban-'
        },
        children: [{
            path: 'studentPersonInfo',
            component: editStudent,
            name: 'studentPersonInfo',
            meta: { title: 'personInfo', icon: 'iconprofile', noCache: true }
        }, {
            path: 'changePassword',
            component: changePassword,
            name: 'changePassword',
            meta: { title: 'changePassword', icon: 'iconzhongzhimima', noCache: true }
        }]
    },
    {path: '*', redirect: '/404'}
]

// 动态权限(游客) => (学校介绍, 用户设置)
export const visitorAsyncRouterMap = [
    {
        path: '/gdpu',
        component: layout,
        redirect: '/gdpu/noredirect',
        children: [
            {
                path: 'introduction',
                component: gdpu,
                meta: {
                    title: 'gdpu',
                    icon: 'iconkecheng'
                }
            }
        ]
    },
    {
        path: '/person',
        component: layout,
        redirect: 'noredirect',
        name: 'person',
        meta: {
            title: 'person',
            icon: 'icontubiaozhizuomoban-'
        },
        children: [{
            path: 'visitorPersonInfo',
            component: editVisitor,
            name: 'visitorPersonInfo',
            meta: { title: 'personInfo', icon: 'iconprofile', noCache: true }
        }, {
            path: 'changePassword',
            component: changePassword,
            name: 'changePassword',
            meta: { title: 'changePassword', icon: 'iconzhongzhimima', noCache: true }
        }]},
    {path: '*', redirect: '/404'}
]

// const router = new Router({
//     mode: "history",
//     routes: constantRouterMap
// })
// 清除之前的路由权限
const createRouter = () => new Router({
    mode: 'history',
    routes: constantRouterMap
});
const router = createRouter();

router.beforeEach((to, from, next) => {
    if(to.meta) {
        document.title = to.meta.title;
    }
    if(!store.getters.addRouters.length) {
        store.dispatch('GenerateRouterByRoleType').then(() => {
            router.matcher = createRouter().matcher;
            router.addRoutes(store.getters.addRouters);
            router.replace({...to});
        });
    }else {
        if(localStorage.getItem("token")) {
            next();
        }else {
            // 白名单不需要认证
            if (whiteList.indexOf(to.path) >= 0) {
                next();
            } else {
                router.replace('/login');
            }
        }
    }
    
})
export default router;