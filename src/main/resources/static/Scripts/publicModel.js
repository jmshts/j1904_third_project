//1.单例模式   (登录，提示信息）
var getSingle = function (fn) {
    var res;
    return function () {
        return res || (res = fn.apply(this, arguments));
    }
}

//登录实例
var createLogin = getSingle(function () {
    var loginStr = "";
    loginStr += ("<div id=\'login\' class=\'mask-shadow is-visible\'>");
    loginStr += ("<div class=\'bgshadow\'></div>");
    loginStr += ("	<div class=\'mydialog mydialogs animated bounceInDown\'>");
    loginStr += ("		<div class=\'login\'>");
    loginStr += ("			<h4>登录<a class=\'float-right\'><img src=\"/Content/images/login/close.png\"></a></h4>");
    loginStr += ("			<form class=\'\' name=\'form1\' id=\'form1\' method=\'post\'>");
    loginStr += ("				<div class=\'warnings\'>");
    loginStr += ("					<img class=\'res-warning\' src=\'/Content/images/warning.png\'> <p class=\'warning-cont\'></p>");
    loginStr += ("				</div>");
    loginStr += ("				<div class=\'controls\'>");
    loginStr += ("					<img class=\'login-img\' src=\'/Content/images/login/users.png\'><input class=\'largeInput\' name=\'LoginName\' id=\'LoginName\' maxlength=\'50\' placeholder=\'手机号/身份证号\' type=\'text\' value=\'\'>");
    loginStr += ("				</div>");
    loginStr += ("				<div class=\'controls\'>");
    loginStr += ("					<img class=\'login-img\' src=\'/Content/images/login/password.png\'><input class=\'largeInput\'maxlength=\"16\" name=\'Password\' id=\'Password\' placeholder=\'密码\' type=\'password\'>");
    loginStr += ("				</div>");
    loginStr += ("				<div class=\'controls\'>");
    loginStr += ("					<img class=\'login-img\' src=\'/Content/images/login/code.png\'><input id=\"verifycode\" class=\'defaultInput\' placeholder=\'验证码\' type=\'text\' name=\'VerifyCode\' maxlength=\'4\'>");
    loginStr += ("					<img id=\"valiCode\" class=\"checkImg\" src=\"/Account/GetValidateCode\" onclick=\"ClickRemoveChangeCode();\" />");
    loginStr += ("				</div>");
    loginStr += ("				<div class=\'specil-controls\'>");
    loginStr += ("					<span class=\'float-left\'><a class=\'login-hover\' href=\'/Account/FindPassword\'>忘记密码？</a></span>");
    loginStr += ("					<span class=\'float-right\'><a class=\'login-hover\' id=\'jump-register\'>注册</a></span>");
    loginStr += ("				</div>");
    loginStr += ("				<div class=\'controls\'>");
    loginStr += ("					<button class=\'login-btn btnAnimate\' value=\'登录\' onclick=\'LoginGo()\'  type=\'button\'>登录</button>");
    loginStr += ("				</div>");
    loginStr += ("			</form>");
    loginStr += ("		</div>");
    loginStr += ("	</div>");
    loginStr += ("</div>");
    var dom = $("body").append(loginStr);
    if (RegistWay == "1") {
        $("#LoginName").attr("placeholder", "用户名/身份证号/邮箱");
    }
    if (RegistWay == "2") {
        $("#LoginName").attr("placeholder", "手机号/身份证号");
    }
    if (RegistWay == "1,2") {
        $("#LoginName").attr("placeholder", "手机号/邮箱/用户名/身份证号");
    }
    //警告信息隐藏
    $(".warnings").hide();
    //登录框事件
    $(".mask-shadow .mydialog .login h4 a").click(function () {
        $(".mydialog").removeClass("bounceInDown").addClass("bounceOutDown");
        setTimeout(function () {
            $("body").find("#login").hide();
        }, 1000);
    });
    $("#jump-register").click(function () {
        $(".mydialog").removeClass("bounceInDown").addClass("bounceOutDown");
        setTimeout(function () {
            $("body").find("#login").hide();
        }, 1000);
        setTimeout(function () {
            JumpRegist();
        }, 1000);
    });
    var mgt = $(".mydialogs").innerHeight() / 2;
    $(".mydialogs").css('margin-top', (-mgt) + 'px');
    return dom;
})

