<template>
    <div id="uesrtext">
        <textarea placeholder="按 Enter 发送" v-model="content"
        @keydown.enter.exact.prevent
        @keyup.enter.exact="sendMessage"></textarea>
        <div class="send">
            <div class="tips" v-if="showMessage">
                <span class="arrow"></span>
                <span class="arrow-transition"></span>
                <span>不能发送空白消息</span>
            </div>
            <el-button type="primary" @click="sendMessage">发送（S）</el-button>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'uesrtext',
        data() {
            return {
                content: '',
                showMessage: false
            }
        },
        props: {
            stompClient:{
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        computed:{
            ...mapGetters({
                user: 'userInfo',
                curSession: 'curSession'
            })
        },
        methods: {
            sendMessage() {
                if(this.content.trim()) {
                    let msgObj = new Object();
                    msgObj.to = this.curSession.name;
                    msgObj.content = this.content;

                    this.stompClient.send('/ws/chat', {}, JSON.stringify(msgObj));
                    this.$store.dispatch('AddChatMsg', msgObj);
                    // 发送消息后情况消息框
                    this.content = '';
                }else {
                    this.showMessage = true;
                    setTimeout(() => {
                        this.showMessage = false;
                    }, 2000);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #uesrtext {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 30%;
        border: solid 1px #DDD;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        > textarea {
            padding: 10px;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            resize: none;
        }
        .send {
            margin: 5px 40px 10px auto;
            &:hover {
                background-color: #79ff4d;
            }
            position: relative;
            .tips {
                position: absolute;
                left: -10px;
                top: -35px;
                width: 120px;
                font-size: 14px;
                padding: 3px;
                border: 1px solid #000;
                border-radius: 5px;
                .arrow {
                    width:0;
                    height:0;
                    border:8px solid transparent;
                    border-top-color:#000;
                    position: absolute;
                    top: 22px;
                    left:38%;
                }
                .arrow-transition {
                    width:0;
                    height:0;
                    border:8px solid transparent;
                    border-top-color:#fff;
                    position: absolute;
                    top: 22px;
                    left:38%;
                }
            }
        }
    }
</style>
