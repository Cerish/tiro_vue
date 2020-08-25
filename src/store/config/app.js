const app = {
    state: {
        sidebar: {
            opened: !+localStorage.getItem('sidebarStatus')
        },
        language: localStorage.getItem('language') || 'en'
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                localStorage.setItem('sidebarStatus', 1)
            } else {
                localStorage.setItem('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
        },
        SET_LANGUAGE: (state, language) => {
            state.language = language
            localStorage.setItem('language', language)
        }
    },
    actions: {
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR')
        },
        setLanguage({ commit }, language) {
            commit('SET_LANGUAGE', language)
        }
    }
}

export default app
