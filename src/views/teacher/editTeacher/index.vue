<template>
<div class="editContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title" v-if="isTeacher()">教师个人信息</span>
            <span class="title" v-else>编辑教师档案</span>
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
                            <el-form-item label="姓名" prop="username" class="">
                                <el-input v-model="editForm.username"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别" prop="gender">
                                <el-radio-group v-model="editForm.gender" disabled checked>
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
                                <el-input v-model="editForm.idCard" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="年龄" prop="age" class="">
                                <el-input v-model.number="editForm.age" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item  v-if="isTeacher()" label="院系" prop="collegeName" class="">
                                <el-input v-model.number="editForm.collegeName" readonly></el-input>
                            </el-form-item>
                            <el-form-item v-else label="所属院系" prop="collegeId" class="" style="">
                                <el-select v-model="editForm.collegeId" clearable placeholder="请选择院系" @change="handleChangeDepartment">
                                    <el-option v-for="(college,index) in this.collegeList" :label="college.nameZh" :value="Number(college.id)" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item  v-if="isTeacher()" label="院系" prop="titleNameZh" class="">
                                <el-input v-model.number="editForm.titleNameZh" readonly></el-input>
                            </el-form-item>
                            <el-form-item v-else label="职称" prop="titleId" class="" style="">
                                <el-select v-model="editForm.titleId" clearable placeholder="请选择职称">
                                    <el-option v-for="(title,index) in this.titleList" :label="title.nameZh" :value="Number(title.id)" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="电话号码" prop="mobile" class="">
                                <el-input v-model="editForm.mobile"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="居住地址" prop="address" class="">
                                <el-input v-model="editForm.address"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <section class="op" style="width:100%;margin: 30px 0;">
                        <el-button type="primary" plain :disabled="disabled" @click="submitForm('editForm')">更新</el-button>
                        <el-button type="danger" plain :disabled="disabled" @click="resetForm">重置</el-button>
                    </section>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import {queryTitle, queryTeacherById, updateTeacherById} from '@/views/api.js';
import mixin from '@/mixins/mixin.js';
export default {
    name: 'editClass',
    components: {},
    mixins: [mixin],
    computed: {
        disabled() {
            return this.isObjEqual(this.orginData, this.editForm);
        }
    },
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
                this.editForm.birth = res.birth
                this.editForm.gender = res.gender
                this.editForm.age = res.age
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
            editForm: {
                username: '',
                gender: '',
                idCard: '',
                age: '',
                collegeId: '',
                titleId: '',
                mobile: '',
                address: ''
            },
            orginData: {},
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
                ],
                title: [
                    { required: true, message: '请选择职称', trigger: 'change' }
                ]
            },
            collegeList: [],
            titleList: [],
            routerParams: {},
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    updateTeacherById(this.editForm).then(res => {
                        console.log('log success', res);
                        this.showMsg(1, "信息更新成功");
                        this.query();
                    }).catch(err => {
                        console.log('error updateTeacherById', err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            this.query();
        },
        query() {
            let id = this.isTeacher() ? this.user.userId : this.routerParams.id
            queryTeacherById(id).then(res => {
                console.log('log success', res);
                this.editForm = res;
                this.orginData = this.deepCopy(this.editForm);
            }).catch(err => {
                console.log('error queryTeacherById', err);
            })
        },
        back() {
            this.$router.push('/')
        },
        handleChangeDepartment(value) {
            console.log('handleChangeDepartment', value)
        },
        initData() {
            queryTitle().then(res => {
                this.titleList = res;
            }).catch(err => {
                this.showMsg(4, '获取 职称列表失败')
            });
            this.queryCollege();
            this.query();
        },
        submitData() {

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
    .el-radio {
        margin-right: 10px;
    }
}
</style>
