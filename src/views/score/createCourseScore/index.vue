<template>
<div class="createContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">创建学生课程成绩</span>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="create">
                <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px" style="" label-position="right">
                    <el-row style="margin-top:20px;">
                        <el-col :span="12">
                            <el-form-item label="院系" prop="department" class="">
                                <el-input v-model="createForm.department" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="专业" prop="professional" class="">
                                <el-input v-model="createForm.professional" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="课程名字" prop="courseName" class="">
                                <el-input v-model="createForm.courseName" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="班级" prop="className" class="">
                                <el-input v-model="createForm.className" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="授课教师" prop="teacherName" class="">
                                <el-input v-model="createForm.teacherName" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学期" prop="semester" class="">
                                <el-input v-model="createForm.semester" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="学生名字" prop="studentName" class="">
                                <el-input v-model="createForm.studentName" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学号" prop="studentNo" class="">
                                <el-input v-model="createForm.studentNo" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="成绩" prop="score" class="">
                                <el-input v-model="createForm.score"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <section class="op" style="width:100%;margin: 30px 0;">
                        <el-button plain type="primary" @click="submitForm('createForm')">创建</el-button>
                        <el-button plain type="danger" @click="resetForm('createForm')">重置</el-button>
                    </section>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import { queryScoreByCourseIdStudentId, createScore } from '@/utils/service/score'
import _ from 'lodash'
// import moment from 'moment'
export default {
    name: 'createScore',
    components: {},
    data() {
        const checkScore = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('成绩不能为空,请输入成绩'))
            }
            if (value < 0 || value > 100) {
                return callback(new Error('成绩范围为0~100'))
            }
            callback()
        };
        return {
            createForm: {
                department: '',
                professional: '',
                courseName: '',
                className: '',
                teacherName: '',
                studentName: '',
                studentNo: '',
                semester: '',
                score: ''
            },
            formDisabled: true,
            rules: {
                score: [
                    { required: true, validator: checkScore, trigger: 'blur' }
                ]
            },
            orginData: {},
            cloneData: {},
            routerParams: {}
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let postData = {
                        score: this.createForm.score,
                        arrangCourseId: this.routerParams.arrangCourseId,
                        studentId: this.routerParams.studentId
                    }
                    console.log('postData', postData)
                    createScore(postData).then(res => {
                        console.log('log success', res)
                        if (res.code === 10000) {
                            // 成功
                            this.showMsg(1, '创建成功')
                            this.$router.push({
                                name: 'queryCourseScore'
                            })
                        } else {
                            // 失败
                            let failedMsg = res.message ? res.message : '创建失败,服务器异常'
                            this.showMsg(4, failedMsg)
                        }
                    }).catch(err => {
                        console.log('err', err)
                        this.showMsg(4, '创建失败,服务器异常')
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.createForm.score = ''
        },
        back() {
            this.$router.go(-1)
        },
        query() {
            if (!this.routerParams.arrangCourseId || !this.routerParams.studentId) {
                this.showMsg(4, '课程ID或学生ID不存在')
                return
            }
            queryScoreByCourseIdStudentId({ studentId: this.routerParams.studentId, arrangCourseId: this.routerParams.arrangCourseId }).then(res => {
                console.log('log success', res)
                if (res.code === 10000) {
                    // 成功
                    this.disabled = false
                    this.orginData = res.data
                    this.mergeData()
                } else {
                    // 失败
                    let failedMsg = res.message ? res.message : '查询失败,服务器异常'
                    this.showMsg(4, failedMsg)
                }
            }).catch(err => {
                console.log('err', err)
                this.showMsg(4, '查询失败,服务器异常')
            })
        },
        mergeData() {
            _.each(this.orginData, (value, key) => {
                // console.log('mergeData', key)
                if (this.createForm.hasOwnProperty(key)) {
                    this.createForm[key] = value
                }
            })
            console.log('this.createForm', this.createForm)
            _.each(this.createForm, (value, key) => {
                this.cloneData[key] = value
            })
            console.log('this.cloneData', this.cloneData)
        },
        initData() {
            this.query()
        }
    },
    mounted() {
        this.routerParams = this.$route.query
        console.log('this.routerParams', this.routerParams)
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