//提示信息实例
var createDiv = getSingle(function () {
    var msgbox = $("#IDC_MESSAGEBOX");
    var msgboxmask = $("#IDC_MESSAGEBOX_MASK");
    if (msgbox.length == 0) {
        msgbox = $('<div id="IDC_class"><div class=\'errorMessageBox animated fadeInDown text-center\'></div></div>');
        msgboxmask = $('<div id="IDC_MESSAGEBOX_MASK"></div>');
        $(document.body).append(msgbox);
        $(document.body).append(msgboxmask);
    }
    else {
        msgbox.attr("class", "");
        msgbox.html('<div id="IDC_class"><div class=\'errorMessageBox animated fadeInDown text-center\'></div></div>');
    }
    return {
        msgbox: msgbox,
        msgboxmask: msgboxmask
    }
});

//提示信息实例
var Message = (function () {
    var temp = true;
    var Message = function (msg, callback, tipclass, autoclose) {
        if (temp) {
            var res = createDiv();
            var msgbox = res.msgbox;
            var msgboxmask = res.msgboxmask;
            temp = false;
            $("#IDC_class").addClass(tipclass);
            $("#IDC_class").find('.errorMessageBox').html(msg);
            var msgcallback = callback;
            if (typeof (msgcallback) != "function") {
                msgcallback = function () { }
            }

            if (typeof (autoclose) == "number") {
                msgboxmask.click(function () {
                    $("#IDC_MESSAGEBOX_MASK").hide();
                    $("#IDC_MESSAGEBOX").hide(autoclose);
                });
                msgbox.show(0).delay(autoclose).slideUp(0, function () {
                    temp = true;
                    $("#IDC_MESSAGEBOX_MASK").hide();
                    msgcallback();
                });
            }
            else {
                msgboxmask.click(function () {
                    $("#IDC_MESSAGEBOX_MASK").hide();
                    $("#IDC_MESSAGEBOX").hide(300);
                    msgcallback();
                });
                msgbox.show(300);
            }
            msgboxmask.show();
        }

    };
    return Message;
})()

//错误提示信息
var MessageError = function (msg, callback) {
    Message(msg, callback, "errorMessage", 2000);
}

