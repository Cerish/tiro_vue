export default {
    login: {
        title: '系统登录',
        logIn: '登录',
        username: '账号',
        password: '密码',
        any: '随便填',
        thirdparty: '第三方登录',
        thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！',
        goRegister: '没有账号？ 去注册一个'
    },
    register: {
        title: '用户注册',
        username: '请输入用户名',
        password: '密码',
        address: '地址',
        email: '邮箱',
        mobile: '手机号码',
        phone:'固定电话',
        confirmPwd: '确认密码',
        gender: '性别',
        imgCode: '图验证码',
        register: '注册',
        male: '男',
        female: '女',
        goLogin: '已有账号？ 去登录',
        role: '角色',
        placeholderPwd: '8-20位数字 + 字母或符号'
    },
    role: {
        student: '学生',
        teacher: '老师',
        acdemic: '教务员',
        visitor: '访客'
    },
    route: {
        dashboard: '首页',
        introduction: '简述',
        documentation: '文档',
        permission: '权限测试页',
        icons: '图标',
        components: '组件',
        componentIndex: '介绍',
        tinymce: '富文本编辑器',
        markdown: 'Markdown',
        jsonEditor: 'JSON编辑器',
        dndList: '列表拖拽',
        splitPane: 'Splitpane',
        avatarUpload: '头像上传',
        dropzone: 'Dropzone',
        sticky: 'Sticky',
        countTo: 'CountTo',
        componentMixin: '小组件',
        backToTop: '返回顶部',
        charts: '图表',
        keyboardChart: '键盘图表',
        lineChart: '折线图',
        mixChart: '混合图表',
        example: '综合实例',
        Table: '表格',
        dynamicTable: '动态Table',
        dragTable: '拖拽表格',
        inlineEditTable: 'Table内编辑',
        complexTable: '综合表格',
        treeTable: '树形表格',
        customTreeTable: '自定义树表',
        tab: 'Tab',
        form: '表单',
        createForm: '创建表单',
        editForm: '编辑表单',
        errorPages: '错误页面',
        page401: '401',
        page404: '404',
        errorLog: '错误日志',
        excel: 'Excel',
        exportExcel: 'Export Excel',
        selectExcel: 'Export Selected',
        uploadExcel: 'Upload Excel',
        zip: 'Zip',
        exportZip: 'Export Zip',
        theme: '换肤',
        clipboardDemo: 'Clipboard',
        i18n: '国际化',
        table: '表格',
        chat: '聊天室',
        // 自定义班级   //
        class: '班级管理',
        createClass: '创建班级 ',
        queryClass: '查询班级',
        editClass: '编辑班级',
        // 自定义学生   //
        student: '学生管理',
        createStudent: '采集学生信息',
        queryStudent: '查询学生信息',
        editStudent: '修改学生信息',
        // 教师管理   //
        teacher: '教师管理',
        createTeacher: '采集教师信息',
        queryTeacher: '查询教师信息',
        editTeacher: '修改教师信息',
        // 课程管理   //
        course: '课程管理',
        createArrangCourse: '创建排课表',
        queryArrangCourse: '查询排课信息',
        editArrangCourse: '编辑排课信息',
        // 成绩管理   //
        score: '成绩管理',
        createCourseScore: '创建成绩',
        queryCourseScore: '查询成绩',
        editCourseScore: '编辑成绩',
        // 系统管理   //
        system: '系统管理',
        changePassword: '修改密码',
        resetPassword: '重置密码',
        // 教务员管理   //
        acdemicDean: '教务员管理',
        createAcdemic: '采集信息',
        editAcdemic: '编辑信息',
        queryAcdemic: '查询信息',
        // 教务员管理   //
        user: '用户管理',
        person: '个人档案',
        personInfo: '个人信息',
        // 游客
        gdpu: '广东药科大学'
    },
    navbar: {
        logOut: '退出登录',
        dashboard: '首页',
        github: '项目地址',
        screenfull: '全屏',
        theme: '换肤',
        language: '语言切换',
        chat: '聊天室'
    },
    documentation: {
        documentation: '文档',
        github: 'Github 地址'
    },
    permission: {
        roles: '你的权限',
        switchRoles: '切换权限'
    },
    components: {
        documentation: '文档',
        tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
        dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
        stickyTips: '当页面滚动到预设的位置会吸附在顶部',
        backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
        backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
        imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
    },
    table: {
        dynamicTips1: '固定表头, 按照表头顺序排序',
        dynamicTips2: '不固定表头, 按照点击顺序排序',
        dragTips1: '默认顺序',
        dragTips2: '拖拽后顺序',
        title: '标题',
        importance: '重要性',
        type: '类型',
        remark: '点评',
        search: '搜索',
        add: '添加',
        export: '导出',
        reviewer: '审核人',
        id: '序号',
        date: '时间',
        author: '作者',
        readings: '阅读数',
        status: '状态',
        actions: '操作',
        edit: '编辑',
        publish: '发布',
        draft: '草稿',
        delete: '删除',
        cancel: '取 消',
        confirm: '确 定'
    },
    errorLog: {
        tips: '请点击右上角bug小图标',
        description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
        documentation: '文档介绍'
    },
    excel: {
        export: '导出',
        selectedExport: '导出已选择项',
        placeholder: '请输入文件名(默认excel-list)'
    },
    zip: {
        export: '导出',
        placeholder: '请输入文件名(默认file)'
    },
    theme: {
        change: '换肤',
        documentation: '换肤文档',
        tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
    },
    dashboard: {
        title: 'tiro学生管理系统',
        username: '用户',
        name: '姓名',
        roleName: '角色'
    }
}