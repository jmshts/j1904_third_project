function dateCount(arg, addDay) {
    var date1 = arg;
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + parseInt(addDay));
    var times = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
    return (times);
}
//go - btn
$(function () {
    var nowHeight = 0;
    $('.go-btn').click(function () {
        $("html,body").animate({
            scrollTop: nowHeight
        }, 1000);
    });
});
$(function () {
    //	footer Position
    ab();
    //	content css3
    var aaa = window.location.href;
    aaa = aaa.replace(/^http:\/\/[^/]+/, "");
    var bbb = aaa.substr(aaa.lastIndexOf('/', aaa.lastIndexOf('/') - 1) + 1);
    var index = bbb.lastIndexOf("\/");
    var str = bbb.substring(index, bbb.length);
    var ccc = bbb.replace(str, "");
    //判断是否支持css3 animation
    if (supportCss3('animation')) {
        if (ccc != "person") {
            $(".content").addClass("animated fadeInLeft");
        } else {
            $(".content").find(".person-wapper-left").addClass("animated fadeInLeft");
            $(".content").find(".person-wapper-right").addClass("animated fadeInRight");
        }
    }
});

function supportCss3(style) {
    var prefix = ['webkit', 'Moz', 'ms', 'o'],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function (string) {
            return string.replace(/-(\w)/g, function ($0, $1) {
                return $1.toUpperCase();
            });
        };

    for (i in prefix)
        humpString.push(_toHumb(prefix[i] + '-' + style));

    humpString.push(_toHumb(style));

    for (i in humpString)
        if (humpString[i] in htmlStyle) return true;

    return false;
}

//footer position
$(window).resize(function () {
    ab();
});
var ab = function () {
    var section = $(".content").height();
    var winheight = $(window).height();
    $("#bottomStyle").css("min-height", winheight-50-204);
    if ($(".content").length != 0) {
        if (section <= (winheight - 133 - 62 - 50)) {
            $(".index-copyright").css({
                "position": "inherit",
                "bottom": "0",
                "width": "100%"
            })
        } else {
            $(".index-copyright").css({
                "position": "inherit",
            });
        }
    }
}
//公共select框
$(function () {
    $(".public-select,public-select-specSmall").click(function () {
        //火狐需要获取event对象
        var event = document.all ? window.event : arguments[0] ? arguments[0] : event;
        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
        $(this).find(".option").toggle();
        $(this).parent().siblings().find(".option").hide();
    });
    $(document).click(function (event) {
        var eo = $(event.target);
        if ($(".public-select").is(":visible") && eo.attr("class") != "option" && !eo.parent(".option").length)
            $('.public-select .option').hide();
    });
    /*赋值给文本框*/
    /*$(".public-select .option a").click(function() {
        var value = $(this).text();
        $(this).parent().siblings(".select-text").text(value);
        $("#select_value").val(value);
    });*/
    $('.public-select .option').on('click', 'a', function () {
        var value = $(this).text();
        $(this).parent().siblings(".select-text").text(value);
        $("#select_value").val(value);
        if ($(this).text().indexOf("请选择") == 0) {
            $(this).parent().prev().css("color", "#B1B1B1");
        } else {
            $(this).parent().prev().css("color", "#4A4A4A");
        }
    })
    $(".select-text").each(function () {
        if ($(this).text().indexOf("请选择") == 0) {
            $(this).css("color", "#B1B1B1");
        } else {
            $(this).css("color", "#4A4A4A");
        }
    });
});
$(function () {
    //			科室医生
    $(".dept-docList ul").find("li").each(function () {
        if ($(this).find("div span").text().length > 21) {
            $(this).find("div span").text($(this).find("div span").text().substring(0, 21) + "...");
        }
    });
});

////定时刷新session
//setInterval(function () {
//    $.ajax({
//        url: "Account/HasUserSession",
//        method: 'POST',
//        data: { PassportId: "" },
//        dataType: 'json',
//        success: function (data) {
//            if (HB.IsSucess(data)) {
//                //ar dataObj = data.r; //返回的result为json格式的数据                   //此处不通
//            }
//        }
//    });
//}, 600000);


