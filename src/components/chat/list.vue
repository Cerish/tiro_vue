<template>
    <div class="list">
        <header>
            <input class="search" type="text" v-model="searchName" placeholder="search friend...">
        </header>
        <ul class="friend-list" ref="list">
            <li v-for="(item, index) in friendList" :key="index" @click="changeCurrentSession(item)">
                <img class="avatar" :src="require('@/assets/images/avatar.jpg')" :alt="item.username">
                <!-- 小圆点 -->
                <el-badge :is-dot="false"><p class="name">{{item.friendName}}</p></el-badge>
            </li>
        </ul>
    </div>
</template>

<script>
    import {queryUserFriend} from '@/views/api.js';
    export default {
        name: 'list',
        data() {
            return {
                friendList: [],
                searchName: '',
                page: 1,
                size: 10
            }
        },
        watch:{
            searchName(val) {
                this.query();
            }
        },
        computed: {},
        methods: {
            changeCurrentSession(curSession) {
                console.log(curSession);
                let obj = {
                    name: curSession.friendName,
                    userId: curSession.friendId,
                    roleId: curSession.friendRoleId
                }
                this.$store.dispatch('SetCurSession', obj);
            },
            query() {
                let params = {
                    userId: this.user.userId, 
                    userRoleId: this.user.roleId
                }
                if(this.searchName) {
                    params.friendName = this.searchName;
                }
                queryUserFriend(params).then(res => {
                    this.friendList.push(...res.data);
                    // 将第一个选中
                    this.changeCurrentSession(res.data[0]);
                }).catch(err => {
                    console.log("error queryUserFriend" + err)
                });
            },
            initData() {
                this.query();
            },
            handleScroll(e){
                if(this.$refs.list == e.target) {
                    const scrollTop = e.target.scrollTop;
                    const clientHeight = e.target.clientHeight;
                    const scrollHeight = e.target.scrollHeight;
                    if(scrollTop + clientHeight == scrollHeight) {
                        this.query();
                    }
                }
                return false;
                
            },
        },
        created() {
            this.initData();
            window.addEventListener('scroll',this.handleScroll,true)
        }
    }
</script>

<style lang="scss" scoped>
    .list {
        ul.friend-list {
            padding-left: 0;
            height: 460px;
            overflow: auto;
            /*滚动条样式*/
            &::-webkit-scrollbar {
                width: 4px;    
                /*height: 4px;*/
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #fff;
            }
            &::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 0;
                background: #333;

            }
            li {
                padding: 16px 15px;
                border-bottom: 1px solid #292C33;
                cursor: pointer;
                list-style: none;

                &:hover {
                    background-color: rgba(255, 255, 255, 0.03);
                }
            }

            li.active { /*注意这个是.不是冒号:*/
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
        .avatar {
            border-radius: 2px;
            width: 30px;
            height: 30px;
            vertical-align: middle;
        }

        .name {
            display: inline-block;
            margin-left: 15px;
            margin-top: 0px;
            margin-bottom: 0px;
        }
        .search {
            background: #26292E;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            outline: none;/*鼠标点击后不会出现蓝色边框*/
            color: #FFF;
        }
    }
</style>
