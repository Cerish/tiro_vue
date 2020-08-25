<template>
<div class="createContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">编辑学生课程成绩</span>
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
                            <el-form-item label="院系" prop="collegeName" class="">
                                <el-input v-model="createForm.collegeName" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="专业" prop="majorName" class="">
                                <el-input v-model="createForm.majorName" readonly></el-input>
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
                        <el-button plain type="primary" :disabled="disabled" @click="submitForm('createForm')">更新</el-button>
                        <el-button plain type="danger" :disabled="disabled" @click="resetForm('createForm')">重置</el-button>
                    </section>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import { queryScoreById, updateScoreById } from '@/views/api.js';
export default {
    name: 'createScore',
    components: {},
    computed:{
        disabled() {
            return this.isObjEqual(this.orginData, this.createForm);
        }
    },
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
                
            },
            formDisabled: true,
            rules: {
                score: [
                    { required: true, validator: checkScore, trigger: 'blur' }
                ]
            },
            orginData: {},
            routerParams: {}
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    updateScoreById(this.createForm).then(res => {
                        this.showMsg(1, "分数更新成功");
                        this.query();
                    }).catch(err => {
                        console.log('err updateScoreById', error);
                    })
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
            this.$router.push('/score/queryCourseScore')
        },
        query() {
            if (!this.routerParams.id) {
                this.showMsg(4, '成绩ID不存在')
                return
            }
            queryScoreById(this.routerParams.id).then(res => {
                this.createForm = res;
                this.orginData = this.deepCopy(this.createForm);
            }).catch(err => {
                console.log('error queryScoreById', err);
            })
        },
        initData() {
            this.query()
        }
    },
    created() {
        this.routerParams = this.$route.query;
        this.initData();
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
