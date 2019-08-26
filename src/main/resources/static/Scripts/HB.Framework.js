/*
	命名空间声明
*/
var HB = {};

HB.Framework = {}

//#region API设置
HB.Framework.ApiSetting = {
    BaseURL: "",
    ApiRoot: "/api/hbapi/"
}

//#endregion

//#region 数字签名模型勿动
HB.Framework.Sign = function (signedmodel) {
    return (function (model) {
        var sign = {
            ChannelId: HB.Security.ChannelId(),
            Sign: "我叫签名",
            Token: "",
            PassportId: ""
        }
        return sign;
    })(signedmodel);
}
//#endregion

//#region API命名空间
HB.Framework.Api = {};
//#endregion



//#region 数字签名
HB.Framework.Api.Sign = function (model) {
    var sign = HB.Framework.Sign(model);
    return $.extend(sign, model);
}
//#endregion


//#region 构造请求路径
HB.Framework.Api.CreatePath = function (path) {
    var extstr = "?";
    if (path.indexOf("?") != -1) {
        extstr = "&";
    }
    return HB.Framework.ApiSetting.BaseURL + HB.Framework.ApiSetting.ApiRoot + path + extstr + "hbsign=" + new Date().valueOf();
}
//#endregion


//#region API请求（POST）
HB.Framework.Api.Query = function (path, request, callback) {
    //转圈动画
    var content = $(".btnAnimate").html();
    $.ajax({
        type: "POST",
        async: true,
        url: HB.Framework.Api.CreatePath(path),
        data: HB.Framework.Api.Sign(request),
        success: function (response) {
            HB.Framework.Api.EndQuery();
            callback({ AjaxStatus: true }, response);
            $(".btnAnimate").removeAttr("disabled");
        },
        error: function (response) {
            if (response == "undefined") {
                response = "";
            }
            HB.Framework.Api.EndQuery();
            callback({ AjaxStatus: false }, response.responseText);
            $(".btnAnimate").removeAttr("disabled");
        },
        beforeSend: function () {
            $(".btnAnimate").attr('disabled', "true");
            HB.Framework.Api.StartQuery();
        },
        complete: function () {
            //$(".btnAnimate").html(content);
            $(".btnAnimate").removeAttr("disabled");
            HB.Framework.Api.EndQuery();
        }
    });
}

//#endregion

//#region API请求动画
HB.Framework.Api.StartQuery = function () {
    var mask = $("#IDC_AJAXMASK");
    var loading = $("#IDC_LOADING");
    if (mask.length == 0) {
        mask = $('<div id="IDC_AJAXMASK"></div>');
        loading = $('<div id="IDC_LOADING"></div>');
        $(document.body).append(mask);
        $(document.body).append(loading);
    }
    mask.show();
    loading.show();
}
HB.Framework.Api.EndQuery = function () {
    $("#IDC_AJAXMASK").hide();
    $("#IDC_LOADING").hide();
}
//#endregion
//带圈的按钮请求


//#region API请求
HB.Query = HB.Framework.Api.Query;

HB.IsSucess = function (response) {
    return response.ResultCode === 1;
}
//#endreion


