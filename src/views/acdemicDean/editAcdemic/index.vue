<template>
<div class="createContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title" v-if="!this.canSubmit">教务员个人信息</span>
            <span class="title" v-else>编辑教务员档案</span>
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
                            <el-form-item label="姓名" prop="name" class="">
                                <el-input v-model="createForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别" prop="gender">
                                <el-radio-group v-model="createForm.gender" disabled checked>
                                    <el-radio label="男"></el-radio>
                                    <el-radio label="女"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="身份证号" prop="idCardNo" class="">
                                <el-input v-model="createForm.idCardNo"></el-input>
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
                            <el-form-item label="所属院系" prop="department" class="" style="">
                                <el-select v-model="createForm.department" clearable placeholder="请选择院系" @change="handleChangeDepartment">
                                    <el-option v-for="(department,index) in this.departmentList" :label="department" :value="department" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="出生日期" prop="birth">
                                <el-date-picker type="date" placeholder="请选择出生日期" v-model="createForm.birth" readonly></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="电话号码" prop="telephone" class="">
                                <el-input v-model="createForm.telephone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="居住地址" prop="address" class="">
                                <el-input v-model="createForm.address"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="编号" prop="acdemicDeanNo" class="">
                                <el-input v-model="createForm.acdemicDeanNo" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <section class="op" style="width:100%;margin: 30px 0;" v-if="this.canSubmit">
                        <el-button type="primary" plain :disabled="this.disabled" @click="submitForm('createForm')">更新</el-button>
                        <el-button type="success" plain :disabled="this.disabled" @click="reductionForm">还原</el-button>
                        <el-button type="danger" plain :disabled="this.disabled" @click="resetForm('createForm')">重置</el-button>
                    </section>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import { updateAcdemicDean, queryAcdemicDeanById } from '@/utils/service/acdemicDean'
import { converValueToType } from '@/utils/config/gender'
import role from '@/utils/config/role'
import { isCardID } from '@/utils/createFormUtil'
import _ from 'lodash'
// import moment from 'moment'
export default {
    name: 'createClass',
    components: {},
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
                name: '',
                gender: '',
                idCardNo: '',
                age: '',
                birth: '',
                department: '',
                telephone: '',
                address: '',
                acdemicDeanNo: ''
            },
            orginData: {

            },
            cloneData: {

            },
            formDisabled: true,
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
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                birth: [
                    { type: 'date', required: true, validator: checkBirth, trigger: 'change' }
                ]
            },
            departmentList: [
                '计算机学院',
                '材料科学与工程学院',
                '电子信息工程学院'
            ],
            routerParams: {

            },
            disabled: true,
            canSubmit: true // 编辑能提交，查询不能提交
        }
    },
    methods: {
        submitForm(formName) {
            if (!this.routerParams.acdemicDeanId) {
                this.showMsg(2, '教务员ID不存在')
                return
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let sendData = {}
                    let update = false
                    _.each(this.cloneData, (value, key) => {
                        if (this.createForm[key] !== value) {
                            sendData[key] = this.createForm[key]
                            update = true
                        }
                    })
                    if (!update) {
                        this.showMsg(2, '您没有修改任何数据')
                        return
                    }
                    if (sendData.gender) {
                        sendData.gender = converValueToType(sendData.gender)
                    }
                    console.log('sendData', sendData)
                    let paramData = {
                        acdemicDeanId: this.routerParams.acdemicDeanId
                    }
                    updateAcdemicDean(paramData, sendData).then(res => {
                        console.log('log success', res)
                        if (res.code === 10000) {
                            // 成功
                            this.showMsg(1, '更新成功')
                            this.back()
                        } else {
                            // 失败
                            let failedMsg = res.message ? res.message : '更新失败,服务器异常'
                            this.showMsg(4, failedMsg)
                        }
                    }).catch(err => {
                        console.log('err', err)
                        this.showMsg(4, '更新失败,服务器异常')
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
        reductionForm() {
            console.log('reductionForm')
            this.mergeData()
        },
        query() {
            if (!this.routerParams.acdemicDeanId) {
                this.showMsg(4, '教务员ID不存在')
                return
            }
            queryAcdemicDeanById({ acdemicDeanId: this.routerParams.acdemicDeanId }).then(res => {
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
            if (this.orginData.genderValue) {
                this.createForm.gender = this.orginData.genderValue
            }
            if (this.createForm.idCardNo) {
                // 根据身份证设置性别和年龄，生日
                let res = isCardID(this.createForm.idCardNo)
                this.createForm.birth = res.birth
                this.createForm.gender = res.gender
                this.createForm.age = res.age
            }
            console.log('this.createForm', this.createForm)
            _.each(this.createForm, (value, key) => {
                this.cloneData[key] = value
            })
            console.log('this.cloneData', this.cloneData)
        },
        back() {
            this.$router.go(-1)
        },
        handleChangeDepartment(value) {
            console.log('handleChangeDepartment', value)
        },
        initData() {
            if (!this.routerParams.acdemicDeanId) {
                let user = this.$store.getters.user
                if (user && user.roleType === role.type.ACDEMIC) {
                    // 当前用户是教务员,只有查看权限，没有编辑权限
                    this.routerParams.acdemicDeanId = user.targetId
                    this.canSubmit = false
                }
            }
            this.queryDepartments()
            this.query()
        },
        submitData() {

        },
        queryDepartments() {
            // 获取院系信息
            if (this.$store.getters.departments.length > 0) {
                this.departmentList = this.$store.getters.departments
                // console.log('departments', this.departmentList)
            } else {
                // 从服务器获取部门数据
                this.$store.dispatch('GetDepartmentsData').then((res) => {
                    // console.log('GetDepartmentsData success', res)
                    this.departmentList = this.$store.getters.departments
                }).catch((error) => {
                    console.log('GetDepartmentsData', error)
                })
            }
            // this.createForm.idCardNo = '429006198010011215'
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
