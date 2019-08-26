function setCookie(name, value) {
    document.cookie = name + '=' + escape(value);
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        return null;
    }
}

//个人中心
$(function () {
    $(".nav-personal").parent(".nav-login-group").hover(function () {
            //					$(this).children(".nav-personal").find(".nav-personal-dropdown").css("display", "block");
            $(this).children(".nav-personal").find(".nav-personal-dropdown").show();
        },
        function () {
            //					$(this).children(".nav-personal").find(".nav-personal-dropdown").css("display", "none");
            $(this).children(".nav-personal").find(".nav-personal-dropdown").hide();
        });

    $(function () {
        //获取session
        //$("#personalWelcome").css('display', 'none');
        //$("#loginButton").show();
        //$("#centerButton").hide();
        HB.Query("account/getuserinfo", {}, function (ar, response) {
            if (ar.AjaxStatus) {
                if (HB.IsSucess(response)) {
                    HB.Security.PassportId(response.ResultData.PassportID);
                    HB.Security.LoginName(response.ResultData.LoginName);
                    HB.Security.RealName(response.ResultData.RealName);
                    $("#personalWelcome").css('display', 'block');
                    $("#loginButton").hide();
                    $("#centerButton").show();

                    $("#loginNameShow").html(response.ResultData.RealName);
                }
                else {
                    $("#personalWelcome").css('display', 'none');
                    $("#loginButton").show();
                    $("#centerButton").hide();
                }
            }
            else {
                $("#personalWelcome").css('display', 'none');
                $("#loginButton").show();
                $("#centerButton").hide();
            }
        });
    });

    //var passportId = window.sessionStorage.getItem("PassportId");
    //var loginName = window.sessionStorage.getItem("LoginName");
    //var realName = window.sessionStorage.getItem("RealName");
    //if (passportId != "" && passportId != null && passportId) {
    //    $("#personalWelcome").css('display', 'block');
    //    $("#loginButton").hide();
    //    $("#centerButton").show();

    //    if (loginName != "" && loginName != null && loginName != "undefined") {
    //        $("#loginNameShow").html(realName);
    //    }
    //}
    //else {
    //    $("#personalWelcome").css('display', 'none');
    //    $("#loginButton").show();
    //    $("#centerButton").hide();
    //}
});

//预约挂号
$(function () {
    $(".nav-bar>ul>li").hover(function () {
        $(this).addClass("active");

    }, function () {
        $(this).removeClass("active");
    });
    $("#nav-bar-yuyue").hover(function () {
            $(this).children(".drop-down").css("display", "block");
            $(this).find(".drop-down>ul>li").first().children(".nav-box").css("display", "block");
        },
        function () {
            $(this).children(".drop-down").css("display", "none");
        });
    $("#nav-bar-yuyue").find(".drop-down").mouseout(function () {
        $("#nav-bar-yuyue").find(".drop-down>ul>li").first().children(".nav-box").css("display", "block");
    });
    $("#nav-bar-yuyue").find(".drop-down>ul>li").hover(function () {
            $(this).addClass("active");
            $(this).children(".nav-box").css("display", "block");

        },
        function () {
            $(this).removeClass("active");
            $(this).children(".nav-box").css("display", "none");
        });
    $(".hos-box").children("span").hover(function () {
        $(this).addClass("active").siblings().removeClass("active");
        //刷科室
    });
    $(".depart-box").children("span").hover(function () {
        $(this).addClass("active").siblings().removeClass("active");
        //刷医生科室
    });
});
$(function () {
    $("#nav-bar-zixun").hover(function () {
            //						$(this).children(".floatBack").css("display", "block");
            $(this).children(".floatBack").show();
        },
        function () {
            $(this).children(".floatBack").hide();
            //						$(this).children(".floatBack").css("display", "none");
        });
    $("#nav-bar-search").hover(function () {
            $(this).children(".drop-down").css("display", "block");
            $(this).find(".drop-down>ul>li").first().children(".nav-box").css("display", "block");

        },
        function () {
            $(this).children(".drop-down").css("display", "none");
        });
    $("#nav-bar-search").find(".drop-down").mouseout(function () {
        $("#nav-bar-search").find(".drop-down>ul>li").first().children(".nav-box").css("display", "block");
    });
    $("#nav-bar-search").find(".drop-down>ul>li").hover(function () {
            $(this).addClass("active");
            $(this).children(".nav-box").css("display", "block");

        },
        function () {
            $(this).removeClass("active");
            $(this).children(".nav-box").css("display", "none");
        });
    $("#nav-bar-pay").find(".drop-down").mouseout(function () {
        $("#nav-bar-pay").find(".drop-down>ul>li").first().children(".nav-box").css("display", "block");
    });
    $("#nav-bar-pay").hover(function () {
            $(this).children(".drop-down").css("display", "block");
            $(this).find(".drop-down>ul>li").first().children(".nav-box").css("display", "block");

        },
        function () {
            $(this).children(".drop-down").css("display", "none");
        })
    $("#nav-bar-pay").find(".drop-down>ul>li").hover(function () {
            $(this).addClass("active");
            $(this).children(".nav-box").css("display", "block");

        },
        function () {
            $(this).removeClass("active");
            $(this).children(".nav-box").css("display", "none");
        });
});
//搜索
$(function () {
    $(".select_txt").text($(".select_box .option a").eq(0).text())
    $(".select_box").click(function (event) {
        event.stopPropagation();
        $(this).find(".option").toggle();
        $(this).parent().siblings().find(".select_box .option").hide();
    });
    $(document).click(function (event) {
        var eo = $(event.target);
        if ($(".select_box").is(":visible") && eo.attr("class") != "option" && !eo.parent(".option").length)
            $('.select_box .option').hide();
    });
    /*赋值给文本框*/
    $(".select_box .option a").click(function () {
        var value = $(this).text();
        $(this).parent().siblings(".select_txt").text(value);
        var SearchType = $(this).attr("id");
        $("#select_value").val(SearchType);
        $("#searchText").val("");

    });
});