//#region 选择框
HB.PopSelect = function (options, callback) {
    var ps = $("#idc_activepopselect");
    var mask = $("#idc_activepopselect-mask");
    if (ps.length == 0) {
        ps = $('<div id="idc_activepopselect" class="hb-popselect"></div>');
        mask = $('<div id="idc_activepopselect_mask" class="hb-popselect-mask"></div>');
        $(document.body).append(mask);
        $(document.body).append(ps);
    }
    else {
        ps.html("");
    }
    var defoptions = {
        title: "",
        selectedvalue: null,
        valuefield: "value", textfield: "text", template: function (data, options) {
            var item = $('<div class="hb-popselect-itemdata"></div>');
            item.html(data[options.textfield]);
            return item;
        },
        showcommand: true,
        showtitle: false
    };
    options = $.extend(defoptions, options);
    if (options.showtitle && options.title != "") {
        ps.append($('<div class="hb-popselecttitle">' + options.title + '</div>'));;
    }
    if (options.showcommand === true) {
        var cancel = $('<div class="hb-popselecbutton hb-popselecbutton-cancel">取消</div>');
        var ok = $('<div class="hb-popselecbutton hb-popselecbutton-ok">确定</div>');
        ok.click(function () {
            $("#idc_activepopselect").remove();
            $("#idc_activepopselect_mask").remove();
            callback(options.selected);
            delete options;//

        });
        cancel.click(function () {
            $("#idc_activepopselect").remove();
            $("#idc_activepopselect_mask").remove();
        });
        var commandcontent = $('<div class="hb-popselectcommand"><div>');
        commandcontent.append(cancel);
        commandcontent.append(ok);
        ps.append(commandcontent);
    }
    var templatefunction = options.template;
    if (options.selectedvalue == null && options.datas.length > 0) {
        options.selectedvalue = options.datas[0][options.valuefield];
    }
    var items = $('<div class="hb-popselect-items"></div>');
    ps.append(items);
    if (options.datas.length > 0) {
        $.each(options.datas, function (i, data) {
            var item = $('<div class="hb-popselect-item"></div>');
            var selectedvalue = data[options.valuefield];
            item.attr("hb_value", data[options.valuefield]);
            item.attr("hb_text", data[options.textfield]);
            item.append(options.template(data, options));
            if (selectedvalue == options.selectedvalue) {
                item.addClass("selected");
            }
            items.append(item);
            items.append($('<div class="hb-popselect-line"></div>'));
        });
    }
    else {
        items.append($('<div class="hb-popselect-item">无</div>'));
    }
    items.append($('<div class="hb-popselect-bottom"></div>'));

    if (options.showcommand === true) {
        $(".hb-popselect-item").click(function () {
            var value = $(this).attr("hb_value");
            var text = $(this).attr("hb_text");
            $(".hb-popselect-item").removeClass("selected");
            $(this).addClass("selected");
            options.selected = { value: value, text: text, element: this };
        });
    }
    else {
        $(".hb-popselect-item").click(function () {
            var value = $(this).attr("hb_value");
            var text = $(this).attr("hb_text");
            callback({ value: value, text: text, element: this });
            $("#idc_activepopselect").remove();
            $("#idc_activepopselect_mask").remove();
        });
    }
    $("#idc_activepopselect_mask").click(function () {
        $("#idc_activepopselect").remove();
        $("#idc_activepopselect_mask").remove();
    });

    var h = $(document.body).height();
    var psh = ps.height();
    if (psh > h * 0.4) {
        psh = h * 0.4;
        if (psh < 200) {
            psh = 200;
        }
        ps.height(psh);
    }
    var itemheight = psh - ps.find(".hb-popselecttitle").height() - ps.find(".hb-popselectcommand").height();
    items.height(itemheight);
    mask.show();
    ps.show(300);
}
HB.PopSex = function (callback, selectedvalue) {
    if (typeof (selectedvalue) == "undefined") {
        selectedvalue = "0";
    }
    HB.PopSelect({
        title: "性别选择",
        selectedvalue: selectedvalue,
        datas: [
            { text: "男", value: "Male" },
            { text: "女", value: "Female" },
            { text: "未知", value: "Unknow" }
        ]
    }, callback)
}
HB.PopIDType = function (callback, selectedvalue) {
    if (typeof (selectedvalue) == "undefined") {
        selectedvalue = "Unknown";
    }
    HB.PopSelect({
        title: "证件选择",
        selectedvalue: selectedvalue,
        datas: [
            { text: "身份证", value: "IDCard" },
            { text: "军官证", value: "OfficersCard" },
            { text: "护照", value: "Pasport" },
            { text: "出生证", value: "BirthCard" }
            //{ text: "未提供", value: "Unknown" }
        ]
    }, callback);
}

