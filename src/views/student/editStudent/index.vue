<template>
<div class="editContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title" v-if="isStudent()">个人信息</span>
            <span class="title" v-else>编辑学生档案</span>
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
                                <el-input v-model="editForm.idCard" disabled></el-input>
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
                            <el-form-item label="出生日期" prop="birth">
                                <el-date-picker type="date" placeholder="请选择出生日期" v-model="editForm.birth" readonly></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="电话号码" prop="mobile" class="">
                                <el-input v-model="editForm.mobile"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="所属院系" prop="collegeId" class="" style="">
                                <el-select v-model="editForm.collegeId" filterable clearable placeholder="请选择院系" @change="handleChangeCollege">
                                    <el-option v-for="(college,index) in this.collegeList" :label="college.nameZh" :value="Number(college.id)" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所学专业" prop="majorId" class="">
                                <el-select v-model="editForm.majorId" filterablr clearable placeholder="请选择专业" @change="handleChangeMajor">
                                    <el-option v-for="(major,index) in this.majorList" :label="major.nameZh" :value="Number(major.id)" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="所属班级" prop="className" class="">
                                <el-select v-model="editForm.classId" filterable clearable placeholder="请选择班级" @change="handleChangeClass">
                                    <el-option v-for="(aclass,index) in this.classList" :label="aclass.name" :value="Number(aclass.id)" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="入学日期" prop="admissionTime">
                                <el-date-picker type="date" placeholder="请选择入学日期" v-model="editForm.admissionTime"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="居住地址" prop="address" class="">
                                <el-input v-model="editForm.address"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学号" prop="studentNo" class="">
                                <el-input v-model="editForm.studentNo" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <section class="op" style="width:100%;margin: 30px 0;">
                        <el-button type="primary" plain :disabled="this.isChange" @click="submitForm('editForm')">更新</el-button>
                        <el-button type="danger" plain :disabled="this.isChange" @click="resetForm()">重置</el-button>
                    </section>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import { 
    queryStudentById, 
    queryMajorByCollegeId, 
    queryClassByMajorId,
    updateStudentById
} from '@/views/api.js';
import mixin from '@/mixins/mixin.js'
export default {
    name: 'editClass',
    components: {},
    mixins: [mixin],
    computed:{
        isChange() {
            return this.isObjEqual(this.editForm, this.orginData);
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
                gender: 0,
                idCard: '',
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
            routerParams: {},
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    updateStudentById(this.editForm).then(res => {
                        console.log(res);
                        this.query();
                        this.showMsg(1, "更新成功")
                    }).catch(err => {
                        console.log("error updateStudentById" + err);
                    })
                }
            });
        },
        resetForm() {
            this.query();
        },
        query() {
            let id = this.isStudent() ? this.user.userId : this.routerParams.id;
            queryStudentById( id ).then(res => {
                this.editForm = res;
                this.orginData = this.deepCopy(this.editForm);
                this.queryAllMajor(res.collegeId);
                this.queryClassByMajor(res.majorId);
            }).catch(err => {
                console.log('err', err)
                this.showMsg(4, '查询学生信息失败')
            })
        },
        back() {
            this.$router.go(-1)
        },
        handleChangeCollege(value) {
            console.log('handleChangeCollege', value);
            if(value) {
                this.editForm.majorId = '';
                this.queryMajorByCollege(value);
                this.editForm.classId = '';
                this.queryClassByCollege(value);
            } else {
                this.queryAllMajor();
                this.editForm.majorId = '';
                this.queryAllClass();
                this.editForm.classId = '';
            }
        },
        handleChangeMajor(val) {
            if(val) {
                this.queryClassByMajor(val);
                this.editForm.classId = '';
                this.majorList.find(item => {
                    if(item.id == val) {
                        this.editForm.collegeId = item.collegeId;
                        return true;
                    }
                    return false;
                })
            } else {
                this.editForm.classId = '';
                this.queryClassByCollege(this.editForm.collegeId);
            }
        },
        handleChangeClass(val) {
            console.log(val);
            if(val) {
                this.classList.find(item => {
                    if(item.id == val) {
                        this.editForm.collegeId = item.collegeId;
                        this.editForm.majorId = item.majorId;
                        return true;
                    }
                    return false;
                })
            }
        },
        initData() {
            // 初始化 学院数据
            this.queryCollege();
            this.query();
        },
        submitData() {

        },
    },
    created() {
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
}
</style>
