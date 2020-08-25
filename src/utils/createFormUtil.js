/**
 * 身份证一共18位，后四位代表：
 *（1）第15、16位数字表示：所在地的派出所的代码；
 *（2）第17位数字表示性别：奇数表示男性，偶数表示女性；
 *（3）第18位数字是校检码：用来检验身份证的正确性。校检码可以是0~10的数字，10用x表示。
 */

const aCity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
}

const isCardID = (sId) => {
    if (!/^\d{17}(\d|x)$/i.test(sId)) {
        return '你输入的身份证长度或格式错误'
    }
    sId = sId.replace(/x$/i, 'a')
    if (!aCity[parseInt(sId.substr(0, 2))]) {
        return '你的身份证地区非法';
    }
    let sBirthday = sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, '/'));
    if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())) {
        return '身份证上的出生日期非法'
    }
    let iSum = 0;
    for (let i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    }
    // 精准校验 (关闭)
    if (iSum % 11 !== 1) {
        // return '你输入的身份证最后一位有错误'
    }
    // 年龄
    var myDate = new Date()
    var month = myDate.getMonth() + 1
    var day = myDate.getDate()
    var age = myDate.getFullYear() - sId.substring(6, 10) - 1;

    if (sId.substring(10, 12) <= month && sId.substring(12, 14) <= day) {
        age++
    }
    let address = aCity[parseInt(sId.substr(0, 2))]
    let gender = (sId.substr(16, 1) % 2 ? '男' : '女')
    let infoObj = {
        address: address,
        gender: gender,
        birth: sBirthday,
        age: age
    }
    return infoObj;
}

export {
    isCardID
}