//#endregion
//#region 消息提示
HB.Message = function (msg, callback, tipclass, autoclose) {
    var msgbox = $("#IDC_MESSAGEBOX");
    var msgboxmask = $("#IDC_MESSAGEBOX_MASK");
    if (msgbox.length == 0) {
        msgbox = $('<div class="' + tipclass + '"><div class=\'errorMessageBox animated fadeInDown text-center\'>' + msg + '</div></div>');
        msgboxmask = $('<div id="IDC_MESSAGEBOX_MASK"></div>');
        $(document.body).append(msgbox);
        $(document.body).append(msgboxmask);
    }
    else {
        msgbox.attr("class", "");
        msgbox.addClass(tipclass);
        msgbox.html('<div class="' + tipclass + '"><div class=\'errorMessageBox animated fadeInDown text-center\'>' + msg + '</div></div>');
    }

    var msgcallback = callback;
    if (typeof (msgcallback) != "function") {
        msgcallback = function () { }
    }

    if (typeof (autoclose) == "number") {
        msgboxmask.click(function () {
            $("#IDC_MESSAGEBOX_MASK").hide();
            $("#IDC_MESSAGEBOX").hide(autoclose);
        });
        msgbox.show(300).delay(autoclose).slideUp(300, function () {
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

//HB.MessageErrorEnsure
//2017/08/05 wsl新增加HB.MessageErrorEnsure，带单个确定按钮
/*单按钮提示框*/
HB.MessageErrorEnsure = function (msg) {
    var str = "";
    str += ("<div class=\'mask-shadow is-visible public-popups\' id='MessageErrorEnsure' style=\'display: block;\'>");
    str += ("	<div class=\'bgshadow transShadow\'></div>");
    str += ("	<div class=\'public-dialog animated bounceInDown radio-dialog\' style='margin-top:-98px;box-shadow: 0px 0px 10px rgba(0,0,0,0.3);'>");
    str += ("		<div class=\'public-popup\'>");
    str += ("			<div class=\'public-popup-header\'>");
    str += ("				<img id='public-popup-close' class=\'public-popup-close\' src=\'/content/images/personalCenter/close.png\'>");
    str += ("			</div>");
    str += ("			<div class=\'public-popup-content\'>");
    str += ("				<p>" + msg + "</p>");
    str += ("			</div>");
    str += ("			<div class=\'public-popup-footer\'>");
    str += ("				<input class=\'btn-default btn-cancel btn-secondary\' id='canelThis' type=\'button\' value=\'确定\' />");
    str += ("			</div>");
    str += ("		</div>");
    str += ("	</div>");
    str += ("</div>");
    $(document.body).append(str);
    $("#canelThis,#public-popup-close").click(function () {
        $("#MessageErrorEnsure").remove();
    });
}
HB.MessageQuestionairEnsure = function (msg) {
    var str = "";
    str += ("<div class=\'mask-shadow is-visible public-popups\' id='MessageErrorEnsure' style=\'display: block;\'>");
    str += ("	<div class=\'bgshadow transShadow\'></div>");
    str += ("	<div class=\'public-dialog animated bounceInDown radio-dialog\' style='margin-top:-98px;'>");
    str += ("		<div class=\'public-popup\'>");
    str += ("			<div class=\'public-popup-header\'>");
    str += ("				<img id='public-popup-close' class=\'public-popup-close\' src=\'/content/images/personalCenter/close.png\'>");
    str += ("			</div>");
    str += ("			<div class=\'public-popup-content\'>");
    str += ("				<p>" + msg + "</p>");
    str += ("			</div>");
    str += ("			<div class=\'public-popup-footer\'>");
    str += ("				<input class=\'btn-default btn-cancel btn-secondary\' id='canelThis' type=\'button\' value=\'确定\' />");
    str += ("			</div>");
    str += ("		</div>");
    str += ("	</div>");
    str += ("</div>");
    $(document.body).append(str);
    $("#canelThis,#public-popup-close").click(function () {
        window.close();
    });
}

/*空内容提示*/
HB.Empty = function () {
    var str = ("<div id=\'EmptyHtml\' class=\'text-center dis-block public-contanier\'><img src=\'/Content/images/no_wifi.png\' /><p>未查询到相关信息</p></div>");  //lizimo 2017/08/14
    return str;
}
/*错误提示*/
HB.MessageError = function (msg, callback) {
    HB.Message(msg, callback, "errorMessage", 5000);
}
/*成功提示*/
HB.MessageSucess = function (msg, callback) {
    HB.Message(msg, callback, "successMessage", 2000);
}
//对话框
HB.MessageBox = function (msgops, callback) {
    if (typeof (msgops) == "string") {
        msgops = {
            message: msgops,
            onclick: callback
        }
    }
    if (typeof (msgops.onclick) == "undefined") {
        msgops.onclick = callback;
    }
    var mask = $('<div id="IDC_CONFIRMBOX_MASK" class="HB_MESSAGEBOX_MASK"></div>');
    var options = $.extend({
        message: "",
        isconfirm: false,
        button1: "确定",
        button2: "取消",
        button1result: true,
        button2result: false,
        onclick: function () { }
    }, msgops);
    var template = $('<div id="IDC_CONFIRMBOX" class="mui-popup mui-popup-in" style="display: block; z-index:99999;"></div>');
    var messagetemplate = $('<div class="mui-popup-inner"></div>');
    var messagecontext = $('<div class="mui-popup-title f15"></div>').html(options.message);
    var buttontemplate = $('<div class="mui-popup-buttons"></div>');
    var okbutton = $('<span class="mui-popup-button mui-popup-button-bold">' + options.button1 + '</span>');
    if (options.isconfirm) {
        var cancelbutton = $('<span class="mui-popup-button mui-popup-button-bold">' + options.button2 + '</span>');
        buttontemplate.append(cancelbutton);
        cancelbutton.click(function () {
            $("#IDC_CONFIRMBOX_MASK").remove();
            $("#IDC_CONFIRMBOX").remove();
            if (typeof (options.onclick) == "function") {
                options.onclick({ result: options.button2result, button: options.button2 });
            }
        });
    }
    messagetemplate.append(messagecontext);

    buttontemplate.append(okbutton);

    template.append(messagetemplate);
    template.append(buttontemplate);

    okbutton.click(function () {
        $("#IDC_CONFIRMBOX_MASK").remove();
        $("#IDC_CONFIRMBOX").remove();
        if (typeof (options.onclick) == "function") {
            options.onclick({ result: options.button1result, button: options.button1 });
        }
    });

    $(document.body).append(template);
    $(document.body).append(mask);
    mask.show();
    template.show();
}


/*绑定列表*/
HB.Bind = function ($control, datas, callback) {
    var template = $control.find(">.hb-dataview-template");
    $.each($control.children(), function (i, view) {
        var $view = $(view);
        if (!$view.hasClass("hb-dataview-template")) {
            $view.remove();
        }
    });
    $.each(datas, function (i, data) {
        var view = template.clone(true);
        view.removeClass("hb-dataview-template");
        var databindings = view.find(".databinding");
        var childview = view.find(".hb-dataview-template");
        var allchildsbindings = childview.find(".databinding");
        $.each(databindings, function (i, databinding) {

            var cl = allchildsbindings.length;
            for (var ci = 0; ci < cl; ci++) {
                if (allchildsbindings.get(ci) == databinding) {
                    return;
                }
            }
            var bindscript = databinding.innerHTML;
            var bindresult = "";
            try {
                var pos = bindscript.indexOf("{");
                if (pos != -1) {
                    var bindscript = (bindscript.substr(0, pos + 1) + "bindresult=" + bindscript.substr(pos + 1, bindscript.length - pos - 1));
                    eval(bindscript);
                }
                if (bindresult == null) {
                    bindresult = "";
                }
                databinding.innerHTML = bindresult;
            }
            catch (e) {
                //alert(e.message);
            }
        });

        callback(data, view);
        $control.append(view);
    });
    $control.append('<div style="clear:both;hieght:1px;background-color:transparent;"></div>');
}

/*绑定列表*/
HB.BindCallBack = function ($control, datas, callback, callEnd) {

    var template = $control.find(">.hb-dataview-template");
    $.each($control.children(), function (i, view) {
        var $view = $(view);
        if (!$view.hasClass("hb-dataview-template")) {
            $view.remove();
        }
    });
    $.each(datas, function (i, data) {
        var view = template.clone(true);
        view.removeClass("hb-dataview-template");
        var databindings = view.find(".databinding");
        var childview = view.find(".hb-dataview-template");
        var allchildsbindings = childview.find(".databinding");
        $.each(databindings, function (i, databinding) {

            var cl = allchildsbindings.length;
            for (var ci = 0; ci < cl; ci++) {
                if (allchildsbindings.get(ci) == databinding) {
                    return;
                }
            }
            var bindscript = databinding.innerHTML;
            var bindresult = "";
            try {
                var pos = bindscript.indexOf("{");
                if (pos != -1) {
                    var bindscript = (bindscript.substr(0, pos + 1) + "bindresult=" + bindscript.substr(pos + 1, bindscript.length - pos - 1));
                    eval(bindscript);
                }
                if (bindresult == null) {
                    bindresult = "";
                }

                databinding.innerHTML = bindresult;
            }
            catch (e) {
                //alert(e.message);
            }
        });

        if (i == 0) {
            $(view)[0].className = "mui-control-item mui-active";
        }

        callback(data, view);
        $control.append(view);

    });
    $control.append('<div style="clear:both;hieght:1px;background-color:transparent;"></div>');

    callEnd();
}

HB.BindPager = function ($control, datas, callback, oncallmore, totalcount, isrefresh) {
    var template = $control.find(".hb-dataview-template");
    if (typeof (isrefresh) == "undefined" || isrefresh != false) {
        $.each($control.children(), function (i, view) {
            var $view = $(view);
            if (!$view.hasClass("hb-dataview-template")) {
                $view.remove();
            }
        });
    }
    $control.find(".pageraction").remove();
    $.each(datas, function (i, data) {
        var view = template.clone(true);
        view.removeClass("hb-dataview-template");
        var databindings = view.find(".databinding");
        $.each(databindings, function (i, databinding) {
            var bindscript = databinding.innerHTML;
            var bindresult = "";
            try {
                var pos = bindscript.indexOf("{");
                if (pos != -1) {
                    var bindscript = (bindscript.substr(0, pos + 1) + "bindresult=" + bindscript.substr(pos + 1, bindscript.length - pos - 1));
                    eval(bindscript);
                }

                if (bindresult == null) {
                    bindresult = "";
                }
                databinding.innerHTML = bindresult;
            }
            catch (e) {
                //alert(e.message);
            }
        });
        callback(data, view);
        $control.append(view);
    });
    if (typeof (totalcount) != "undefined" && totalcount > 0) {
        if ($control.children().length - 1 >= totalcount) {
            $control.append('<div class="pageraction"><h5 class="mtp25 mb25 mui-text-center">暂时没有更多消息了哦~</h5></div>');
        }
        else {
            if (typeof (oncallmore) == "function") {
                var callmore = $('<h5 class="pageraction mtp25 mb25 mui-text-center">点击加载更多...</h5>');
                callmore.click(oncallmore);
                $control.append(callmore);
            }
        }
    }
    else {
        if ($control.children().length == 1) {
            $control.append('<div class="pageraction"><h5 class="mtp25 mb25 mui-text-center">暂时没有更多消息了哦~</h5></div>');
        }
    }
}
HB.Debug = function (title, msg) {
    if (typeof (msg) == "undefined") {
        console.log(title);
    }
    else {
        console.log(title + ":");
        console.log(msg);
    }
}
/*绑定数据*/
HB.DataBind = function ($control, data, callback) {
    var databindings = $control.find(".databinding");
    databindings.each(function (i, databinding) {
        var bindscript = $(databinding).attr("databinding");
        var bindresult = "";
        try {
            var pos = bindscript.indexOf("{");
            if (pos != -1) {
                bindscript = (bindscript.substr(0, pos + 1) + "bindresult=" + bindscript.substr(pos + 1, bindscript.length - pos - 1));
                eval(bindscript);
                if (bindscript == null) {
                    bindscript == "";
                }
                if (bindresult == null) {
                    bindresult = "";
                }
            }
            var tagname = databinding.tagName;
            switch (tagname) {
                case "INPUT":
                case "SELECT":
                case "TEXTAREA":
                    databinding.value = bindresult;
                    break;
                case "IMG":
                    databinding.src = bindresult;
                    break;
                default:
                    databinding.innerHTML = bindresult;
                    break;
            }
        }
        catch (e) {
            //alert(e.message);
        }
        if (typeof (callback) == "function") {
            callback(data, databinding);
        }
    });
}
//#endregion

//#region 获取 QueryString
/*通过名称获取 QueryString*/
HB.QueryString = function (name) {
    var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
HB.ZWQueryString = function (name) {
    var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return decodeURIComponent(result[1]);
}
//#endregion

//#region URL 返回堆栈
HB.BackUrl = null;
/*记录本地堆栈路径*/
HB.PushLocal = function () {
    Gax.VisitorStack.PushLocal();
}
/*设置框架页面按钮返回*/
HB.SetBack = function (urlaction, useback) {
    if (typeof (useback) == "undefined" || useback === false) {
        if (typeof (urlaction) != "undefined") {
            HB.BackUrl = urlaction;
        }
    }
}
/*页面返回*/
HB.Back = function () {
    Gax.VisitorStack.Back(HB.BackUrl);
}

HB.Previous = function (preAddress) {

}
//#endregion


//#region Proxytype Array exists
/*扩展  数据元素是否已存在*/
Array.prototype.exists = function (data, cmpfunc) {
    var bexists = false;
    var l = this.length;
    if (typeof (cmpfunc) == "function") {
        for (var i = 0; i < l; i++) {
            if (cmpfunc(this[i], data) === true) {
                bexists = true;
                break;
            }
        }
    }
    else {
        for (var i = 0; i < l; i++) {
            if (this[i] === data) {
                bexists = true;
                break;
            }
        }
    }
    return bexists;
}
//#endregion
//#region Proxytype Array first
/*扩展  获取指定元素*/
Array.prototype.first = function (data, cmpfunc) {
    var returnValue = null;
    var l = this.length;
    if (typeof (cmpfunc) == "function") {
        for (var i = 0; i < l; i++) {
            if (cmpfunc(this[i], data) === true) {
                returnValue = this[i];
                break;
            }
        }
    }
    else {
        for (var i = 0; i < l; i++) {
            if (this[i] === data) {
                returnValue = data;
                break;
            }
        }
    }
    return returnValue;
}
//#endregion
//#region String HtmlDecode
String.prototype.toHtml = function () {
    return this.replace(/&gt;/igm, ">").replace(/&lt;/igm, "<");
}
//#endregion

//#region Date DateFormat
Date.prototype.DateFormat = function (fmt) {
    var str = "";
    try {
        d = this;
        var yy = d.getFullYear();
        if (yy == 1) return "";
        var MM = (d.getMonth() + 1);
        if (MM < 10) MM = "0" + MM;
        var dd = d.getDate();
        if (dd < 10) dd = "0" + dd;
        var hh = d.getHours();
        if (hh < 10) hh = "0" + hh;
        var mm = d.getMinutes();
        if (mm < 10) mm = "0" + mm;
        var ss = d.getSeconds();
        if (ss < 10) ss = "0" + ss;
        fmt = fmt.replace("yyyy", yy);
        fmt = fmt.replace("MM", MM);
        fmt = fmt.replace("dd", dd);
        fmt = fmt.replace("HH", hh);
        fmt = fmt.replace("mm", mm);
        fmt = fmt.replace("ss", ss);
        return fmt;
    }
    catch (e) {
        return "";
    }
}
Date.prototype.ShortDateFormat2 = function () {
    return this.DateFormat("yyyy/MM/dd");
}
Date.prototype.ShortDateFormat = function () {
    return this.DateFormat("yyyy-MM-dd");
}
Date.prototype.GetDateTime = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0);
}
//#endregion


HB.DateFormat = function (strdate, fmt) {
    return new Date(strdate).DateFormat(fmt);
}

/*
图片加载，defaultImgUrl为不成功加载图
imgObj: 图片jQuery对象
imgUrl: 图片地址
defaultImgUrl: 图片加载不成功时加载的默认图片
*/
HB.ImgLoad = function (imgObj, imgUrl, defaultImgUrl) {
    if (imgUrl == null || imgUrl === "") {
        imgUrl = defaultImgUrl;
    }

    // 定义一个Image对象
    var img = new Image();

    // 为Image对象添加图片加载成功的处理方法

    img.onload = function () {
        imgObj.attr("src", imgUrl);
    };
    // 为Image对象添加图片加载失败的处理方法
    img.onerror = function () {
        //alert("图像加载失败");
        if (defaultImgUrl == null || defaultImgUrl == "") {
            imgObj.hide();
            return;
        }

        imgObj.attr("src", defaultImgUrl);
    }
    // 开始加载图片
    img.src = imgUrl;
}

//#region 设备交互
HB.UserDevice = {
    CallBack: null,
    GetKey: function (key, callback) {
        HB.UserDevice.CallBack = callback;
        switch (key) {
            case "DeviceId": getDeviceId(); break;
            default:
                getHBValue(key);
                break;
        }

    },
    SetKey: function (key, value) {
        switch (key) {
            case "DeviceId": break;
            default:
                setHBValue(key, value);
                break;
        }
    },
    Receive: function (key, value) {
        if (HB.UserDevice.CallBack != null) {
            HB.UserDevice.CallBack(key, value);
        }
    }
}

function onHBResult(key, value) {
    HB.UserDevice.Receive(key, value);
}

function getHBValue(key) {
    if (typeof (window.android) != "undefined" && typeof (window.android.getHBValue) == "function") {
        window.android.getHBValue(key);
    }
}
function setHBValue(key, value) {
    if (typeof (window.android) != "undefined" && typeof (window.android.setHBValue) == "function") {
        window.android.setHBValue(key, value);
    }
}
function setDeviceId(id) {
    HB.UserDevice.Receive("DeviceId", id);
}
function getDeviceId() {
    if (typeof (window.android) != "undefined" && typeof (window.android.getDeviceId) == "function") {
        window.android.getDeviceId();
    }
}

//#endregion

//#region Initialize
$(function () {
    $("input[type=text]").attr("autocomplete", "off");
});

(function () {
    try {
        if (HB.LocalSession("IsShowDebugRemark") == null) {
            console.log('如果你能看到这里，说明你懂的!\r\n如果发现BUG了请联系 smallaoao@126.com');
            HB.LocalSession("IsShowDebugRemark", true);
        }
    }
    catch (e) { }
})();
//#endregion


//#region 登录验证相关
HB.Security = {
    PassportId: function (id) {
        return HB.LocalSession("PassportId", id);
    },
    LoginName: function (name) {
        return HB.LocalSession("LoginName", name);
    },
    RealName: function (realname) {
        return HB.LocalSession("RealName", realname);
    },
    IsLogined: function () {
        return HB.Security.PassportId() != "" && HB.Security.PassportId() != null;
    },
    AutoLogined: function () {
        if (HB.Security.PassportId() != "" && HB.Security.PassportId() != null) {
            return true;
        }
        else {
            createLogin();
            $(".mydialog").removeClass("bounceOutDown").addClass("bounceInDown");
            $("body").find("#login").show();
            return false;
        }
    },
    ChannelId: function () {
        return document.getElementById("idc_channelId").value;
    },
}
HB.LocalSession = function (key, value) {
    if (window.sessionStorage) {
        if (typeof (value) == "undefined") {
            return window.sessionStorage.getItem(key);
        }
        else {
            window.sessionStorage.setItem(key, value);
        }
    }
}

/*var login = function() {
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
    loginStr += ("					<span class=\'float-right\'><a class=\'login-hover\' href=\'/Account/PhoneRegister\' id=\'jump-register\'>注册</a></span>");
    loginStr += ("				</div>");
    loginStr += ("				<div class=\'controls\'>");
    loginStr += ("					<button class=\'login-btn btnAnimate\' value=\'登录\' onclick=\'LoginGo()\'  type=\'button\'>登录</button>");
    loginStr += ("				</div>");
    loginStr += ("			</form>");
    loginStr += ("		</div>");
    loginStr += ("	</div>");
    loginStr += ("</div>");
    $("body").append(loginStr);

    if (RegistWay == "1") {
        $("#LoginName").attr("placeholder", "用户名/身份证号/邮箱");
    }
    else if (RegistWay == "2") {
        $("#LoginName").attr("placeholder", "手机号/身份证号");
    }
    else if (RegistWay == "1,2") {
        $("#LoginName").attr("placeholder", "手机号/邮箱/用户名/身份证");
    }
    $(".warnings").hide();
    $(".mask-shadow .mydialog .login h4 a").click(function () {
        $(".mydialog").removeClass("bounceInDown").addClass("bounceOutDown");
        setTimeout(function () {
            $("body").find("#login").remove();
        }, 1000);
    });
    $("#jump-register").click(function () {
        $(".mydialog").removeClass("bounceInDown").addClass("bounceOutDown");
        setTimeout(function () {
            $("body").find("#login").remove();
        }, 1000);
        setTimeout(function () {
            register();
        }, 1000);

    });
    var mgt = $(".mydialogs").innerHeight() / 2;
    $(".mydialogs").css('margin-top', (-mgt) + 'px');
}*/
//#endregion