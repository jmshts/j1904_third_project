$(function () {
    //function login() {
    //    var loginStr = "";
    //    loginStr += ("<div id=\'login\' onkeydown=\"keyLogin()\" class=\'mask-shadow is-visible\'>");
    //    loginStr += ("<div class=\'bgshadow\'></div>");
    //    loginStr += ("	<div class=\'mydialog mydialogs animated bounceInDown\'>");
    //    loginStr += ("		<div class=\'login\'>");
    //    loginStr += ("			<h4>登录<a class=\'float-right\'><img src=\"/Content/images/login/close.png\"></a></h4>");
    //    loginStr += ("			<form class=\'\' name=\'form1\' id=\'form1\' method=\'post\'>");
    //    loginStr += ("				<div class=\'warnings\'>");
    //    loginStr += ("					<img class=\'res-warning\' src=\'/Content/images/warning.png\'> <p class=\'warning-cont\'></p>");
    //    loginStr += ("				</div>");
    //    loginStr += ("				<div class=\'controls\'>");
    //    loginStr += ("					<img class=\'login-img\' src=\'/Content/images/login/users.png\'><input class=\'largeInput\' name=\'LoginName\' id=\'LoginName\' maxlength=\'50\' placeholder=\'手机号/身份证号\' type=\'text\' value=\'\'>");
    //    loginStr += ("				</div>");
    //    loginStr += ("				<div class=\'controls\'>");
    //    loginStr += ("					<img class=\'login-img\' src=\'/Content/images/login/password.png\'><input class=\'largeInput\' maxlength=\"16\" name=\'Password\' id=\'Password\' placeholder=\'密码\' type=\'password\'>");
    //    loginStr += ("				</div>");
    //    loginStr += ("				<div class=\'controls\'>");
    //    loginStr += ("					<img class=\'login-img\' src=\'/Content/images/login/code.png\'><input id=\"verifycode\" class=\'defaultInput\' placeholder=\'验证码\' type=\'text\' name=\'VerifyCode\' maxlength=\'4\'>");
    //    loginStr += ("					<img id=\"valiCode\" class=\"checkImg\" src=\"/Account/GetValidateCode\" onclick=\"ClickRemoveChangeCode();\" />");
    //    loginStr += ("				</div>");
    //    loginStr += ("				<div class=\'specil-controls\'>");
    //    loginStr += ("					<span class=\'float-left\'><a class=\'login-hover\' href=\'/Account/FindPassword\'>忘记密码？</a></span>");
    //    loginStr += ("					<span class=\'float-right\'><a class=\'login-hover\' href=\'/Account/PhoneRegister\' id=\'jump-register\'>注册</a></span>");
    //    loginStr += ("				</div>");
    //    loginStr += ("				<div class=\'controls\'>");
    //    loginStr += ("					<button class=\'login-btn btnAnimate\' value=\'登录\' onclick=\'LoginGo()\'  type=\'button\'>登录</button>");
    //    loginStr += ("				</div>");
    //    loginStr += ("			</form>");
    //    loginStr += ("		</div>");
    //    loginStr += ("	</div>");
    //    loginStr += ("</div>");
    //    $("body").append(loginStr);
    //    $(".warnings").hide();
    //    $(".mask-shadow .mydialog .login h4 a").click(function () {
    //        $(".mydialog").removeClass("bounceInDown").addClass("bounceOutDown");
    //        setTimeout(function () {
    //            $("body").find("#login").remove();
    //        }, 1000);
    //    });
    //    $("#jump-register").click(function () {
    //        $(".mydialog").removeClass("bounceInDown").addClass("bounceOutDown");
    //        setTimeout(function () {
    //            $("body").find("#login").remove();
    //        }, 1000);
    //        setTimeout(function () {
    //            register();
    //        }, 1000);

    //    });
    //    var mgt = $(".mydialogs").innerHeight() / 2;
    //    $(".mydialogs").css('margin-top', (-mgt) + 'px');
    //}
    ////$(".nav-reg").click(function () {
    ////    window.location.href = '/Account/PhoneRegister';
    ////});
    ////$(".nav-login").click(function () {
    ////    login();
    ////});



    function appointStatus(a) {
        var appointRight = "";

        if (a == "1") {
            appointRight += ("<div id=\'appointStatus\' class=\'mask-shadow is-visible\'>");
            appointRight += ("	<div class=\'bgshadow\'></div>");
            appointRight += ("	<div class=\'mydialog animated bounceInDown\'>");
            appointRight += ("		<div class=\'appoint\'>");
            appointRight += ("			<h4>预约状态</h4>");
            appointRight += ("			<div class=\'status\'>");
            appointRight += ("				<i class=\'right\'></i>");
            appointRight += ("				<span>预约成功</span>");
            appointRight += ("			</div>");
            appointRight += ("			<div class=\'info\'>");
            appointRight += ("				<div class=\'controls\'>");
            appointRight += ("					<p><label>流水号：</label><span>857617611454878851</span></p>");
            appointRight += ("				</div>");
            appointRight += ("				<div class=\'controls\'>");
            appointRight += ("					<p><label>预约医院：</label><span>西电集团医院</span></p>");
            appointRight += ("				</div>");
            appointRight += ("				<div class=\'controls\'>");
            appointRight += ("					<p><label>预约科室：</label><span>骨科</span></p>");
            appointRight += ("				</div>");
            appointRight += ("				<div class=\'controls\'>");
            appointRight += ("					<p><label>号别名称：</label><span>专家尚宝生</span></p>");
            appointRight += ("				</div>");
            appointRight += ("				<div class=\'controls\'>");
            appointRight += ("					<p><label>护士台刷卡：</label><span>2016-07-12 上午</span></p>");
            appointRight += ("				</div>");
            appointRight += ("				<div class=\'controls\'>");
            appointRight += ("					<p><button id=\'submit1\' type=\'button\'>查看我的预约</button><span>请前往医院取号</span></p>");
            appointRight += ("				</div>");
            appointRight += ("			</div>");
            appointRight += ("		</div>");
            appointRight += ("	</div>");
            appointRight += ("</div>");
        } else {
            appointRight += ("<div id=\'appointStatus\' class=\'mask-shadow is-visible\'>");
            appointRight += ("	<div class=\'bgshadow\'></div>");
            appointRight += ("	<div class=\'mydialog fail-mydialog fail animated bounceInDown\'>");
            appointRight += ("		<div class=\'appoint\'>");
            appointRight += ("			<h4>预约状态</h4>");
            appointRight += ("			<div class=\'status\'>");
            appointRight += ("				<i class=\'fail\'></i>");
            appointRight += ("				<span>预约失败</span>");
            appointRight += ("			</div>");
            appointRight += ("			<div class=\'info\'>");
            appointRight += ("				<div class=\'controls\'>");
            appointRight += ("					<p><span>预约失败，同一个医生同一午别最多只能预约1次，您已超出最大限制！</span></p>");
            appointRight += ("				</div>");
            appointRight += ("				<div class=\'controls\'>");
            appointRight += ("					<p class=\'text-center\'><button type=\'button\' id=\'submit\'>再次预约</button></p>");
            appointRight += ("				</div>");
            appointRight += ("			</div>");
            appointRight += ("		</div>");
            appointRight += ("	</div>");
            appointRight += ("</div>");
        }

        $("body").append(appointRight);
        $("#submit").click(function () {
            $(".mydialog").removeClass("bounceInDown").addClass("bounceOutDown");
            setTimeout(function () {
                $("body").find("#appointStatus").remove();
            }, 1000);
        });
        $("#submit1").click(function () {
            $(".mydialog").removeClass("bounceInDown").addClass("bounceOutDown");
            setTimeout(function () {
                window.location = "InlinePay.html";
            }, 1000);
        });
    }
    $("#submitAppoint").click(function () {

        appointStatus($("#submitAppoint").val());
    });
    $("#addPatient").click(function () {
        addPatients();
    });

    function addPatients() {
        var addPatient = "";

        addPatient += ("<div class=\'mask-shadow is-visible\' id=\'addPatientDialog\'>");
        addPatient += ("	<div class=\'bgshadow\'></div>");
        addPatient += ("	<div class=\'mydialog addPatientDialog animated bounceInDown\'>");
        addPatient += ("		<div class=\'public\'>");
        addPatient += ("			<h4>添加就诊人<a class=\'float-right\'>X</a></h4>");
        addPatient += ("			<form class=\'big-form\' name=\'\' id=\'\' method=\'post\'>");
        addPatient += ("				<div class=\'controls\'> ");
        addPatient += ("					<label>用户类型:</label>");
        addPatient += ("					<ol id=\'userType\'>");
        addPatient += ("						<li class=\'active\'>");
        addPatient += ("							<em>成人</em><i></i>");
        addPatient += ("						</li>");
        addPatient += ("						<li>");
        addPatient += ("							<em>儿童</em><i></i>");
        addPatient += ("						</li>");
        addPatient += ("					</ol>");
        addPatient += ("				</div>");
        addPatient += ("				<div class=\'controls\'> ");
        addPatient += ("					<label>姓名:</label>");
        addPatient += ("					<input class=\'largeInput\' name=\'\' id=\'\' placeholder=\'请输入姓名\' type=\'text\' /> ");
        addPatient += ("				<div id=\'\' class=\'public-info\'>请输入姓名</div>");
        addPatient += ("				</div>");
        addPatient += ("				<div class=\'controls\'> ");
        addPatient += ("					<label>性别:</label>");
        addPatient += ("					<ol id=\'sex\'>");
        addPatient += ("						<li class=\'active\'>");
        addPatient += ("							<em>到院支付</em><i></i>");
        addPatient += ("						</li>");
        addPatient += ("						<li>");
        addPatient += ("							<em>在线支付</em><i></i>");
        addPatient += ("						</li>");
        addPatient += ("					</ol>");
        addPatient += ("				</div>");
        addPatient += ("				<div class=\'controls\'> ");
        addPatient += ("					<label>证件类型:</label>");
        addPatient += ("					<input class=\'largeInput\' name=\'\' id=\'\' value=\'身份证\' disabled=\'disabled\' type=\'text\' /> ");
        addPatient += ("				</div>");
        addPatient += ("				<div class=\'controls\'> ");
        addPatient += ("					<label>证件号码:</label>");
        addPatient += ("					<input class=\'largeInput\' name=\'\' id=\'\' placeholder=\'跟就诊卡关联的证件号码\' type=\'text\' /> ");
        addPatient += ("				</div>");
        addPatient += ("				<div class=\'controls\'> ");
        addPatient += ("					<label>手机号码:</label>");
        addPatient += ("					<input class=\'largeInput\' name=\'\' id=\'\' placeholder=\'用于接受预约短信，请谨慎\' type=\'text\' /> ");
        addPatient += ("				</div>");
        addPatient += ("				<div class=\'controls\'> ");
        addPatient += ("					<label>出生日期:</label>");
        addPatient += ("					<input id=\'birthDate\' class=\'Wdate largeInput\' type=\'text\' onfocus=\'WdatePicker({minDate:\"1900-01-01\",maxDate:\"%y-%M-%d\"})\' />");
        addPatient += ("				</div>");
        addPatient += ("				");
        addPatient += ("				<div class=\'controls text-center\'> ");
        addPatient += ("					<button type=\'button\' class=\'public-btn dis-inline-block saveAddPatient\'>保存</button>");
        addPatient += ("				</div>");
        addPatient += ("			</form>");
        addPatient += ("		</div>");
        addPatient += ("	</div>");
        addPatient += ("</div>");
        $("body").append(addPatient);
        $(".addPatientDialog .public h4 a").click(function () {
            $(".mydialog").removeClass("bounceInDown").addClass("bounceOutDown");
            setTimeout(function () {
                $("body").find("#addPatientDialog").remove();
            }, 1000);
        });
        $("#userType,#sex").find("li").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
        });
    }



});

