import axios from 'axios';
export default {
    install (Vue, options) {
        // 提示函数
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
                    // 信息 (灰色) 比5 多了 信息 i 符号
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

        // 格式化时间
        Vue.prototype.dateFormat = function (date, fmt = 'YYYY-MM-DD HH:mm:ss') {
            fmt = fmt.toUpperCase();
            if (!date) {
              return ''
            }
            if (typeof date === 'string') {
              date = new Date(date.replace(/-/g, '/'))
            }
            if (typeof date === 'number') {
              date = new Date(date)
            }
            var o = {
              'M+': date.getMonth() + 1,
              'D+': date.getDate(),
              'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
              'H+': date.getHours(),
              'm+': date.getMinutes(),
              's+': date.getSeconds(),
              'q+': Math.floor((date.getMonth() + 3) / 3),
              'S': date.getMilliseconds()
            }
            var week = {
              '0': '\u65e5',
              '1': '\u4e00',
              '2': '\u4e8c',
              '3': '\u4e09',
              '4': '\u56db',
              '5': '\u4e94',
              '6': '\u516d'
            }
            if (/(Y+)/.test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(fmt)) {
              fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
            }
            for (var k in o) {
              if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
              }
            }
            return fmt
        }

        // 封装数据请求
        Vue.prototype.ajax = function ajax (url = '', data = {}, type = 'GET') {
            type = type.toUpperCase()
          return new Promise(function (resolve, reject) {
            let promise;
            if (type === 'GET') {
              let ret = '';
              for (let i in data) {
                  ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
              }
              if (ret !== '') {
                ret = ret.substr(0, ret.lastIndexOf('&'));
                url = url + '?' + ret;
              }
              // 发送get请求
              promise = axios.get(url);
            } else if(type === 'POST') {
            //  发送post
              promise = axios.post(url, data);
            }else if(type === 'PUT') {
              // 发送put
              promise = axios.put(url, data);
            }else if(type === 'DELETE') {
              //  发送delete
              promise = axios.delete(url, data);
            }

            promise.then(res => {
              resolve(res);
            }).catch(error => {
              reject(error);
            })
          });
        }

        // 数据深拷贝
        Vue.prototype.deepCopy = function(obj) {
          let result = Array.isArray(obj) ? [] : {};
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = this.deepCopy(obj[key]); //递归复制
              } else {
                result[key] = obj[key];
              }
            }
          }
          return result;
        };

        // 判断对象是否相等
        Vue.prototype.isObjEqual = function(oldData, newData) {
          // 类型为基本类型时,如果相同,则返回true
          if (oldData === newData) return true
          if (Object.prototype.toString.call(oldData) === '[object Object]'
              && Object.prototype.toString.call(newData) === '[object Object]'
              && Object.keys(oldData).length === Object.keys(newData).length) {
              // 类型为对象并且元素个数相同
              // 遍历所有对象中所有属性,判断元素是否相同
              for (const key in oldData) {
                  if (oldData.hasOwnProperty(key)) {
                      if (!this.isObjEqual(oldData[key], newData[key])) {
                          // 对象中具有不相同属性 返回false
                          return false
                      }
                  }
              }
          } else if (Object.prototype.toString.call(oldData) === '[object Array]'
          && Object.prototype.toString.call(oldData) === '[object Array]'
          && oldData.length === newData.length) {
              // 类型为数组并且数组长度相同
              for (let i = 0, length = oldData.length; i < length; i++) {
                  if (!this.isObjEqual(oldData[i], newData[i])) {
                      // 如果数组元素中具有不相同元素,返回false
                      return false
                  }
              }
          } else {
              // 其它类型,均返回false
              return false
          }
          // 走到这里,说明数组或者对象中所有元素都相同,返回true
          return true
      }

      /**
      * 
      * @param  {[type]}  storage 类型  1. localStorage  2. sessionStorage
      * @return {[key, value]}        存储的键值对
      */
      Vue.prototype.$addStorageEvent = function (type, key, data) {
        if (type === 1) {
        // 创建一个StorageEvent事件
          var newStorageEvent = document.createEvent('StorageEvent');
          const storage = {
              setItem: function (k, val) {
                  localStorage.setItem(k, val);
                  // 初始化创建的事件
                  newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
                  // 派发对象
                  window.dispatchEvent(newStorageEvent);
              }
          }
          return storage.setItem(key, data);
        } else {
          // 创建一个StorageEvent事件
          var newStorageEvent = document.createEvent('StorageEvent');
          const storage = {
              setItem: function (k, val) {
                  sessionStorage.setItem(k, val);
                  // 初始化创建的事件
                  newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
                  // 派发对象
                  window.dispatchEvent(newStorageEvent);
              }
          }
          return storage.setItem(key, data);
        }
      }
    }
};