//2.策略模式 （表单验证）
var strategies = {
    //判空验证
    isNonEmpty: function (value, msg) {
        if (value == '') {
            return msg;
        }
    },
    //用户名验证
    userName: function (value, msg) {
        var temp = /^[a-zA-Z][a-zA-Z0-9]{5,16}$/;
        var temptwo = /[0-9]/;
        if (!temp.test(value) || !temptwo.test(value)) {
            return msg;
        }
    },
    //长度验证（最小）
    minLength: function (value, length, msg) {
        if (value.length < parseInt(length)) {
            return msg;
        }
    },
    //长度验证（最大）
    maxLength: function (value, length, msg) {
        if (value.length > parseInt(length)) {
            return msg;
        }
    },
    //密码验证
    password: function (value, msg) {
        var temp = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}/;
        if (!temp.test(value)) {
            return msg;
        }
    },
    //确认密码
    confirmPassword: function (value, value2, msg) {
        if (value != value2) {
            return msg;
        }
    },
    //姓名验证
    name: function (value, msg) {
        var reg = /^[\u4E00-\u9FA5\uF900-\uFA2D A-Za-z·]*$/;
        if (value.length < 2) {
            return "姓名长度为4-20个字符，只能为汉字、字母、空格，不能以空格开头和结尾";
        }
        if (!reg.test(value)) {
            return "姓名长度为4-20个字符，只能为汉字、字母、空格，不能以空格开头和结尾";
        }
        if (value.replace(/[^\u0000-\u00ff]/g, "aa").length > 20) {
            return "姓名长度为4-20个字符，只能为汉字、字母、空格，不能以空格开头和结尾";
        }
        var regg = /\s/;
        if (regg.exec(value.substring(0, 1)) != null || regg.exec(value.substring(value.length - 1, value.length)) != null) {
            return "姓名长度为4-20个字符，只能为汉字、字母、空格，不能以空格开头和结尾";
        }
    },
    //身份证号
    idCard: function (value, msg) {
        return isCardID(value);
    },
    //手机号码
    isMobile: function (value, msg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return msg;
        }
    }
}
//策略类存储验证信息
var Validator = function () {
    this.cache = [];
}
//添加验证信息
Validator.prototype.add = function (dom, rules) {
    var __self = this;
    for (var i = 0, rule; rule = rules[i++];) {
        (function (rule) {
            var ary = rule.strategy.split(":");
            __self.cache.push(function () {
                var strategy = ary.shift();
                ary.unshift(dom.value);
                ary.push(rule.msg);
                return strategies[strategy].apply(dom, ary);
            })
        })(rule)
    }
}
Validator.prototype.addConfirmPassword = function (dom, dom2, rules) {
    var __self = this;
    for (var i = 0, rule; rule = rules[i++];) {
        (function (rule) {
            var ary = rule.strategy.split(":");
            __self.cache.push(function () {
                var strategy = ary.shift();
                ary.unshift(dom2.value);
                ary.unshift(dom.value);
                ary.push(rule.msg);
                return strategies[strategy].apply(dom, ary);
            })
        })(rule)
    }
}
//执行验证
Validator.prototype.start = function () {
    for (var i = 0, fn; fn = this.cache[i++];) {
        var errMsg = fn();
        if (errMsg) {
            return errMsg;
        }
    }
}


//身份证验证函数
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

//3.代理模式 （图片的惰性加载）
var singleImg = (function () {
    return function (imgNode, src) {
        imgNode.attr('src', src);
        return imgNode;
    }
})();
var proxyImg = (function () {
    var img = new Image;
    img.onload = function () {
        singleImg(this.imgNode, this.src);
    }
    return function (src, onloadSrc, imgNode) {
        singleImg(imgNode, onloadSrc);
        img.src = src;
        img.imgNode = imgNode;
    }
})()

//4.订阅模式 (登录信息的获取)

//全局订阅
var Event = (function () {
    var clientList = {},
        listen,    //订阅
        trigger,   //发布
        remove     //取消订阅
    listen = function (key, fn) {
        if (!clientList[key]) {
            clientList[key] = []
        }
        clientList[key].push(fn);
    }
    trigger = function () {
        var key = Array.prototype.shift.call(arguments),
            fns = clientList[key];
        if (!fns || fns.length == 0) {
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    }
    remove = function (key, fn) {
        var fns = clientList(key);
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn = fn) {
                    fns.splice(l, 1);
                }
            }
        }
    }
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})()
//登录订阅
var login = (function () {
    //成功订阅
    Event.listen('loginSucc', function (data) {
        login.setName(data.UserName);
        login.setSession(data);
    });
    //失败订阅
    Event.listen('loginOut', function (data) {
        login.removeSession(data);
    })
    return {
        setName: function (name) {
            $("#loginNameShow").html(name);
        },
        setSession: function (data) {
            HB.Security.PassportId(data.PassportId);
            HB.Security.LoginName(data.LoginName);
            HB.Security.RealName(data.UserName);
        },
        removeSession: function (data) {
            window.sessionStorage.removeItem('PassportId');
            window.sessionStorage.removeItem('LoginName');
            window.sessionStorage.removeItem('RealName');
        }
    }
})()


