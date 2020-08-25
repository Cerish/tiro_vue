<template>
<div class="createClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">编辑班级信息</span>
            <div class="operation">
                <el-button type="primary" size="small">返回</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="create">
                <el-form :model="editClassForm" :rules="rules" ref="editClassForm" label-width="100px" style="width:600px;">
                    <el-form-item label="班级ID" prop="id" class="m20">
                        <el-input v-model="editClassForm.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系" prop="major.collegeNameZh" class="m20">
                        <el-input v-model="editClassForm.major.collegeNameZh" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所属专业" prop="major.nameZh" class="m20">
                        <el-input v-model="editClassForm.major.nameZh" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="班级名称" prop="name" class="m35">
                        <el-input v-model="editClassForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="教师" prop="teacherNameZh" class="m35">
                        <el-select v-model="editClassForm.teacherId" filterable placeholder="请选择院系">
                            <el-option v-for="(teacher,index) in this.teacherList" :label="teacher.username" :value="Number(teacher.id)" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学生" prop="studentNameZh" filterable class="m35">
                        <el-select v-model="editClassForm.studentId" placeholder="请选择专业">
                            <el-option v-for="(student,index) in this.studentList" :label="student.username" :value="Number(student.id)" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="m35">
                        <section class="op">
                            <el-button type="primary" plain :disabled="this.isEqual" @click="submitForm('editClassForm')">更新</el-button>
                            <el-button type="danger" plain :disabled="this.isEqual" @click="resetForm">还原</el-button>
                        </section>
                    </el-form-item>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import { queryClassById, queryStudentByClassId, queryTeacherByCollegeId, updateClassById } from '@/views/api.js'
// import {deepCopy, isObjEqual} from '@/utils/tool.js'
export default {
    name: 'updateClass',
    components: {},
    computed: {
        isEqual() {
            return this.isObjEqual(this.orginData, this.editClassForm);
        }
    },
    data() {
        return {
            editClassForm: {
                major:''
            },
            orginData: {},
            rules: {
                name: [
                    { required: true, message: '请输入班级名称', trigger: 'blur' },
                    { min: 3, message: '长度需大于3字符', trigger: 'blur' }
                ]
            },
            studentList: [],
            teacherList: [],
            routerParams: {},
            disabled: true
        }
    },
    methods: {
        submitForm(formName) {
            console.log(this.$refs[formName]);
            let params = {
                id: this.editClassForm.id,
                studentId: this.editClassForm.studentId,
                teacherId: this.editClassForm.teacherId
            }
           updateClassById(params).then(res => {
               this.showMsg(1, "班级信息更新成功！")
               this.query();
           }).catch(err => {
               console.log("更新失败" + err);
           })
        },
        resetForm() {
            this.editClassForm = this.deepCopy(this.orginData);
        },
        query() {
            let id = this.routerParams.id;
            if (!id) {
                this.showMsg(4, '班级ID不存在');
                return
            };
            queryClassById(this.routerParams.id).then(res => {
                let resData = res;
                queryStudentByClassId(resData.id).then(res => {
                    this.studentList = res;
                    queryTeacherByCollegeId(resData.collegeId).then(res => {
                        this.teacherList = res;
                        this.editClassForm = resData;
                        this.orginData = this.deepCopy(this.editClassForm);
                    }).catch((err) => {
                        console.log("获取教师列表 失败" + err);
                    })
                }).catch((err) => {
                    console.log("获取学生列表 失败" + err);
                });
                
            }).catch((err) => {
                console.log("根据Id获取class 失败" + err);
            })
            this.disabled = false;
        },
        initData() {
            // 初始化 学院数据
            if(this.$store.getters.college.length > 0) {
                this.collegeList = this.$store.getters.college;
            } else {
                this.$store.dispatch('setCollege').then((res) => {
                    this.collegeList = res;
                }).catch((error) => {
                    console.log('setCollege', error)
                })
            }
            // 初始化 专业数据
            if(this.$store.getters.major.length > 0) {
                this.majorList = this.$store.getters.major;
            } else {
                this.$store.dispatch('setMajor').then((res) => {
                    this.majorList = res;
                }).catch((error) => {
                    console.log('setMajor', error)
                })
            }
            this.query();
        }
    },
    created() {
        this.routerParams = this.$route.query;
        this.query();
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
