const mutations = {
    SET_COLLEGE: (state, college) => {
        state.collegeList = college;
    },
    SET_MAJOR: (state, major) => {
        state.majorList = major;
    }
}

export default mutations;