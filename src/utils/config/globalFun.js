/**
 * [install 全局函数模块]
 * @param  {[type]} Vue     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
exports.install = function (Vue, options) {
    /**
     * [showNotifyMsg 通知]
     * @param  {Boolean} type [1:成功,2:警告]
     * @param  {[type]}  title   [标题]
     * @param  {[type]}  msg     [描述]
     * @return {[type]}          [description]
     */
    Vue.prototype.showNotifyMsg = function (type, title, msg) {
        let msgObj = {
            duration: 2000
        }
        if (title) {
            msgObj.title = title
        }
        if (msg) {
            msgObj.message = msg
        }
        switch (type) {
            case 1:
                // 成功
                this.$notify.success(msgObj)
                break;
            case 2:
                // 警告
                this.$notify.warning(msgObj)
                break;
            case 3:
                // 信息
                this.$notify.info(msgObj)
                break;
            case 4:
                // 失败
                this.$notify.error(msgObj)
                break;
            default:
                this.$notify.success(msgObj)
        }
    }

    /**
     * [showMsg 消息]
     * @param  {[type]} type  [description]
     * @param  {[type]} msg   [description]
     * @return {[type]}       [description]
     */
    Vue.prototype.showMsg = function (type, msg) {
        switch (type) {
            case 1:
                // 成功
                this.$message({
                    message: msg,
                    type: 'success'
                });
                break;
            case 2:
                // 警告
                this.$message({
                    message: msg,
                    type: 'warning'
                });
                break;
            case 3:
                // 信息
                this.$message({
                    message: msg
                });
                break;
            case 4:
                // 失败
                this.$message({
                    message: msg,
                    type: 'error'
                });
                break;
            default:
                this.$message({
                    message: msg,
                    type: ''
                });
        }
    }

    /**
     * [checkEmptyStr 校验字符串是否为['',null,undefined]]
     * @param  {[type]} strValue [需要校验的字符串]
     * @return {[type]}          [当前字符串不为空直接返回,否则返回空字符串]
     */
    Vue.prototype.checkEmptyStr = function (strValue) {
        if (strValue) {
            return strValue
        }
        return ''
    }

    /**
     * [scrollYPosition 将浏览器滚动到Y抽指定位置{主要解决手机端项目在进入主页(有滚动条)后,再进入子页面，直接按返回出现空白情况的bug}]
     * @param  {[type]} position [Y抽坐标值]
     */
    Vue.prototype.scrollYPosition = function (position) {
        let scrollPosition = 0
        if (position) {
            scrollPosition = position
        }
        setTimeout(() => {
            //  console.log('scrollPosition', scrollPosition)
            document.body.scrollTop = scrollPosition
            // 兼容google chrome
            document.documentElement.scrollTop = scrollPosition
        }, 5)
    }
}