$(function () {
    hospitalAreaList();//获取院区列表
    getGuides();
    getNewsList();
});

//获取就诊须知（根据医院id）
function getGuides() {
    //就诊须知
    GetCms2("jzxz", "", "", function (resultData) {

        var content = resultData.Content;
        if (content != null & content != "") {
            //#Introdution是医院主页的就诊须知
            //#org_guides是顶部导航栏的就诊须知，两个内容是一样的
            $("#org_guides,#Introdution").html(content);
        } else {
            $("#org_guides,##Introdution").html("");
        }
        $("#org_guides p,#org_guides span").attr("style", " ");

        //$("#org_guides").find("p").each(function () {
        //    $(this).attr("style", " ");
        //});
        //$("#org_guides").find("span").each(function () {
        //    $(this).attr("style", " ");
        //});
    });

}

//获取院区列表
function hospitalAreaList() {
    HB.Query("organization/getorganizationsbyid", { OrganizatonId: $("#idc_orgid").val() }, function (ar, response) {
        if (ar.AjaxStatus) {
            if (HB.IsSucess(response)) {
                var datas = response.ResultData;
                setCookie("orglist", JSON.stringify(datas));
                getorg(datas);
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

function getorg(datas) {
    var orgAreaStr = "";
    var firstOrg = "";
    var orglist = "";
    for (var i = 0; i < datas.length; i++) {
        if (datas.length == 1) {
            $(".hos-title").css("margin-top", "-10px");
            $(".depart-title").css("margin-top", "-10px");
            //$(".hos-title").remove();
            //$(".depart-title").remove();
        }
        else if (i == 0) {
            orgAreaStr += "<span class=\"active\" id=\"" + datas[i].OrganizationId + "\">" + datas[i].OrganizationName + "</span>";
        }
        else {
            orgAreaStr += "<span id=\"" + datas[i].OrganizationId + "\">" + datas[i].OrganizationName + "</span>";
        }
        firstOrg = datas[0].OrganizationId;
    }

    depDocList(firstOrg);//获取科室列表

    $("#orgArea_dep").html(orgAreaStr);
    $("#orgArea_doc").html(orgAreaStr);
    $("#orgArea_dep2").html(orgAreaStr);


    $("#orgArea_dep span,#orgArea_dep2 span").mouseover(function () {
        $("#orgArea_dep span,#orgArea_dep2 span").removeClass("active");
        $("#orgArea_doc span").removeClass("active");
        $(this).addClass("active");
        $("#orgArea_doc span").eq($(this).index()).addClass("active");
        datas[$(this).index()].OrganizationId;


        depDocList(datas[$(this).index()].OrganizationId);
    }).click(function () {
        window.location.href = "/Appointment/HospitalIndex?OrganizationId=" + datas[$(this).index()].OrganizationId;
    });
    $("#orgArea_doc span").mouseover(function () {
        $("#orgArea_doc span").removeClass("active");
        $("#orgArea_dep span,#orgArea_dep2 span").removeClass("active");
        $(this).addClass("active");
        $("#orgArea_dep span,#orgArea_dep2 span").eq($(this).index()).addClass("active");
        datas[$(this).index()].OrganizationId;
        depDocList(datas[$(this).index()].OrganizationId);
    }).click(function () {
        window.location.href = "/Appointment/HospitalIndex?OrganizationId=" + datas[$(this).index()].OrganizationId;
    });
}

//获取科室和医生列表
function depDocList(orgid) {
    //var datas = getCookie("dep_"+orgid);
    //if (datas!=null) {
    //    getdep(JSON.parse(datas));
    //}
    //else { employee/getdoctorsbyhospital
    HB.Query("standard/newgetdoctorsbyhospital", { OrganizationId: orgid, GroupId: 10}, function (ar, response) {
        if (ar.AjaxStatus) {
            if (HB.IsSucess(response)) {
                var datas = response.ResultData;
                //setCookie("dep_" + orgid, JSON.stringify(datas));
                getdep(datas);
            }
            else {
                HB.MessageError(response.Message);
            }
        }
        else {
            HB.MessageError(response);
        }
    });
    if (medicalRecord == 1) {
        HB.Query("standard/newgetcliniclistbyhospital", { OrganizationId: orgid, IsClinicMarkers: 1,IsShowClinic:1 }, function (ar, response) {
            if (ar.AjaxStatus) {
                if (HB.IsSucess(response)) {
                    var datas = response.ResultData;
                    //setCookie("dep_" + orgid, JSON.stringify(datas));
                    getdep2(datas);
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
    //}
}

function getdep(datas) {
    var depListStr = "";
    var docListStr = "";
    for (var i = 0; i < datas.length; i++) {
        if (i < 20) {
            var depName = "";
            var depNamefull;
            if (datas[i].FullName.length > 7) {
                depName = datas[i].FullName.substring(0, 6) + "...";
                depNamefull = datas[i].FullName;
            }
            else {
                depName = datas[i].FullName;
                depNamefull = datas[i].FullName;

            }

            depListStr += "<li onclick=\"window.location.href = '../Appointment/DepartmentIndex?DepartmentId=" + datas[i].DepartmentId + "'\"><span title=\"" + depNamefull + "\">" + depName;
            if (datas[i].IsUnique) {
                depListStr += "<img src=\"/Content/images/te.png\" />";
            }
            depListStr += "</span></li>";

            if (i < 5) {
                docListStr += "<div class=\"depart-depart\">";
                docListStr += "<span title=\'" + depNamefull + "\'>" + depName + "</span>";
                docListStr += "<ul>";
                for (var j = 0; j < datas[i].DoctorList.length; j++) {
                    if (j < 5) {
                        docListStr += "<li onclick=\"window.location.href = '../Appointment/DoctorIndex?DoctorId=" + datas[i].DoctorList[j].DoctorId + "'\"\><span title=" + datas[i].DoctorList[j].DoctorName + ">" + datas[i].DoctorList[j].DoctorName + "</span></li>";
                    }
                }
                docListStr += "</ul>";
                docListStr += "</div>";
            }
        }
    }

    $("#depList_dep").html(depListStr);
    $("#depList_doc").html(docListStr);
}
function getdep2(datas) {
    var depListStr = "";
    var docListStr = "";
    var len = datas.length;
    if (len > 5) {
        len = 5;
    }
    //for (var i = 0; i < datas.length; i++) {
    for (var i = 0; i < len; i++) {
        if (i < 20) {
            var depName = "";
            var depNamefull="";
            if (datas[i].Fullname.length > 7) {
                depName = datas[i].Fullname.substring(0, 6) + "...";
                depNamefull = datas[i].Fullname;
            }
            else {
                depName = datas[i].Fullname;
                depNamefull = datas[i].Fullname;
            }

            depListStr += "<li onclick=\"window.location.href = '../Appointment/DepartmentIndex?DepartmentId=" + datas[i].Id + "'\"><span title=\"" + depNamefull + "\">" + depName;
            if (datas[i].IsUnique) {
                depListStr += "<img src=\"/Content/images/te.png\" />";
            }
            depListStr += "</span></li>";

            if (i < 20) {
                docListStr += "<div class=\"depart-depart\">";
                docListStr += "<span title=\'" + depNamefull + "\' onclick=\"window.location.href = '../Appointment/DepartmentIndex?DepartmentId=" + datas[i].Id + "'\">" + depName + "</span>";
                docListStr += "<ul>";
                for (var j = 0; j < datas[i].SchoolList.length; j++) {
                    if (j < 3) {
                        var clinicname = datas[i].SchoolList[j].ClinicName;
                        if (clinicname.length > 7) {
                            clinicname = clinicname.substring(0, 6) + "...";
                        }
                        docListStr += "<li data-ClinicDesc=\'" + datas[i].SchoolList[j].ClinicDesc + "\' onclick=\"window.location.href = '../Appointment/DoctorIndex?DoctorId=" + datas[i].SchoolList[j].DoctorId + "&DepartmentId=" + datas[i].Id + "&ClinicLabelId=" + datas[i].SchoolList[j].ClinicLabelId + "&ClinicMarkers=" + encodeURIComponent(datas[i].SchoolList[j].ClinicMarkers) + "'\"\><span onclick=\'setLocalstorageClinicDescnav(this)\' title=" + datas[i].SchoolList[j].DoctorName + ">" + clinicname + "</span></li>";
                    }
                }
                docListStr += "</ul>";
                docListStr += "</div>";
            }
        }
    }
    $("#zbdepList_doc").html(docListStr);
}
function getLists(datas) {
    var newDatas = [];
    //所有二级菜单(三级菜单加入二级菜单)
    for (var i = 0; i < datas.length; i++) {
        if (datas[i].ClassLayer == "2") {
            datas[i].ChildList = [];
            newDatas.push(datas[i]);
        } else if (datas[i].ClassLayer == "3") {
            for (var j in newDatas) {
                if (newDatas[j].Id == datas[i].ParentId) {
                    newDatas[j].ChildList.push(datas[i]);
                }
            }
        }
    }


    return newDatas;
}

//获取新闻列表
function getNewsList() {
    var request = {
        HospitalId: $("#HospitalId").val()
    }
    HB.Query("cms/getnewcategorylist", request, function (ar, response) {
        if (ar.AjaxStatus) {
            if (HB.IsSucess(response)) {
                var datas = response.ResultData;
                datas = getLists(datas);
                var str = "";
                for (var i = 0; i < datas.length; i++) {
                    //str += "<li><a href=\"/News/NewsList?JianPin=" + datas[i].JianPing + "\">" + datas[i].Title + "</a></li>";
                    str += "<li><a href=\"/News/NewsList?id=" + datas[i].Id + "\">" + datas[i].Title + "</a></li>";
                }
                $("#nav_NewsList").html(str);
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

function topSearch() {
    var SearchName = $("#searchText").val();
    if (!SearchName) {
        HB.MessageError("请输入您想要输入的内容");
        return;
    }
    if ($("#select_value").val() == "search_dep") {
        window.location.href = "../Search/SearchDepart?SearchName=" + SearchName;
    }
    if ($("#select_value").val() == "search_doc") {
        window.location.href = "../Search/SearchDoctor?SearchName=" + SearchName;
    }
}

//医院就诊须知
$(function () {
    $(".hospital_jzxz").attr("href", "/News/NewsListInfo?HospitalId=" + $("#HospitalId").val() + "&callIndex=jzxz");
});

//登录消息
$(function () {
    $("#createLogin").click(function () {
        //单例登录应用
        createLogin();
        $(".mydialog").removeClass("bounceOutDown").addClass("bounceInDown");
        $("body").find("#login").show();
    })
})

function setLocalstorageClinicDescnav(event) {
    var clinicDesc = "";
    clinicDesc = $(event).parent("li").attr("data-ClinicDesc");
    localStorage.setItem("ClinicDesc", clinicDesc);
}