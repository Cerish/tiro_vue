//数据深度复制
export const deepCopy = (obj) => {
    let result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result[key] = deepCopy(obj[key]); //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  };
// 比较两个对象 是否相等
export const  isObjEqual = (oldData, newData) => {
    // 类型为基本类型时,如果相同,则返回true
    if (oldData === newData) return true
    if (isObject(oldData) && isObject(newData) && Object.keys(oldData).length === Object.keys(newData).length) {
        // 类型为对象并且元素个数相同
        // 遍历所有对象中所有属性,判断元素是否相同
        for (const key in oldData) {
            if (oldData.hasOwnProperty(key)) {
                if (!isObjEqual(oldData[key], newData[key])) {
                    // 对象中具有不相同属性 返回false
                    return false
                }
            }
        }
    } else if (isArray(oldData) && isArray(oldData) && oldData.length === newData.length) {
        // 类型为数组并且数组长度相同
        for (let i = 0, length = oldData.length; i < length; i++) {
            if (!isObjEqual(oldData[i], newData[i])) {
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

const isObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
};
// 判断此对象是否是Object类型
const isArray =  function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
}
