<template>
<div class="center">
    <div class="text">
        <span class="title">{{$t('dashboard.title')}}</span>
        <div class="info">
            <section class="user" v-if="this.userName || true">
                <span>{{$t('dashboard.username') + ': ' +  this.userName}}</span>
            </section>
            <section class="role" v-if="this.roleName || true">
                <span>{{$t('dashboard.roleName') + ': ' +  this.roleName}}</span>
            </section>
        </div>
    </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {queryUserDetailById} from '@/views/api.js';
export default {
    data() {
        return {
            userName: '',
            roleName: ''
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
        queryUserDetail(user) {
            queryUserDetailById({userId: user.userId, roleId: user.roleId}).then(res => {
                this.storage.ls.set("userInfo", res);
            }).catch(err => {
                console.log("error queryUserDetailById" + err);
            });
        },
        initData() {
            let user = this.storage.ls.get("user");
            if (user.username) {
                this.userName = user.username;
            }
            if (user.roleName) {
                this.roleName = user.roleName;
            }
            this.queryUserDetail(user);
        },
        
    },
    created() {
        this.initData()
    },
    mounted() {
        
    }
}
</script>

<style lang="scss" scoped>
.center {
    background-color: rgba(68, 121, 215, 1);
    // height: 850px;
    position: relative;
    .text {
        position: absolute;
        top: 200px;
        left: 50%;
        margin-left: -200px;
        span.title {
            color: black;
            font-size: 50px;
            text-shadow: 2px 2px 1px #111;
        }
        .info {
            margin-top: 30px;
            margin-left: 80px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            span {
                color: black;
                font-size: 22px;
                text-shadow: 2px 2px 1px #ccc;
            }
            .name,
            .role,
            .user {
                margin-top: 30px;
            }
        }
    }
}
</style>
