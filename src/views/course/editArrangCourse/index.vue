<template>
<div class="editContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">编辑课程</span>
            <div class="operation">
                <el-button type="primary" size="small" @click="back">返回</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="edit">
                <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" style="" label-position="right">
                    <el-row style="margin-top:20px;">
                        <el-col :span="12">
                            <el-form-item label="排课院系" prop="major.collegeNameZh" class="">
                                <el-input v-model="editForm.major.collegeNameZh" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="排课专业" prop="major.nameZh" class="">
                                <el-input v-model="editForm.major.nameZh" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="课程名称" prop="name" class="">
                                <el-input v-model="editForm.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="班级名称" prop="className" class="">
                                <el-input v-model="editForm.className" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="授课教师" prop="teacherId" class="">
                                <el-select v-model="editForm.teacherId" clearable placeholder="请选择授课教师">
                                    <el-option v-for="(teacherItem,index) in this.teacherList" :label="teacherItem.username" :value="teacherItem.id" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="授课学期" prop="semester" class="">
                                <el-select v-model="editForm.semester" clearable placeholder="请选择授课学期">
                                    <el-option v-for="(semester,index) in this.semesterList" :label="semester.name" :value="semester.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="上课地点" prop="address" class="">
                                <el-input v-model="editForm.address"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="课程学分" prop="credit" class="">
                                <el-input v-model="editForm.credit"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="上课周数">
                                <div class="time">
                                    <span style="margin-right: 5px;">周</span>
                                    <el-input v-model="editForm.weekDay"></el-input>
                                    <span style="margin: 0 5px;"></span>
                                    <el-input v-model="editForm.lessonStart"></el-input>
                                    <span style="margin: 0 5px;">-</span>
                                    <el-input v-model="editForm.lessonEnd"></el-input>
                                    <span style="margin-left: 5px;">节</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="上课周数">
                                <div class="week">
                                    <el-input v-model="editForm.weekStart"></el-input>
                                    <span style="margin: 0 5px;">-</span>
                                    <el-input v-model="editForm.weekEnd"></el-input>
                                    <span style="margin-left: 5px;">周</span>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <section class="op" style="width:100%;margin: 30px 0;">
                        <el-button type="primary" plain :disabled="this.disabled" @click="submitForm('editForm')">更新</el-button>
                        <el-button type="danger" plain :disabled="this.disabled" @click="resetForm('editForm')">重置</el-button>
                    </section>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import {queryCourseById, updateCourseById} from '@/views/api.js';
import mixin from '@/mixins/mixin.js';
export default {
    name: 'editClass',
    mixins: [mixin],
    components: {},
    computed: {
        disabled() {
            return this.isObjEqual(this.editForm, this.orginData);
        }
    },
    data() {
        return {
            editForm: {
                college: '',
                major: '',
                courseName: '',
                className: '',
                teacherId: '',
                address: '',
                time: '',
                startTime: '',
                endTime: '',
                semester: '',
                courseCredits: ''
            },
            semesterList: [
                {name: '第一学期', value: 1},
                {name: '第二学期', value: 2}
            ],
            orginData: {

            },
            rules: {
                college: [
                    { required: true, message: '请选择院系', trigger: 'change' }
                ],
                courseName: [
                    { required: true, message: '请输入名字', trigger: 'blur' }
                ],
                className: [
                    { required: true, message: '请选择授课班级', trigger: 'blur' }
                ],
                teacherId: [
                    { required: true, message: '请选择授课教师', trigger: 'blur' }
                ],
                major: [
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
                courseCredits: [
                    { required: true, message: '请输入学分', trigger: 'change' }
                ]
            },
            routerParams: {},
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    updateCourseById(this.editForm).then(res => {
                        console.log(res);
                        this.showMsg(1, "修改成功")
                        this.query();
                    }).catch(err => {
                        console.log("error updateCourseById" + err);
                    })
                   console.log('valid true!!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.query();
        },
        back() {
            this.$router.go(-1)
        },
        handleChangecollege(value) {
            console.log('handleChangecollege', value)
           
        },
        handleChangeCourse(value) {
            console.log('handleChangeCourse', value)
        },
        initData() {
            this.query()
        },
        submitData() {

        },
        reductionForm() {
            console.log('reductionForm')
            this.mergeData()
        },
        query() {
            queryCourseById(this.routerParams.id).then(res => {
                console.log(res);
                this.editForm = res;
                console.log(res.major.collegeId)
                this.queryTeacher(res.major.collegeId);
                this.orginData = this.deepCopy(this.editForm);
            }).catch(err => {
                console.log('err', err)
                this.showMsg(4, '查询 课程失败')
            })
        },
    },
    mounted() {
        this.routerParams = this.$route.query
        this.initData()
    }
}
</script>

<style lang="scss" scoped>
.editContainer {
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
    .edit {
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
    .week, .time {
        display: flex;
    }
}
</style>
