<template>
<div class="createClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">修改密码</span>
            <div class="operation">
                <el-button type="primary" size="small" @click="back">返回</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="create">
                <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px" style="width:600px;">
                    <el-form-item label="旧密码" prop="oldPassword" class="m20">
                        <el-input v-model="createForm.oldPassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword" class="m35">
                        <el-input v-model="createForm.newPassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="再次密码" prop="repeatNewPassword" class="m35">
                        <el-input v-model="createForm.repeatNewPassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item class="m35">
                        <section class="op">
                            <el-button plain type="primary" @click="submitForm('createForm')">修改</el-button>
                            <el-button plain type="danger" @click="resetForm('createForm')">重置</el-button>
                        </section>
                    </el-form-item>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import { changePwd } from '@/views/api.js';
export default {
    name: 'createClass',
    components: {},
    data() {
        const checkRepeatPws = (rule, value, callback) => {
            if (this.createForm.newPassword) {
                if (this.createForm.newPassword !== this.createForm.repeatNewPassword) {
                    return callback(new Error('两次密码不一致'))
                }
            }
            callback()
        };
        return {
            createForm: {
                oldPassword: '',
                newPassword: '',
                repeatNewPassword: ''
            },
            rules: {
                oldPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '长度需大于6字符', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '长度需大于6字符', trigger: 'blur' }
                ],
                repeatNewPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '长度需大于6字符', trigger: 'blur' },
                    { required: true, validator: checkRepeatPws, trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submitForm', this.createForm)
                    if (this.createForm.newPassword !== this.createForm.repeatNewPassword) {
                        this.showMsg(2, '两次密码不一致')
                        return
                    }
                    let postData = {
                        oldPassword: this.createForm.oldPassword,
                        newPassword: this.createForm.newPassword,
                        userId: this.$store.getters.user.userId
                    }
                    console.log('userId', this.$store.getters.user)
                    changePwd(this.$store.getters.user.roleId, postData).then(res => {
                        console.log('log success', res);
                        this.storage.ls.clear();
                        this.$router.push('/login');
                        this.showMsg(1, "密码修改成功，请重新登录！");
                    }).catch(err => {
                        console.log('error changePwd', err)
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
