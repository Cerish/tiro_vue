export default {
    login: {
        title: 'Login Form',
        logIn: 'Log in',
        username: 'Username',
        password: 'Password',
        any: 'any',
        thirdparty: 'Or connect with',
        thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !',
        goRegister: 'No account? Go to register one'
    },
    register: {
        title: 'Register Form',
        username: 'Username',
        password: 'Password',
        address: 'Address',
        email: 'Email',
        mobile: 'Mobile',
        phone:'Phone',
        confirmPwd: 'ConfirmPwd',
        gender: 'Gender',
        imgCode: 'ImgCode',
        register: 'register',
        male: 'male',
        female: 'female',
        goLogin: 'Already have an account? Go to login',
        role: 'role',
        placeholderPwd: '8-20 digits + letters or symbols'
    },
    role: {
        student: 'STUDENT',
        teacher: 'TEACHER',
        acdemic: 'ACDEMIC',
        visitor: 'VISITOR'
    },
    route: {
        dashboard: 'Dashboard',
        introduction: 'Introduction',
        documentation: 'Documentation',
        permission: 'Permission',
        icons: 'Icons',
        components: 'Components',
        componentIndex: 'Introduction',
        tinymce: 'Tinymce',
        markdown: 'Markdown',
        jsonEditor: 'JSON Editor',
        dndList: 'Dnd List',
        splitPane: 'SplitPane',
        avatarUpload: 'Avatar Upload',
        dropzone: 'Dropzone',
        sticky: 'Sticky',
        countTo: 'CountTo',
        componentMixin: 'Mixin',
        backToTop: 'BackToTop',
        charts: 'Charts',
        keyboardChart: 'Keyboard Chart',
        lineChart: 'Line Chart',
        mixChart: 'Mix Chart',
        example: 'Example',
        Table: 'Table',
        dynamicTable: 'Dynamic Table',
        dragTable: 'Drag Table',
        inlineEditTable: 'Inline Edit',
        complexTable: 'Complex Table',
        treeTable: 'treeTable',
        customTreeTable: 'Custom TreeTable',
        tab: 'Tab',
        form: 'Form',
        createForm: 'Create Form',
        editForm: 'Edit Form',
        errorPages: 'Error Pages',
        page401: '401',
        page404: '404',
        errorLog: 'Error Log',
        excel: 'Excel',
        exportExcel: 'Export Excel',
        selectExcel: 'Export Selected',
        uploadExcel: 'Upload Excel',
        zip: 'Zip',
        exportZip: 'Export Zip',
        theme: 'Theme',
        clipboardDemo: 'Clipboard',
        i18n: 'I18n',
        table: 'table',
        chat: 'chat',
        // 自定义班级   //
        class: 'class',
        createClass: 'createClass ',
        queryClass: 'queryClass',
        editClass: 'editClass',
        // 自定义学生   //
        student: 'student',
        createStudent: 'createStudent',
        queryStudent: 'queryStudent',
        editStudent: 'editStudent',
        // 教师管理   //
        teacher: 'teacher',
        createTeacher: 'createTeacher',
        queryTeacher: 'queryTeacher',
        editTeacher: 'editTeacher',
        // 课程管理   //
        course: 'course',
        createArrangCourse: 'createArrangCourse',
        queryArrangCourse: 'queryArrangCourse',
        editArrangCourse: 'editArrangCourse',
        // 成绩管理   //
        score: 'score',
        createCourseScore: 'createCourseScore',
        queryCourseScore: 'queryCourseScore',
        editCourseScore: 'editCourseScore',
        // 系统管理   //
        system: 'system',
        changePassword: 'changePassword',
        resetPassword: 'resetPassword',
        // 教务员管理   //
        acdemicDean: 'acdemicDean',
        createAcdemic: 'createAcdemic',
        editAcdemic: 'editAcdemic',
        queryAcdemic: 'queryAcdemic',
        // 教务员管理   //
        user: 'user',
        person: 'person',
        personInfo: 'personInfo',
        // 游客
        gdpu: 'Pharmaceutical'
    
    },
    navbar: {
        logOut: 'Log Out',
        dashboard: 'Dashboard',
        github: 'Github',
        screenfull: 'screenfull',
        theme: 'theme',
        language: 'switching',
        chat: 'chat'
    },
    documentation: {
        documentation: 'Documentation',
        github: 'Github Repository'
    },
    permission: {
        roles: 'Your roles',
        switchRoles: 'Switch roles'
    },
    components: {
        documentation: 'Documentation',
        tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
        dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
        stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
        backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
        backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
        imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
    },
    table: {
        dynamicTips1: 'Fixed header, sorted by header order',
        dynamicTips2: 'Not fixed header, sorted by click order',
        dragTips1: 'The default order',
        dragTips2: 'The after dragging order',
        title: 'Title',
        importance: 'Imp',
        type: 'Type',
        remark: 'Remark',
        search: 'Search',
        add: 'Add',
        export: 'Export',
        reviewer: 'reviewer',
        id: 'ID',
        date: 'Date',
        author: 'Author',
        readings: 'Readings',
        status: 'Status',
        actions: 'Actions',
        edit: 'Edit',
        publish: 'Publish',
        draft: 'Draft',
        delete: 'Delete',
        cancel: 'Cancel',
        confirm: 'Confirm'
    },
    errorLog: {
        tips: 'Please click the bug icon in the upper right corner',
        description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
        documentation: 'Document introduction'
    },
    excel: {
        export: 'Export',
        selectedExport: 'Export selected items',
        placeholder: 'Please enter the file name(default excel-list)'
    },
    zip: {
        export: 'Export',
        placeholder: 'Please enter the file name(default file)'
    },
    theme: {
        change: 'Theme change',
        documentation: 'Theme documentation',
        tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
    },
    dashboard: {
        title: 'student management system',
        username: 'username',
        name: 'name',
        roleName: 'roleName'
    }
}