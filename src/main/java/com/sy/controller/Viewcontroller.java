package com.sy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.PublicKey;

@Controller
public class Viewcontroller {
    /**
     * 默认首页
     * @return
     */
    @RequestMapping("/")
    public String firstIn(){
        return "firstIn";
    }

    /**
     * 直接主页选择患者进入的登录界面
     * @return
     */
    @RequestMapping("patient")
    public String patient(){ return "patient";}

    /**
     * 直接跳转到患者注册界面
     * @return
     */
    @RequestMapping("newpatientpage")
    public String newpatientpage(){return  "newpatientpage";}

    /**
     * 展示患者信息于修改患者信息的页面
     * @return
     */
    @RequestMapping("patientedit")
    public  String patientedit(){return "patientedit";}

    /**
     * 跳转到注册界面
     * @return
     */
    @RequestMapping("Register")
    public String Register(){return "Register";}

    /**
     * 预约挂号
     * @return
     */
    @RequestMapping("order")
    public String order(){return "order";}

    /**
     * 登录后台管理界面
     * @return
     */
    @RequestMapping("manager")
    public String manager(){return "manager";}



    /**
     * 管理平台跳转医生管理平台
     * @return
     */
    @RequestMapping("patients")
    public String patients(){
        return "patients";
    }

    //index跳转
    @RequestMapping("index")
    public String index(){return "index";}

    /**
     * 出错跳转
     * @return
     */
    @RequestMapping("error2")
    public String error2(){return "error2";}




    /**
     * 暂时没用的界面但是金子总是会发光的，师垚牛逼
     * @return
     */
    @RequestMapping("HospitalIndex")
    public String HospitalIndex(){
        return "HospitalIndex";
    }




}
