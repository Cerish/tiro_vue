import { getRequest } from '@/utils/api.js'

const actions = {
    setCollege({ commit }) {
        return new Promise((resolve, reject) => {
            getRequest("/college/all").then((res) => {
                commit('SET_COLLEGE', res);
                resolve(res);
            }).catch((err) => {
                console.log("error setCollege" + err);
                reject(err);
            })
        })
    },
    setMajor({ commit }) {
        return new Promise((resolve, reject) => {
            getRequest("/major/").then((res) => {
                commit('SET_MAJOR', res);
                resolve(res);
            }).catch((err) => {
                console.log("error setMajor" + err);
                reject(err);
            })
        })
    },
}

export default actions;