<template>
<div class="createContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">创建课程表</span>
            <div class="operation">
                <el-button type="primary" size="small" @click="back">返回</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="create">
                <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px" style="" label-position="right">
                    <el-row style="margin-top:20px;">
                        <el-col :span="12">
                            <el-form-item label="排课院系" prop="major.collegeNameZh" class="">
                                <el-input v-model="createForm.major.collegeNameZh" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="排课专业" prop="major.nameZh" class="">
                                <el-input v-model="createForm.major.nameZh" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="课程名称" prop="name" class="">
                                <el-input v-model="createForm.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="班级名称" prop="className" class="">
                                <el-input v-model="createForm.className" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="授课教师" prop="teacherName" class="">
                                <el-select v-model="createForm.teacherName" clearable placeholder="请选择授课教师">
                                    <el-option v-for="(teacherItem,index) in this.teacherList" :label="teacherItem.name" :value="teacherItem.name" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="授课学期" prop="semester" class="">
                                <el-select v-model="createForm.semester" clearable placeholder="请选择授课教师">
                                    <el-option v-for="(semester,index) in this.semesterList" :label="semester.name" :value="semester.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="上课地点" prop="address" class="">
                                <el-input v-model="createForm.address"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="课程学分" prop="crcreate" class="">
                                <el-input v-model="createForm.crcreate"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="上课周数">
                                <div class="time">
                                    <span style="margin-right: 5px;">周</span>
                                    <el-input v-model="createForm.weekDay"></el-input>
                                    <span style="margin: 0 5px;"></span>
                                    <el-input v-model="createForm.lessonStart"></el-input>
                                    <span style="margin: 0 5px;">-</span>
                                    <el-input v-model="createForm.lessonEnd"></el-input>
                                    <span style="margin-left: 5px;">节</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="上课周数">
                                <div class="week">
                                    <el-input v-model="createForm.weekStart"></el-input>
                                    <span style="margin: 0 5px;">-</span>
                                    <el-input v-model="createForm.weekEnd"></el-input>
                                    <span style="margin-left: 5px;">周</span>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <section class="op" style="width:100%;margin: 30px 0;">
                        <el-button type="primary" plain :disabled="this.disabled">更新</el-button>
                        <el-button type="success" plain :disabled="this.disabled" >还原</el-button>
                        <el-button type="danger" plain :disabled="this.disabled" @click="resetForm('createForm')">重置</el-button>
                    </section>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import mixin from '@/mixins/mixin.js';
export default {
    name: 'createClass',
    components: {},
    mixins: [mixin],
    data() {
        return {
            createForm: {
                college: '',
                major: '',
                courseName: '',
                className: '',
                teacherName: '',
                address: '',
                time: '',
                startTime: '',
                endTime: '',
                semester: '',
                courseCredits: ''
            },
            disabled: true,
            formDisabled: true,
            rules: {
                college: [
                    { required: true, message: '请选择院系', trigger: 'change' }
                ],
                courseName: [
                    { required: true, message: '请输入名字', trigger: 'blur' }
                ],
                classId: [
                    { required: true, message: '请选择授课班级', trigger: 'blur' }
                ],
                teacherId: [
                    { required: true, message: '请选择授课教师', trigger: 'blur' }
                ],
                professional: [
                    { required: true, message: '请选择专业', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入上课地点', trigger: 'blur' }
                ],
                time: [
                    { required: true, message: '请输入上课时间', trigger: 'blur' }
                ],
                startTime: [
                    { required: true, message: '请选择开课日期', trigger: 'change' }
                ],
                endTime: [
                    { required: true, message: '请选择结课日期', trigger: 'change' }
                ],
                semester: [
                    { required: true, message: '请输入学期', trigger: 'change' }
                ],
                courseCrcreates: [
                    { required: true, message: '请输入学分', trigger: 'change' }
                ]
            },
            classList: [],
            courseList: [],
            teacherList: [],
            routerParams: {},
            semesterList: [
                {name: '第一学期', value: 1},
                {name: '第二学期', value: 2}
            ],
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let postData = {
                        college: this.createForm.college,
                        professional: this.createForm.professional,
                        courseName: this.createForm.courseName,
                        classId: this.createForm.classId,
                        teacherId: this.createForm.teacherId,
                        address: this.createForm.address,
                        time: this.createForm.time,
                        startTime: this.createForm.startTime,
                        endTime: this.createForm.endTime,
                        semester: this.createForm.semester,
                        courseCrcreates: this.createForm.courseCrcreates
                    }
                    console.log('postData', postData)
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        back() {
            this.$router.go(-1)
        },
        handleChangecollege(value) {
            
        },
        handleChangeProfessional(value) {
            
        },
        handleChangeCourse(value) {
            console.log('handleChangeCourse', value)
        },
        initData() {
            this.querycolleges()
        },
        submitData() {

        },
        querycolleges() {
            
        },
        queryClassBycollege() {
           
        },
        queryTeacherBycollege() {
           
        },
        queryProfessionalBycollege() {
           
        },
        assemblyProfessional(professionals) {
           
        }
    },
    mounted() {
        this.routerParams = this.$route.query
        this.initData()
    }
}
</script>

<style lang="scss" scoped>
.createContainer {
    .head {
        margin: 8px 0;
        height: 40px !important;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        .title {
            font-size: 18px;
            font-weight: 440;
        }
        .operation {
            display: flex;
            align-items: center;
        }
    }
    .custom-line {
        border-top: 1px solid #DDD;
        width: 100%;
    }
    .create {
        display: flex;
        justify-content: center;
        .op {
            display: flex;
            width: 100%;
            justify-content: center;
        }
        .m20 {
            margin-top: 20px;
        }
        .m25 {
            margin-top: 35px;
        }
        .m35 {
            margin-top: 35px;
        }
    }
}
</style>
