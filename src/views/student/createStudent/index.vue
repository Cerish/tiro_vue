<template>
<div class="createContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">创建学生档案</span>
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
                            <el-form-item label="姓名" prop="username" class="">
                                <el-input v-model="createForm.username"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别" prop="gender">
                                <el-radio-group v-model="createForm.gender" checked>
                                    <el-radio label="0">男</el-radio>
                                    <el-radio label="1">女</el-radio>
                                    <el-radio label="2">保密 </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="身份证号" prop="IdCard" class="">
                                <el-input v-model="createForm.IdCard"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="年龄" prop="age" class="">
                                <el-input v-model.number="createForm.age"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="出生日期" prop="birth">
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="请选择出生日期" v-model="createForm.birth"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="电话号码" prop="telephone" class="">
                                <el-input v-model="createForm.telephone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="所属院系" prop="collegeId" class="" style="">
                                <el-select v-model="createForm.collegeId" filterable clearable placeholder="请选择院系" @change="handleChangeCollege">
                                    <el-option v-for="(college,index) in this.collegeList" :label="college.nameZh" :value="Number(college.id)" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所学专业" prop="majorId" class="">
                                <el-select v-model="createForm.majorId" filterable clearable placeholder="请选择专业" @change="handleChangeMajor">
                                    <el-option v-for="(major,index) in this.majorList" :label="major.nameZh" :value="Number(major.id)" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="所属班级" prop="classId" class="">
                                <el-select v-model="createForm.classId" filterable clearable placeholder="请选择班级"  @change="handleChangeClass">
                                    <el-option v-for="(aclass,index) in this.classList" :label="aclass.name" :value="Number(aclass.id)" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="入学日期" prop="admission">
                                <el-date-picker type="date" placeholder="请选择入学日期" v-model="createForm.admission"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="居住地址" prop="address" class="">
                                <el-input v-model="createForm.address"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学号" prop="studentNo" class="">
                                <el-input v-model="createForm.studentNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <section class="op" style="width:100%;margin: 30px 0;">
                        <el-button plain type="primary" @click="submitForm('createForm')">创建</el-button>
                        <el-button plain type="danger" @click="resetForm('createForm')">重置</el-button>
                    </section>
                    <!-- <el-form-item class="">
                        <section class="op">
                            <el-button plain type="primary" @click="submitForm('createForm')">创建</el-button>
                            <el-button plain type="danger" @click="resetForm('createForm')">重置</el-button>
                        </section>
                    </el-form-item> -->
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>

import mixin from '@/mixins/mixin.js';
import {addStudent} from '@/views/api.js';
// import moment from 'moment'
export default {
    name: 'createClass',
    components: {},
    mixins: [mixin],
    data() {
        const checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空,请输入身份证号'));
            }
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (value < 0 || value > 150) {
                    callback(new Error('必须在0~150岁之间'));
                } else {
                    callback();
                }
            }
        };
        const checkIdCard = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('身份证号不能为空'));
            }
            callback()
        }
        const checkBirth = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('出生日期不能为空,请输入身份证号'));
            }
            callback()
        }
        return {
            createForm: {
                username: '',
                gender: '',
                IdCard: '',
                age: '',
                birth: '',
                collegeId: '',
                classId: '',
                majorId: '',
                mobile: '',
                admissionTime: '',
                address: '',
                studentNo: ''
            },
            formDisabled: true,
            rules: {
                username: [
                    { required: true, message: '请输入名字', trigger: 'blur' },
                    { min: 2, message: '长度需大于3字符', trigger: 'blur' }
                ],
                IdCard: [
                    // { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { required: true, validator: checkIdCard, trigger: 'blur' }
                ],
                age: [
                    { required: true, validator: checkAge, trigger: 'blur' }
                ],
                collegeId: [
                    { required: true, message: '请选择院系', trigger: 'change' }
                ],
                professional: [
                    { required: true, message: '请选择专业', trigger: 'change' }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                birth: [
                    { type: 'date', required: true, validator: checkBirth, trigger: 'change' }
                ]
            },
            routerParams: {

            },
        }
    },
    methods: {
        submitForm(formName) {
            console.log('this.createForm.birth----', this.createForm.birth)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log('submitForm', this.createForm)
                    let params = {
                        IdCard: this.createForm.IdCard,
                        username: this.createForm.username,
                        gender: this.createForm.gender,
                        birth: this.createForm.birth,
                        telephone: this.createForm.telephone,
                        admissionTime: this.createForm.admissionTime,
                        classId: this.createForm.classId,
                        majorId: this.createForm.majorId,
                        collegeId: this.createForm.collegeId,
                        address: this.createForm.address,
                        age: this.createForm.age,
                        studentNo: this.createForm.studentNo,
                    }
                    addStudent(params).then(res => {
                        this.showMsg(1, "学生添加成功")
                    }).catch(err => {
                        console.log("error addStudent" + err);
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
        handleChangeCollege(value) {
            console.log('handleChangeCollege', value);
            if(value) {
                console.log(this.createForm)
                this.createForm.majorId = '';
                this.queryMajorByCollege(value);
                this.createForm.classId = '';
                this.queryClassByCollege(value);
            } else {
                this.queryAllMajor();
                this.createForm.majorId = '';
                this.queryAllClass();
                this.createForm.classId = '';
            }
        },
        handleChangeMajor(val) {
            if(val) {
                this.queryClassByMajor(val);
                this.createForm.classId = '';
                this.majorList.find(item => {
                    if(item.id == val) {
                        this.createForm.collegeId = item.collegeId;
                        return true;
                    }
                    return false;
                })
            } else {
                this.createForm.classId = '';
                this.queryClassByCollege(this.createForm.collegeId);
            }
        },
        handleChangeClass(val) {
            console.log(val);
            if(val) {
                this.classList.find(item => {
                    if(item.id == val) {
                        this.createForm.collegeId = item.collegeId;
                        this.createForm.majorId = item.majorId;
                        return true;
                    }
                    return false;
                })
            }
        },
        initData() {
            this.queryCollege();
            this.queryAllMajor();
            this.queryAllClass();
        },
        submitData() {

        },
    },
    mounted() {
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
