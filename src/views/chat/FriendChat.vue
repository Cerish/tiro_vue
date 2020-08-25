<template>
    <div class="chat">
        <div class="sidebar">
            <card></card>
            <list></list>
        </div>
        <div class="main">
            <message></message>
            <usertext :stompClient="stompClient"></usertext>
        </div>
    </div>
</template>

<script>
    import card from '@/components/chat/card.vue'
    import list from '@/components/chat/list.vue'
    import message from '@/components/chat/message.vue'
    import usertext from '@/components/chat/usertext.vue'

    // 使用 SOckJs 实现 websocket
    import SockJS from  'sockjs-client';
    import  Stomp from 'stompjs';
    export default {
        name: 'FriendChat',
        components:{
            card,
            list,
            message,
            usertext
        },
        data () {
            return {
                // websocket 客户端对象
                stompClient: {}
            }
        },
        mounted() {
            this.initWebSocket();
            
            // 初始化聊天记录
            this.$store.dispatch('initChatMsg');
        },
        beforeDestroy: function () {
            // 页面离开时断开连接,清除定时器
            this.disconnect();
            clearInterval(this.timer);
        },
        methods: {
            initWebSocket() {
                this.connection();
                // 存储 this 对象
                let self = this;
                // 断开重连机制,尝试发送消息,捕获异常发生时重连
                this.timer = setInterval(() => {
                    try {
                        self.stompClient.send("test");
                    } catch (err) {
                        console.log("断线了: " + err);
                        self.connection();
                    }
                }, 5000);
            },
            connection() {
                // 建立连接对象
                //连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
                let socket = new SockJS('/ws/chat');
                
                // 获取STOMP子协议的客户端对象
                this.stompClient = Stomp.over(socket);
                // 定义客户端的认证信息,按需求配置
                var headers = {};
                // 向服务器发起websocket连接
                this.stompClient.connect(headers,(success) => {
                    console.log("websocket connect success" + success);
                    // 订阅服务端提供的某个topic
                    this.stompClient.subscribe('/user/queue/chat', (msg) => {
                        let receiveMsg = JSON.parse(msg.body);
                        receiveMsg.notSelf = true;
                        receiveMsg.to = receiveMsg.from;
                        this.$store.dispatch('AddChatMsg', receiveMsg);
                        console.log("我是订阅者"+receiveMsg);  // msg.body存放的是服务端发送给我们的信息
                    });
                }, (err) => {
                    // 连接发生错误时的处理函数
                    console.log("websocket connect error" + err);
                });

            },
            // 断开连接
            disconnect() {
                if (this.stompClient != null) {
                    this.stompClient.disconnect();
                    console.log("Disconnected");
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    .chat {
        margin: 20px 50px;
        height: calc(100vh - 90px);
        overflow: hidden;
        border-radius: 10px;
        .sidebar, .main {
            height: 100%;
        }
        .sidebar {
            float: left;
            color: #f4f4f4;
            background-color: #2e3238;
            width: 200px;
        }
        .main {
            position: relative;
            overflow: hidden;
            background-color: #eee;
        }
    }
</style>