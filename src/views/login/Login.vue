<template>
    <div class="login">
        <el-form
                :rules="rules"
                ref="loginForm"
                v-loading="loading"
                element-loading-text="正在登录..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :model="loginForm"
                class="loginContainer">
            <div class="title-container ">
                <h3 class="title">{{$t('login.title')}}</h3>
                <lang-select class="set-language"></lang-select>
            </div>
            <el-form-item prop="username">
                <span><svg-icon icon-class="iconuser1"></svg-icon></span>
                <el-input size="normal" type="text" v-model="loginForm.username" auto-complete="off"
                          :placeholder="$t('login.username')"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span><svg-icon icon-class="iconmima"></svg-icon></span>
                <el-input size="normal" :type="passwordType" v-model="loginForm.password" auto-complete="off"
                          :placeholder="$t('login.password')" @keydown.enter.native="submitLogin"></el-input>
                <span style="cursor: pointer;margin-right: 10px" @click="showPwd"><svg-icon :icon-class="showIcon"></svg-icon></span>
            </el-form-item>
            <el-form-item prop="roleType" class="role-type">  
                <el-radio-group v-model="loginForm.roleType">
                    <el-radio :label="5">游客</el-radio>
                    <el-radio :label="4">学生</el-radio>
                    <el-radio :label="2">教师</el-radio>
                    <el-radio :label="1">管理员</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- <el-checkbox size="normal" class="loginRemember" v-model="checked"></el-checkbox> -->
            <el-button size="normal" type="primary" style="width: 100%;" @click="submitLogin">{{$t('login.logIn')}}</el-button>
            <span class="goRegister" @click="goRegister">{{$t('login.goRegister')}}</span>
        </el-form>
    </div>
</template>

<script>
    import LangSelect from '@/components/utils/LangSelect.vue'
    export default {
        name: "Login",
        components: { LangSelect },
        watch: {
            'loginForm.roleType': {
                handler: function(val) {
                    if(val == 5) {
                        this.loginForm.username = 'visitor';
                        this.loginForm.password = '123456Aa';
                    }else if(val == 4) {
                        this.loginForm.username = '宋以馥';
                        this.loginForm.password = '123456Aa';
                    }else if(val == 2) {
                        this.loginForm.username = '申若惠';
                        this.loginForm.password = '123456Aa';
                    }else if(val == 1) {
                        this.loginForm.username = 'admin';
                        this.loginForm.password = '123456Aa';
                    }
                },
                deep: true
            }
        },
        data() {
            return {
                loading: false,
                passwordType: 'password',
                showIcon: 'iconbukejian',
                loginForm: {
                    username: 'admin',
                    password: '123456Aa',
                    roleType: 1
                },
                checked: true,
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = '';
                    this.showIcon = 'iconkejian';
                } else {
                    this.passwordType = 'password',
                    this.showIcon = 'iconbukejian';
                }
            },
            goRegister() {
                this.$router.push('/signup');
            },
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.postKeyValueRequest('/auth/login', this.loginForm)
                        .then( res => {
                            this.loading = false;
                            this.$store.dispatch("SetUser", res.data);
                            this.$store.commit('SET_ROUTERS', []);
                            this.$router.push("/dashboard");
                        }).catch(err => {
                            this.loading = false;
                            console.log("error login " + err);
                        })
                    } else {
                        this.$message.error('请输入所有字段');
                        return false;
                    }
                });
            }
        },
    }
</script>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
    .login {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .loginContainer {
            border-radius: 15px;
            background-clip: padding-box;
            width: 450px;
            padding: 15px 35px 15px 35px;
            background: #fff;
            border: 1px solid #eaeaea;
            box-shadow: 0 0 25px #cac6c6;
            .role-type .el-form-item__content {
                border: 0;
            }
            .el-form-item__content {
                display: flex;
                border: 1px solid #DCDFE6;
                span {
                    line-height: 40px;
                    padding-left: 10px;
                    .icon {
                        font-size: 18px;
                    }
                }
                .el-input__inner {
                    border: none;
                }
            }
            .title-container {
                position: relative;
                .title {
                    font-size: 26px;
                    font-weight: 400;
                    margin: 0 auto 40px;
                    text-align: center;
                    font-weight: bold;
                }
                .set-language {
                    position: absolute;
                    top: 5px;
                    right: 0;
                }
            }
            .goRegister {
                margin-top: 5px;
                cursor: pointer;
                color: #333;
                text-decoration: underline;
            }
        }
    }
</style>