//兼容360极速模式下弹框不获取焦点
$(document).ready(function () {
    if ($(".mask-shadow")) {
        $(".mask-shadow").focus();
    }
})

function Tongji(string, char) {
    var index = 0, index1 = 0, count = 0;
    for (var i = 0; i < string.length && (index1 != -1) ; i++) {
        index1 = string.indexOf(char, index);
        index = index1 + 1;
        count = i;
    }
    return count;
}
function escape2Html(str) {
    var arrEntities = { 'lt': '<', 'gt': '>', 'amp': '&', 'quot': '"' };
    return str.replace(/&(lt|gt|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
}


//根据标识读取cms内容公共方法
function GetCms(biaoshi, callback) {
    var request = {
        CallIndex: $("#HospitalId").val() + biaoshi
    };
    HB.Query("cms/getmorearticleoneinfo", request, function (ar, response) {
        if (ar.AjaxStatus) {
            if (HB.IsSucess(response)) {
                var datas = response.ResultData;
                callback(datas);
            }
            else {
                HB.MessageError(response.Message);
            }
        }
        else {
            HB.MessageError(response);
        }
    });
}
//根据标识读取cms内容公共方法
//如果医生有对应的cms内容读医生的内容，医生没有读科室，科室没有读医院的。
function GetCms2(biaoshi, departmentid, doctorid, callback) {
    var request = {
        callindex: biaoshi,//HB.DefaultHospitalCode() + "_guides_0001",
        DoctorId: doctorid,
        DepartmentId: departmentid,
        HospitalId: $("#HospitalId").val()
    };
    HB.Query("cms/getarticleoneinfo", request, function (ar, response) {
        if (ar.AjaxStatus) {
            if (HB.IsSucess(response)) {
                callback(response.ResultData);
            }
            else {
                //HB.MessageError(response.Message);
            }
        }
        else {
            HB.MessageError(response);
        }
    });
}
//省
function getProvince(callback) {
    HB.Query("Management/GetProvinceForSelect", { Id: "" }, function (ar, response) {
        if (ar.AjaxStatus) {
            if (HB.IsSucess(response)) {
                var prList = "";
                for (var i = 0; i < response.ResultData.length; i++) {
                    prList += ("<a data-id=\'" + response.ResultData[i].Id + "\'>" + response.ResultData[i].Text + "</a>");
                }
                callback(prList);
            }
            else {
                HB.MessageError(response.Message);
            }
        }
        else {
            HB.MessageError(response.Message);
        }
    });
};
//市
function getCity(ele, callback) {
    HB.Query("Management/GetCityForSelect", { Id: ele }, function (ar, response) {
        if (ar.AjaxStatus) {
            if (HB.IsSucess(response)) {
                var cityList = "";
                for (var i = 0; i < response.ResultData.length; i++) {
                    cityList += ("<a data-id=\'" + response.ResultData[i].Id + "\'>" + response.ResultData[i].Text + "</a>");
                }
                callback(cityList);
            }
            else {
                HB.MessageError(response.Message);
            }
        }
        else {
            HB.MessageError(response.Message);
        }
    });
};
//区
function getCounty(ele, callback) {
    HB.Query("Management/GetCountyForSelect", { Id: ele }, function (ar, response) {
        if (ar.AjaxStatus) {
            if (HB.IsSucess(response)) {
                var districtList = "";
                for (var i = 0; i < response.ResultData.length; i++) {
                    districtList += ("<a data-id=\'" + response.ResultData[i].Id + "\'>" + response.ResultData[i].Text + "</a>");
                }
                callback(districtList);
            }
            else {
                HB.MessageError(response.Message);
            }
        }
        else {
            HB.MessageError(response.Message);
        }
    });
};
//通用发布订阅
var events = {
    clientList: [],
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if (!fns || fns.length == 0) {
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    },
    remove: function (key, fn) {
        var fns = this.clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length == 0);
        } else {
            for (var i = fns.length - 1; i >= 0; i--) {
                if (fns[i] === fn) {
                    fns.splice[i, 1];
                }
            }
        }
    }
}
var installEvent = function (obj) {
    for (var i in events) {
        obj[i] = events[i];
    }
}