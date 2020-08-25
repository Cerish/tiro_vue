<template>
<div class="createContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">创建教师档案</span>
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
                                <el-radio-group v-model="createForm.gender" disabled checked>
                                    <el-radio :label="0">男</el-radio>
                                    <el-radio :label="1">女</el-radio>
                                    <el-radio :label="2">保密</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="身份证号" prop="idCard" class="">
                                <el-input v-model="createForm.idCard"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="年龄" prop="age" class="">
                                <el-input v-model.number="createForm.age" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="所属院系" prop="collegeId" class="" style="">
                                <el-select v-model="createForm.collegeId" clearable placeholder="请选择院系" @change="handleChangeDepartment">
                                    <el-option v-for="(college,index) in this.collegeList" :label="college.nameZh" :value="Number(college.id)" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="职称" prop="titleId" class="" style="">
                                <el-select v-model="createForm.titleId" clearable placeholder="请选择职称">
                                    <el-option v-for="(title,index) in this.titleList" :label="title.nameZh" :value="Number(title.id)" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="电话号码" prop="mobile" class="">
                                <el-input v-model="createForm.mobile"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="居住地址" prop="address" class="">
                                <el-input v-model="createForm.address"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <section class="op" style="width:100%;margin: 30px 0;">
                        <el-button type="primary" plain :disabled="this.disabled" >创建</el-button>
                        <el-button type="danger" plain :disabled="this.disabled">重置</el-button>
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
            let res = isCardID(value)
            if (typeof res === 'string') {
                callback(new Error(res))
            } else {
                this.createForm.birth = res.birth
                this.createForm.gender = res.gender
                this.createForm.age = res.age
                callback()
            }
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
                idCard: '',
                age: '',
                collegeId: '',
                titleId: '',
                mobile: '',
                address: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入名字', trigger: 'blur' },
                    { min: 2, message: '长度需大于3字符', trigger: 'blur' }
                ],
                idCardNo: [
                    // { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { required: true, validator: checkIdCard, trigger: 'blur' }
                ],
                age: [
                    { required: true, validator: checkAge, trigger: 'blur' }
                ],
                department: [
                    { required: true, message: '请选择院系', trigger: 'change' }
                ],
                title: [
                    { required: true, message: '请选择职称', trigger: 'change' }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                birth: [
                    { type: 'date', required: true, validator: checkBirth, trigger: 'change' }
                ]
            },
            titleList: [],
            routerParams: {

            },
            disabled: true
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log('submitForm', this.createForm)
                    let postData = {
                        idCard: this.createForm.idCard,
                        username: this.createForm.username,
                        gender: converValueToType(this.createForm.gender),
                        birth: this.createForm.birth,
                        telephone: this.createForm.telephone,
                        title: this.createForm.title,
                        department: this.createForm.department,
                        address: this.createForm.address,
                        age: this.createForm.age
                    }
                    console.log('postData', postData)
                    createTeacher(postData).then(res => {
                        console.log('log success', res)
                        if (res.code === 10000) {
                            // 成功
                            this.showMsg(1, '创建成功')
                            this.$router.push({
                                name: 'queryTeacher'
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
            this.$refs[formName].resetFields();
        },
        back() {
            this.$router.go(-1)
        },
        handleChangeDepartment(value) {
            console.log('handleChangeDepartment', value)
        },
        initData() {
        },
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
