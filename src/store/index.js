import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import app from './config/app'
import errorLog from './config/errorLog'
import tagsView from './config/tagsView'
import user from './config/user'
import permission from './config/permission'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const now = new Date();

const store = new Vuex.Store({
    modules: {
        app,
        errorLog,
        tagsView,
        user,
        permission
    },
    state: {
        collegeList: [],
        majorList: [],
    },
    getters,
    mutations,
    actions
})
// 动态响应 state 的值
store.watch(function (state) {
    return state.user.chatMsg
}, function (val) {
    localStorage.setItem('vue-chat-msg', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})
// 动态响应 state 的值
store.watch(function (state) {
    return state.user.user
}, function (val) {
    localStorage.setItem('user', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})

export default store;