//登陆相关
function LoginGo() {
    var result = loginValidate();
    var LoginName = document.getElementById("LoginName").value;
    var Password = document.getElementById("Password").value;
    var VerifyCode = document.getElementById("verifycode").value;
    var LoginIp = 'http://localhost:61751/';
    var Data = { LoginName: LoginName, Password: $.md5(Password), PassportId: "00000000-0000-0000-0000-000000000000", LoginIp: LoginIp, PushKey: '', VerifyCode: VerifyCode };
    if (!result) {
        //ClickRemoveChangeCode();
        return false;
    } else {
        //$.ajax({
        //    url: "/Personal/HasUserSession",
        //    method: 'POST',
        //    data: { PassportId: "111" },
        //    dataType: 'json',
        //    success: function (data) {
        //        var dataObj = data; //返回的result为json格式的数据
        //    }
        //});
        HB.Query("account/login", Data, function (ajaxstatus, response) {
            if (ajaxstatus.AjaxStatus) {
                if (HB.IsSucess(response)) {
                    HB.Security.PassportId(response.ResultData.PassportId);
                    HB.Security.LoginName(response.ResultData.LoginName);
                    HB.Security.RealName(response.ResultData.UserName);
                    $(".mydialog").removeClass("bounceInDown").addClass("bounceOutDown");
                    setTimeout(function () {
                        $("body").find("#login").remove();
                    }, 1000);
                    $(".warnings").hide();
                    $("#personalWelcome").css('display', 'block');
                    $("#loginButton").hide();
                    $("#loginNameShow").html(response.ResultData.UserName);
                    $("#centerButton").show();

                    if (window.location.pathname == "../Account/Login") {
                        //window.location.href = "/Home/Index";
                    }
                }
                else {
                    $(".warning-cont").html(response.Message);
                    $(".warnings").show();
                    //$("#idc_loginbutton").html("登录").removeAttr("disabled");
                    //$(".warning-cont").html("登录失败！");
                    //$(".warnings").show();
                    ClickRemoveChangeCode();
                }
            }
            else {
                //HB.MessageError(response);
                ClickRemoveChangeCode();
                // $("#idc_loginbutton").html("登录").removeAttr("disabled");
                $(".warning-cont").html(response);
                $(".warnings").show();
            }
        });
    }
}
function loginValidate() {
    var LoginName = document.getElementById("LoginName").value;
    var Password = document.getElementById("Password").value;
    var Verifycode = document.getElementById("verifycode").value;
    //用户名验证
    if (LoginName == "") {
        $(".warning-cont").html("请输入登录账号！");
        $(".warnings").show();
        return false;
    }
    if (Password == "") {
        $(".warning-cont").html("请输入登录密码！");
        $(".warnings").show();
        return false;
    }
    if (Verifycode == "") {
        $(".warning-cont").html("请输入验证码！");
        $(".warnings").show();
        return false;
    }

    return true;
}

function LoginOut() {
    var Data = {};
    HB.Query("account/loginout", Data, function (ajaxstatus, response) {
        if (ajaxstatus.AjaxStatus) {
            window.sessionStorage.removeItem('PassportId');
            window.sessionStorage.removeItem('LoginName');
            window.sessionStorage.removeItem('RealName');
            $("#personalWelcome").css('display', 'none');
            $("#loginButton").show();
            $("#centerButton").hide();
            $("#loginNameShow").html("");

            window.location.href = "../Home/Index";
        }
    });
}

function ClickRemoveChangeCode() {
    document.getElementById("valiCode").src = "../Account/GetValidateCode?time=" + (new Date()).getTime();
}
function keyLogin() {
    if (event.keyCode == 13) {
        $(".login-btn").click();
    }
}