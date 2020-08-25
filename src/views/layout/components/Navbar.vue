<template>
<el-menu class="navbar" mode="horizontal">
    <!-- 收起侧边栏组件 sidebar.opened=false 收起侧边栏-->
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <!-- 面包屑组件  首页/综合实例/表单-->
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    
    <div class="right-menu">
        <!-- 显示错误log组件 -->
        <error-log class="errLog-container right-menu-item"></error-log>
        <!-- 聊天室 -->
        <div class="gochat right-menu-item" @click="goChat" :title="$t('navbar.chat')">
            <svg-icon icon-class="iconchat"></svg-icon>
        </div>
        <!-- 全屏 -->
        <screenfull class="screenfull right-menu-item" :title="$t('navbar.screenfull')"></screenfull>
        <!-- 切换语言 -->
        <lang-select class="international right-menu-item" :title="$t('navbar.language')"></lang-select>

        <!-- 换肤组件 -->
        <!-- <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
            <theme-picker class="theme-switch right-menu-item"></theme-picker>
        </el-tooltip> -->

        <el-dropdown class="avatar-container right-menu-item" trigger="click">
            <div class="avatar-wrapper">
                <!-- 设置用户头像 -->
                <img class="user-avatar" :src="avatar">
                <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
                <!-- 首页路由 -->
                <router-link to="/">
                    <el-dropdown-item>
                        {{$t('navbar.dashboard')}}
                    </el-dropdown-item>
                </router-link>
                <!-- 项目地址路由 -->
                <!-- <a target='_blank' href="https://github.com/androidlongfei/StudentManagerFrontend">
                    <el-dropdown-item>
                        {{$t('navbar.github')}}
                    </el-dropdown-item>
                </a> -->
                <!-- 退出 -->
                <el-dropdown-item divided>
                    <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import ErrorLog from './ErrorLog'
import Screenfull from './Screenfull'
import LangSelect from './LangSelect'
import ThemePicker from './ThemePicker'

export default {
    components: {
        Breadcrumb,
        Hamburger,
        ErrorLog,
        Screenfull,
        LangSelect,
        ThemePicker
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'name',
            'avatar'
        ])
    },
    methods: {
        toggleSideBar() {
            console.log('Navbar component => toggleSideBar', this.$store.state.app.sidebar)
            this.$store.dispatch('toggleSideBar')
        },
        logout() {
            this.$store.dispatch('LogOut').then((res) => {
                // location.reload() // In order to re-instantiate the vue-router object to avoid bugs
                this.$router.push({
                    name: 'Login'
                })
            }).catch(err => {
                console.log(err);
            })
        },
        goChat() {
            console.log(123)
            this.$router.push("/chat");
        },
    },

    mounted() {
        // console.log('Navbar component mounted =>', this.$store.state.app.sidebar);
        // this.initData()
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .breadcrumb-container {
        float: left;
    }
    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }
    .right-menu {
        float: right;
        height: 100%;
        &:focus {
            outline: none;
        }
        .right-menu-item {
            display: inline-block;
            margin: 0 8px;
            vertical-align: top;
        }
        .screenfull {
            vertical-align: text-top;
        }
        // .international {
        //     vertical-align: top;
        // }
        .theme-switch {
            vertical-align: 15px;
        }
        .avatar-container {
            height: 50px;
            margin-right: 30px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -12px;
                    top: 15px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
