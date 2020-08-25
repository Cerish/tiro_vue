<template>
<div class="editContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">编辑档案</span>
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
                                <el-input v-model="editForm.username" checked></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别" prop="gender">
                                <el-radio-group v-model="editForm.gender" checked>
                                    <el-radio :label="0">男</el-radio>
                                    <el-radio :label="1">女</el-radio>
                                    <el-radio :label="2">保密</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="邮箱" prop="email" class="">
                                <el-input v-model="editForm.email"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="电话号码" prop="mobile" class="">
                                <el-input v-model="editForm.mobile"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col>
                            <el-form-item label="用户头像" prop="address">
                                <!-- <img class="avatar" :src="this.editForm.userface || require('@/assets/images/avatar.jpg')" :alt="user.username"> -->
                                <img class="avatar" :src="editForm.userface" :alt="user.username">
                                <el-upload
                                    class="upload"
                                    ref="upload"
                                    :show-file-list="false"
                                    :data="user"
                                    action="/hr/userface"
                                    :on-change="onChange"
                                    :auto-upload="false">
                                    <el-button class="upload-btn" slot="trigger" size="small" type="primary">选取文件</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <section class="op" style="width:100%;margin: 30px 0;">
                        <el-button type="primary" plain :disabled="this.disabled" @click="submitForm('editForm')">更新</el-button>
                        <el-button type="danger" plain :disabled="this.disabled" @click="resetForm">重置</el-button>
                    </section>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import {queryVisitorById} from '@/views/api.js';
import {mapGetters} from 'vuex';
export default {
    name: 'visitorPersonInfo',
    components: {},
    computed: {
        ...mapGetters({
            user: 'user'
        }),
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
                userface: '',
                age: '',
                mobile: '',
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
        }
    },
    methods: {
        submitForm(formName) {
            console.log('editForm.className', this.editForm.className)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('valid true');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 选择文件触发事件 预展示
        onChange(file, fileList) {
            this.editForm.userface  = URL.createObjectURL(file.raw);
        },
        resetForm() {
            this.query();
        },
        query() {
            console.log(this.user);
            queryVisitorById(this.user.userId).then(res => {
                console.log('log success', res);
                this.editForm = res;
                this.orginData = this.deepCopy(this.editForm);
            }).catch(err => {
                console.log('err', err);
                this.showMsg(4, '查询教师信息失败');
            })
        },
        back() {
            this.$router.go(-1)
        },
        handleChangeDepartment(value) {
            console.log('handleChangeDepartment', value)
        },
        initData() {
            this.query();
        }
    },
    created() {
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
    
    .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        transform: translateX(188px);
        margin-bottom: 10px;
        vertical-align: middle;/*这个是图片和文字居中对齐*/
    }
    .upload {
        text-align: center;
    }
}
</style>
