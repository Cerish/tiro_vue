<template>
<div class="createClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">创建班级</span>
            <div class="operation">
                <el-button type="primary" size="small" @click="back">返回</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="create">
                <el-form :model="createClassForm" :rules="rules" ref="createClassForm" label-width="100px" style="width:600px;">
                    <el-form-item label="班级名称" prop="name" class="m20">
                        <el-input v-model="createClassForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系" prop="collegeId" class="m35">
                        <el-select v-model="createClassForm.collegeId" placeholder="请选择院系">
                            <el-option v-for="(college,index) in this.collegeList" :label="college.nameZh" :value="Number(college.id)" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属专业" prop="majorId" class="m35">
                        <el-select v-model="createClassForm.majorId" placeholder="请选择院系">
                            <el-option v-for="(major,index) in this.majorList" :label="major.nameZh" :value="Number(major.id)" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班主任" prop="teacherId" class="m35">
                        <el-select v-model="createClassForm.teacherId" placeholder="请选择院系">
                            <el-option v-for="(teacher,index) in this.teacherList" :label="teacher.username" :value="Number(teacher.id)" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="m35">
                        <section class="op">
                            <el-button plain type="primary" @click="submitForm('createClassForm')">创建</el-button>
                            <el-button plain type="danger" @click="resetForm('createClassForm')">重置</el-button>
                        </section>
                    </el-form-item>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import { queryMajorByCollegeId, queryTeacherByCollegeId, addClass } from '@/views/api.js'
export default {
    name: 'createClass',
    components: {},
    watch:{
        'createClassForm.collegeId': {
            // 不能使用箭头函数， this指向问题
            handler: function(val) {
                if(val) {
                    this.createClassForm.majorId = '';
                    this.createClassForm.teacherId = '';
                    this.queryMajor(val);
                    this.queryTeacher(val);
                }else {
                    this.majorList = [];
                    this.teacherList = [];
                }
            },
            deep: true
        }
    },
    data() {
        return {
            createClassForm: {
                name: '',
                collegeId: '',
                majorId: '',
                teacherId: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入班级名称', trigger: 'blur' },
                    { min: 3, message: '长度需大于3字符', trigger: 'blur' }
                ],
                collegeId: [
                    { required: true, message: '请选择院系', trigger: 'change' }
                ],
                majorId: [
                    { required: true, message: '请选择专业', trigger: 'change' }
                ],
                teacherId: [
                    { required: true, message: '请选择班主任', trigger: 'change' }
                ]
            },
            collegeList: [],
            majorList: [],
            teacherList: [],
        }
    },
    methods: {
        queryMajor(collegeId) {
            queryMajorByCollegeId(collegeId).then(res => {
                this.majorList = res;
            }).catch(err => {
                console.log( "获取专业列表失败" + err);
            })
        },
        queryTeacher(collegeId) {
            queryTeacherByCollegeId(collegeId).then(res => {
                this.teacherList = res;
            }).catch(err => {
                console.log( "获取教师列表失败" + err);
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        name: this.createClassForm.name,
                        collegeId: this.createClassForm.collegeId,
                        majorId: this.createClassForm.majorId,
                        teacherId: this.createClassForm.teacherId,
                    }
                    addClass(params).then(() => {
                        this.showMsg(1, "班级添加成功！");
                    }).catch(err => {
                        this.showMsg(4, "班级添加失败！");
                    })
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
        initData() {
            if(this.$store.getters.college.length > 0) {
                this.collegeList = this.$store.getters.college;
            } else {
                this.$store.dispatch('setCollege').then((res) => {
                    this.collegeList = res;
                }).catch((error) => {
                    console.log('setCollege', error)
                })
            }
        },
        submitData() {

        }
    },
    mounted() {
        this.initData()
    }
}
</script>

<style lang="scss" scoped>
.createClassContainer {
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
            // justify-content: center;
        }
        .m20 {
            margin-top: 20px;
        }
        .m35 {
            margin-top: 35px;
        }
    }
}
</style>
