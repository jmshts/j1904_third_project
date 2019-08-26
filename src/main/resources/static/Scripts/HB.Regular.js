var HBRex = {};
HBRex.Regular = {};
//用户名验证
HBRex.Regular.getUsername = function (str) {
    if (!str) {
        return "请输入用户名！";
    }
    var user = /^[a-zA-Z][a-zA-Z0-9]{5,16}$/;
    var usertwo = /[0-9]/;
    if (user.test(str) && usertwo.test(str)) {
        return false;
    } else {
        return "用户名必须为6-16位数字、字母组合，且以字母开头";
    }
}
//密码验证
HBRex.Regular.getPwd = function (str, pwdtype) {
    if (pwdtype == undefined) {
        if (!str) {
            return "请输入密码！";
        }
    } else if (pwdtype == "oldpwd") {
        if (!str) {
            return "请输入当前账号的登录密码！";
        }
    } else if (pwdtype == "newpwd") {
        if (!str) {
            return "请输入新密码！";
        }
    }
    if (!str) {
        return "请输入密码！";
    }
    var pwd = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}/;
    var pwd1 = /^[a-zA-Z]{6,16}$/;
    if (pwd.test(str)) {
        return false;
    } else {
        return "密码必须6-16个字母、数字组合，不能为纯数字";
    }
}
//确认密码
HBRex.Regular.getPwdConfirm = function (str, str2) {
    var pwd = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}/;
    var pwd1 = /^[a-zA-Z]{6,16}$/;
    if (!str) {
        return "请输入确认密码！";

    }
    if (str !== str2) {
        return "两次密码输入不一致，请重新输入！";
    }
    if (!pwd.test(str) || !pwd.test(str2)) {
        return "密码必须6-16个字母、数字组合，不能为纯数字";
    }
    else {
        return false;
    }


}
//其他证件号码验证
HBRex.Regular.getOthercard = function (code) {
    if (!code) {
        return "请输入证件号码！";
    }
}
//身份证号验证
HBRex.Regular.getIdcard = function (code) {
    if (!code) {
        return "请输入证件号码！";
    }

    return isCardID(code);
    // idCardCheck(code);

    // jQuery.validator.addMethod("idCardCheck", function (code) {
    // 身份证号验证
    //
    //var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    ////  var tip = "";
    ////  var pass = true;
    ////  alert("ffff");
    //if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    //    // tip = "身份证号格式错误";
    //    // pass = false;
    //    //alert("身份证号格式错误");
    //    return '身份证号格式错误！';
    //}

    //else if (!city[code.substr(0, 2)]) {
    //    // tip = "身份证号地址编码错误";
    //    //   pass = false;
    //    //alert("身份证号地址编码错误");
    //    return '身份证号地址编码错误！';
    //}
    //else {
    //    //18位身份证需要验证最后一位校验位
    //    if (code.length == 18) {
    //        code = code.split('');
    //        //∑(ai×Wi)(mod 11)
    //        //加权因子
    //        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    //        //校验位
    //        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    //        var sum = 0;
    //        var ai = 0;
    //        var wi = 0;
    //        for (var i = 0; i < 17; i++) {
    //            ai = code[i];
    //            wi = factor[i];
    //            sum += ai * wi;
    //        }
    //        var last = parity[sum % 11];
    //        if (parity[sum % 11].toString().toUpperCase() != code[17].toString().toUpperCase()) {
    //            // tip = "身份证号最后一位错误";
    //            // pass = false;
    //            //alert("身份证号最后一位错误");
    //            return '身份证号格式错误！';
    //        }
    //    }
    //}
    //return false;
}

function isCardID(sId) {
    var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }
    var iSum = 0;
    var info = "";
    if (!/^\d{17}(\d|x)$/i.test(sId)) return "请输入正确的证件号码！";
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) return "身份证号地址编码错误";
    sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期错误";
    for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    if (iSum % 11 != 1) return "请输入正确的证件号码！";
    //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
    return false;
}

//其他证件
HBRex.Regular.getOthercard = function (type, num) {
    if (type == "Pasport") {
        if (!num) {
            return "请输入护照号码！";
        } else if (num.length > 21) {
            return "护照号码不能大于21位！";
        } else {
            return false;
        }
    } else if (type == "OfficersCard") {
        if (!num) {
            return "请输入军官证号码！";
        } else if (num.length > 21) {
            return "军官证号码不能大于21位！";
        } else {
            return false;
        }
    } else if (type == "Other") {
        var other = /^[a-zA-Z][a-zA-Z0-9]{1,21}$/;
        if (!num) {
            return "请输入其他证件号码！";
        } else if (num.length > 21) {
            return "其他证件号码不能大于21位！";
        } else {
            return false;
        }
    } else if (type == "BirthCard") {
        if (!num) {
            return "请输入出生证号码！";
        } else if (num.length > 20) {
            return "出生证号码不能大于20位！";
        } else {
            return false;
        }
    } else {
        if (!num) {
            return "证件号码不能为空！";
        }
    }
}

//电话号码验证
HBRex.Regular.getPhone = function (str) {
    if (!str) {
        return "请输入手机号码！";
    }
    var phoneNumber = /^1\d{10}$/;
    if (phoneNumber.test(str)) {
        return false;
    } else {
        return "手机号为11位纯数字！";
    }
}
//邮箱验证
HBRex.Regular.getEmail = function (str) {
    if (!str) {
        return "请输入该账号绑定的邮箱！";
    }
    var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (email.test(str)) {
        return false;
    } else {
        return "邮箱格式输入不正确，请重新输入！";
    }
}
//姓名验证
HBRex.Regular.getName = function (str, age) {
    if (age == undefined) {
        if (!str) {
            return "请输入姓名！";
        }

    } else if (age == "edult") {
        if (!str) {
            return "请输入就诊人姓名！";
        }
    } else if (age == "child") {
        if (!str) {
            return "请输入就诊人姓名！";
        }
    } else if (age == "parent") {
        if (!str) {
            return "请输入监护人姓名！";
        }
    }
    var reg = /^[\u4E00-\u9FA5\uF900-\uFA2D A-Za-z·]*$/;
    if (str.length < 2) {
        return "姓名长度为2-20个字符，只能为汉字、字母、空格，不能以空格开头和结尾";
    }
    if (!reg.test(str)) {
        return "姓名长度为2-20个字符，只能为汉字、字母、空格，不能以空格开头和结尾";
    }
    if (str.replace(/[^\u0000-\u00ff]/g, "a").length > 20) {
        return "姓名长度为2-20个字符，只能为汉字、字母、空格，不能以空格开头和结尾";
    }
    var regg = /\s/;
    if (regg.exec(str.substring(0, 1)) != null || regg.exec(str.substring(str.length - 1, str.length)) != null) {
        return "姓名长度为2-20个字符，只能为汉字、字母、空格，不能以空格开头和结尾";
    }

}
