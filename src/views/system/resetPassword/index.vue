<template>
<div class="createClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">重置密码</span>
            <div class="operation">
                <el-button type="primary" size="small" @click="back">返回</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="create">
                <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px" style="width:600px;">
                    <el-form-item label="姓名" prop="name" class="m20">
                        <el-input v-model="createForm.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="username" class="m20">
                        <el-input v-model="createForm.userName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="newPassword" class="m20">
                        <el-input v-model="createForm.newPassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="再次密码" prop="repeatNewPassword" class="m35">
                        <el-input v-model="createForm.repeatNewPassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item class="m35">
                        <section class="op">
                            <el-button plain type="primary" @click="submitForm('createForm')">提交</el-button>
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
import { resetPassword, getUserInfo } from '@/utils/service/user'
export default {
    name: 'resetPassword',
    components: {},
    data() {
        return {
            createForm: {
                name: '',
                username: '',
                newPassword: '',
                repeatNewPassword: ''
            },
            rules: {
                newPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '长度需大于6字符', trigger: 'blur' }
                ],
                repeatNewPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '长度需大于6字符', trigger: 'blur' }
                ]
            },
            routerParams: {

            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submitForm', this.createForm)
                    if (!this.routerParams.userId) {
                        this.showMsg(2, '用户ID不存在')
                        return
                    }
                    if (this.createForm.newPassword !== this.createForm.repeatNewPassword) {
                        this.showMsg(2, '两次密码不一致')
                        return
                    }
                    let postData = {
                        newPassword: this.createForm.newPassword
                    }
                    resetPassword({ userId: this.routerParams.userId }, postData).then(res => {
                        console.log('resetPassword success', res)
                        if (res.code === 10000) {
                            // 成功
                            this.showMsg(1, '重置密码成功')
                            this.$router.push({
                                name: 'user'
                            })
                        } else {
                            // 失败
                            let failedMsg = res.message ? res.message : '重置密码失败,服务器异常'
                            this.showMsg(4, failedMsg)
                        }
                    }).catch(err => {
                        console.log('err', err)
                        this.showMsg(4, '重置密码失败,服务器异常')
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
        mergeData(data) {
            // console.log('data', data);
            if (data.username) {
                this.createForm.userName = data.username
            }
            if (data.baseInfo) {
                if (data.baseInfo.name) {
                    this.createForm.name = data.baseInfo.name
                }
            }
        },
        initData() {
            if (!this.routerParams.userId) {
                this.showMsg(2, '用户ID不存在')
                return
            }
            getUserInfo({ userId: this.routerParams.userId }).then(res => {
                // console.log('getUserInfo success', res)
                if (res.code === 10000) {
                    // 成功
                    this.mergeData(res.data)
                } else {
                    // 失败
                    let failedMsg = res.message ? res.message : '获取用户信息失败,服务器异常'
                    this.showMsg(4, failedMsg)
                }
            }).catch(err => {
                console.log('err', err)
                this.showMsg(4, '获取用户信息失败,服务器异常')
            })
        }
    },
    mounted() {
        this.routerParams = this.$route.query
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
