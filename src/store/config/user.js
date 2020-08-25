import {logout} from '@/views/api.js';
import Vue from 'vue'
import {getRequest, postRequest, putRequest, deleteRequest} from '@/utils/api.js';

// 初始化state状态
const state = {
    user: JSON.parse(localStorage.getItem("user")), // 当前用户
    userInfo: JSON.parse(localStorage.getItem("userInfo")), // 当前用户详细信息
    name: '',
    // avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    avatar: require('@/assets/images/avatar.jpg'),
    curSession: {},
    chatMsg: {}
}

const getters = {
    user: (state) => {
        return state.user;
    },
    userInfo: (state) => {
        return state.userInfo;
    },
    curSession: (state) => {
        return state.curSession;
    },
    chatMsg: (state) => {
        return state.chatMsg;
    }
}

const actions = {
    // 设置用户信息
    SetUser({ commit}, data) {
        commit('SET_USER', data);
    },
    // 设置用户详细信息
    SetUserInfo({ commit}, data) {
        commit('SET_USERINFO', data);
    },
    // 设置当前聊天用户详细信息
    SetCurSession({commit}, data) {
        commit('SET_CURSESSION', data);
    },
    // 登出
    LogOut({ commit}) {
        return new Promise((resolve, reject) => {
            logout().then(res => {
                commit('CLEAR_USERINFO');
                resolve(res);
            }).catch(err => {
                console.log("error logout " + err);
                reject(err);
            })
        })
    },
    // 添加聊天记录
    AddChatMsg({commit}, chatMsg) {
        commit('SET_CHATMSG', chatMsg)
    },
    // 初始化聊天记录
    initChatMsg({commit}) {
        commit('INIT_CHATMSG')
    }
}

const mutations = {
    // 保存用户信息
    SET_USER(state, user) {
        state.user = user
    },
    // 保存用户详细信息
    SET_USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 保存当前聊天用户详细信息
    SET_CURSESSION(state, curSession) {
        state.curSession = curSession
    },
    // 清除登录信息
    CLEAR_USERINFO(state) {
        localStorage.clear();
    },
    // 设置新的聊天记录
    SET_CHATMSG(state, msg) {
        let key = state.user.username + '#' + msg.to;
        // 是否存在这个聊天记录
        let flag = state.chatMsg[key];
        if (!flag) {
            // 不存在先创建
            Vue.set(state.chatMsg, key, []);
        }
        state.chatMsg[key].push({
            content: msg.content,
            date: Date.now(),
            self: !msg.notSelf
        })
    },
    INIT_CHATMSG(state) {
        //浏览器本地的历史聊天记录可以在这里完成
        let data = localStorage.getItem('vue-chat-msg');
        if (data) {
            state.chatMsg = JSON.parse(data);
        }
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}
