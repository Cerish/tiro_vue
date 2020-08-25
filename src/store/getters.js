const getters = {
    sidebar: state => state.app.sidebar,
    language: state => state.app.language,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    status: state => state.user.status,
    setting: state => state.user.setting,
    errorLogs: state => state.errorLog.logs,
    // 获取 学院 专业
    college: state => state.collegeList,
    major: state => state.majorList,
    
}

export default getters;