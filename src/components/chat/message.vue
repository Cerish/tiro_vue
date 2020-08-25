<template>
    <div class="message">
        <div class="header" :class="{border:Object.keys(curSession).length!==0}">{{curSession.name}}</div>
        <ul v-if="curSession" ref="message-list" v-scroll-bottom="curSession">
            <li v-for="(entry,index) in chatMsgList" :key="index">
                <p class="time" v-if="entry.type">
                    <span>{{format(entry.date)}}</span>
                </p>
                <div class="main" :class="{self:entry.self}" v-else>
                    <img class="avatar" :src="require('@/assets/images/avatar.jpg')" alt="">
                    <p class="text">{{entry.content}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'message',
        data() {
            return {
            }
        },
        watch: {
            
        },
        computed:{
            chatMsgList() {
                let list = this.chatMsg[this.user.username+'#'+this.curSession.name];
                let newList = this.showTime(list);
                // console.log(newList);
                return newList;
            },
            ...mapGetters({
                curSession: 'curSession',
                user: 'userInfo',
                chatMsg: 'chatMsg'
            })
        },
        methods: {
            // 是否显示时间
            showTime(currentMessageList) {
                if(!currentMessageList) {
                    return [];
                }
                 // !得到的是原数据的copy
                let originMessageList = this.deepCopy(currentMessageList);
                // !由于数组的数据是从上往下返回的，但时间最靠近现在的数据在数组后面，为方便操作，
                // 先reverse数组，最后再reverse回来就好
                originMessageList.reverse(); 
                let newMessageList = []; // !待插入
                let compareTime;
                originMessageList.forEach((item, index) => {
                    if (!compareTime) { //! compareTime不存在  是第一条数据
                        compareTime = new Date(item.date).getTime();
                    } else { // !第二条数据后
                        let nowTime = new Date(item.date).getTime();
                        if (Math.abs(compareTime - nowTime) < 300 * 1000) { // !跟compareTime相差5分钟以内
                            // !不用做
                        } else {
                            newMessageList.push({
                                type: 'addTime',
                                date: originMessageList[index - 1].date // !找到上一项的时间，这个才是5分钟内最早的时间
                            });
                            compareTime = nowTime;// !compareTime 重置
                        }
                    }
                    newMessageList.push(item);
                    if (index === originMessageList.length - 1) { // !如果是最后的数据
                        newMessageList.push({
                            type: 'addTime',
                            date: item.date
                        });
                    }
                });
                newMessageList.reverse();
                return newMessageList;

            },
            // 补 0 函数
            addZeroPrefix(number) {
                return number < 10 ? `0${number}` : number;
            },
            // 显示 hh:mm [:ss]
            getTime(date, withSecond = false) {
                const hour = date.getHours();
                const minute = date.getMinutes();
                const second = date.getSeconds();
                return withSecond ? `${this.addZeroPrefix(hour)}:${this.addZeroPrefix(minute)}:
                                    ${this.addZeroPrefix(second)}` : `${this.addZeroPrefix(hour)}:${this.addZeroPrefix(minute)}`;
            },
            // 显示 yyyy-mm-dd
            getDate(date, splitor = '-') {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                return `${year}${splitor}${this.addZeroPrefix(month)}${splitor}${this.addZeroPrefix(day)}`;
            },
            // 获取周几
            getDay(date) {
                let arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
                const day = date.getDay();
                return arr[day];
            },
            getFullDate(date) {
                return `${this.getDate(date)} ${this.getTime(date)}`;
            },
            isToday(date) {
                return date.toDateString() === new Date().toDateString();
            },
            isYesterday(date) {
                // 昨天的时间
                const yesterdayTime = new Date().getTime() - 24 * 60 * 60*1000;
                return date.toDateString() === new Date(yesterdayTime).toDateString();
            },
            isWeek(time) {
                // 获取当天 00:00 的时间戳 - 6天的时间 == 获得一周内的时间戳
                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const todayTime = new Date(`${year}/${month}/${day}`).getTime();
                // 将时间移至 六天前的00:00 也就是一周内
                const weekTime = todayTime - 24 * 60 * 60 * 1000 * 6;
                return time.getTime() >= weekTime;
            },
            format(time) {
                let date = new Date(time);
                if (this.isToday(date)) {
                    return this.getTime(date);
                } else if (this.isYesterday(date)) {
                    return '昨天  ' + this.getTime(date);
                } else if (this.isWeek(date)) {
                    return this.getDay(date) + this.getTime(date); 
                } else {
                    return this.getFullDate(date);
                }
            }
        },
        filters: {
            // 时间显示格式
            time: (time) => {
                
            }
            
        },
        directives: {/*这个是vue的自定义指令,官方文档有详细说明*/
            'scroll-bottom'(e) {
                setTimeout(function () {
                    e.scrollTop = e.scrollHeight;
                }, 0)
            }
        },
        created() {
        }
    }
</script>

<style lang="scss" scoped>
    .message {
        // padding: 10px 0 0 10px;
        height: 100%;
        .header {
            font-size: 20px;
            padding: 10px;
            
            &.border {
                border: 1px solid #ccc;
            }
        }
        max-height: 68%;

        ul {
            list-style-type: none;
            padding-left: 0px;
            overflow: auto;
            height: 92%;
            margin: 0;
            padding: 0 8px;
            li {
                margin-bottom: 15px;
            }
            &::-webkit-scrollbar {
                width: 8px;
                max-height: 4px;
                padding: 0 20px;
            }
            /* 滚动条的内层滑轨背景颜色 */
            .S12_some_all::-webkit-scrollbar-track-piece {
                background-color: #001029;
            }
            /* 滚动条的内层滑块 */
            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #fff;
                height: 4px;
                padding: 0 20px;
            }
            /* 滚动条的外层滑轨背景颜色 */
            &::-webkit-scrollbar-track {
                // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 0;
                // background: rgba(241, 22, 22, 0.1);
                background: #eee;
            }
        }

        .time {
            text-align: center;
            margin: 5px 0;

            > span {
                display: inline-block;
                padding: 5px 18px;
                font-size: 12px;
                color: #FFF;
                background-color: #dcdcdc;
                border-radius: 2px;
            }
        }

        .main {
            .avatar {
                float: left;
                margin: 0 10px 0 0;
                border-radius: 3px;
                width: 30px;
                height: 30px;

            }

            .text {
                display: inline-block;
                padding: 0 10px;
                max-width: 80%;
                background-color: #fafafa;
                border-radius: 4px;
                line-height: 30px;
            }
        }

        .self {
            text-align: right;

            .avatar {
                float: right;
                margin: 0 0 0 10px;
                border-radius: 3px;
                width: 30px;
                height: 30px;
            }

            .text {
                display: inline-block;
                padding: 0 10px;
                max-width: 80%;
                background-color: #b2e281;
                border-radius: 4px;
                line-height: 30px;
            }
        }
    }
</style>
