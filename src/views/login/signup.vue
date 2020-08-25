<template>
    <div>
        <el-form
                :rules="rules"
                ref="registerForm"
                v-loading="loading"
                element-loading-text="正在注册用户..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :model="registerForm"
                class="registerContainer">
            <div class="title-container ">
                <h3 class="title">{{$t('register.title')}}</h3>
                <lang-select class="set-language"></lang-select>
            </div>
            <el-form-item prop="username" :label="$t('register.username')">
                <el-input size="normal" type="text" v-model="registerForm.username" auto-complete="off"
                          :placeholder="$t('register.username')"></el-input>
            </el-form-item>
            <el-form-item prop="phone" :label="$t('register.mobile')">
                <el-input size="normal" type="text" v-model="registerForm.phone" auto-complete="off"
                          :placeholder="$t('register.mobile')"></el-input>
            </el-form-item>
            <el-form-item prop="imgCode" :label="$t('register.imgCode')">
                <el-input size="normal" type="text" v-model="registerForm.imgCode" auto-complete="off"
                          :placeholder="$t('register.imgCode')"></el-input>
                <img class="imgCode" @click="changeImgCode" :src="'/api/kaptcha/defaultKaptcha?code='+ code" :alt="$t('register.imgCode')" />
            </el-form-item>
            <el-form-item :label="$t('register.phone')">
                <el-input size="normal" type="text" v-model="registerForm.telephone" auto-complete="off"
                          :placeholder="$t('register.phone')"></el-input>
            </el-form-item>
            <el-form-item prop="email" :label="$t('register.email')">
                <el-input size="normal" type="text" v-model="registerForm.email" auto-complete="off"
                          :placeholder="$t('register.email')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('register.address')">
                <el-input size="normal" type="text" v-model="registerForm.address" auto-complete="off"
                          :placeholder="$t('register.address')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('register.gender')">
              <el-radio-group v-model="registerForm.gender">
                <el-radio label="0">{{$t('register.male')}}</el-radio>
                <el-radio label="1">{{$t('register.female')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('register.role')">
              <el-select v-model="registerForm.role" :placeholder="$t('register.role')">
                <el-option :label="$t('role.visitor')" value="0"></el-option>
                <el-option :label="$t('role.student')" value="1"></el-option>
                <el-option :label="$t('role.teacher')" value="2"></el-option>
                <el-option :label="$t('role.acdemic')" value="3"></el-option>
                
              </el-select>


            </el-form-item>
            
            <el-form-item prop="password" :label="$t('register.password')">
                <el-input size="normal" type="password" v-model="registerForm.password" auto-complete="off"
                          :placeholder="$t('register.placeholderPwd')"></el-input>
            </el-form-item>
            <el-form-item prop="checkPassword" :label="$t('register.confirmPwd')">
                <el-input size="normal" type="password" v-model="registerForm.checkPassword" auto-complete="off"
                          :placeholder="$t('register.confirmPwd')"></el-input>
            </el-form-item>
            <el-button size="normal" type="primary" style="width: 100%;" @click="submitRegister">{{$t('register.register')}}</el-button>
            <span class="goLogin" @click="goLogin">{{$t('register.goLogin')}}</span>
        </el-form>
    </div>
</template>

<script>
import LangSelect from '@/components/utils/LangSelect.vue'

export default {
  name: "signup",
  components: { LangSelect },
  data() {
    var validateMobilePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('负责人手机号不可为空'));
        } else {
          if (value !== '') { 
            var reg=/^1[3456789]\d{9}$/;
            if(!reg.test(value)){
              callback(new Error('请输入有效的手机号码'));
            }
          }
          callback();
        }
      };
    var confirmPwd = (rule, value, callback) => {
      if(value != this.registerForm.password) {
        callback(new Error('两次输入的密码不相同！'));
      }
      callback();
    };
    var checkEmail = (rule, value, callback) => {
      var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if(value != "" && !regEmail.test(value)){
          callback(new Error('邮箱格式不正确'));
      }
      callback();
    };
    var checkPwd = (rule, value, callback) => {
      if(value == '') callback(new Error("密码不能为空！"));
      var regPwd=/^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z,a-z,!@#$%^&*?\(\)]).*$/;
      if(value != "" && !regPwd.test(value)) {
          callback(new Error("请输入正确的密码格式！"));
      }
      callback();
    };
    return {
      loading: false,
      code: 0, // 防止图片请求缓存
      registerForm: {
        username: '',
        password: '',
        checkPassword:'',
        phone: '',
        telephone: '',
        address: '',
        gender: "0",
        email: "",
        imgCode: '',
        role: '0'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          {required: true, validator: checkPwd , trigger: 'blur'},
        ],
        phone: [
          {required: true, validator: validateMobilePhone, trigger: 'blur' }
        ],
        checkPassword: [
          {required: true, validator: confirmPwd, trigger: 'blur' }
        ],
        email: [
          {required: false, validator: checkEmail, trigger: 'blur' }
        ],
        imgCode: [
          {required: true, min: 4, max: 4, message: '长度为4个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    goLogin() {
        this.$router.push('/login');
    },
    submitRegister() {
      this.$refs.registerForm.validate((valid) => {
          if (valid) {
              this.loading = true;
              let params = {
                user: {
                  username: this.registerForm.username,
                  password: this.registerForm.password,
                  phone: this.registerForm.phone,
                  telephone: this.registerForm.telephone,
                  address: this.registerForm.address
                },
                role: this.registerForm.role,
                code: this.registerForm.imgCode
              }
              this.postRequest('/auth/signup', params)
              .then(res => {
                this.loading = false;
                this.$message.success('注册成功，请登录！');
                this.$router.push("/login");
              })
              .catch(err => {
                this.loading = false;
              });
          } else {
              this.$message.error('请输入必填的字段');
              return false;
          }
      });
    },
    changeImgCode() {
        this.code = Math.ceil(Math.random()*10);//生成一个随机数（防止缓存）
    },
  }
}
</script>
<style lang="scss">
    .registerContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .el-form-item__label {
          width: 100px;
        }
        .el-form-item__content {
          display: flex;
          height: 32px;
          align-items: center;
        }
        .imgCode {
          margin-left: 10px;
          height: 40px;
          width: 110px;
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
        .goLogin {
            margin-top: 5px;
            cursor: pointer;
            color: #333;
            text-decoration: underline;
        }
    }

</style>