package com.sy.controller;

import com.sy.pojo.TbDoctor;
import com.sy.service.TbDoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class doctorcontroller {
    @Autowired
    private TbDoctorService doctorService;
    /**
     * 跳转到挂号界面,并获取所有的医生，并分页
     * @return
     */
    @RequestMapping("docschedule")
    public String doctor(@RequestParam(required = false,defaultValue = "1") int page,
                         @RequestParam(required = false,defaultValue = "5") int rows,
                         Model model
                        ){
        int maxpage = doctorService.calcmaxpage(rows);
        if (page>maxpage){
            page=1;
        }if (page<1){
            page=maxpage;
        }
        List<TbDoctor> tbDoctors = doctorService.loadpage(page,rows);
        model.addAttribute("doctorList",tbDoctors);
        model.addAttribute("maxpage",maxpage);
        model.addAttribute("currentpage",page);
        return "docschedule";
    }
    /**
     * 跳转到职工登录界面
     * @return
     */
    @RequestMapping("doctorlogin")
    public String doctorlogin(){return  "doctorlogin";}

    /**
     * 职工登录，医生和药房跳到不同的界面
     * @return
     */
    @RequestMapping(value = "doctorloginhandler")
    public String doctorloginhandler(){
        //登录账号为医生，跳转到医生的界面
        return "redirect:doctorloginjudgement";
        //登录账号为药剂师，跳转到药剂师的界面
      //  return  "redirect:druggistjudgement";
    }

    /**
     * 进行shiro过滤器进行权限的判断，并且获取该药剂师的
     * @return
     */
    @RequestMapping("druggistjudgement")
    public String druggistjudgement(){
        return "druggisthandler";
    }
    /**
     * 进行shiro过滤器进行权限的判断，并且获取该医生的
     * @return
     */
    @RequestMapping("doctorloginjudgement")
    public String doctorloginjudgement(){
        return "doctorhandler";
    }
    /**
     * 获取单个已登录医生的个人信息并跳转到修改界面，但是医生信息已经存在session里面所以可以只是一个跳转界面
     */
    @RequestMapping("doctormessage")
    public String doctormessage(){
        return "doctormessage";
    }

    /**
     * 医生选择要治疗的已挂号病人，
     * @return
     */
    @RequestMapping("treat")
    public String treat(){
        return "treat";
    }

    /**
     * 将表单传回的诊断信息和开药的信息存入病历表中，病历表中是否诊断改为已诊断，是否取药改为未取药
     * @return
     */
    @RequestMapping("handletreatresult")
    public String handletreatresult(){
        return "handletreatresult";
    }
    /**
     *
     * 跳转到挂号界面,并获取所有的医生,进行模糊查询
     * @param model
     * @return
     */
    @RequestMapping("like")
    public String like(String sql,Model model){

        List<TbDoctor> doctorList=doctorService.like(sql);

        model.addAttribute("doctorList",doctorList);
        return "docschedulelike";
    }

    /**
     * 药剂师确认开药,去付款界面
     * @return
     */
    @RequestMapping("medicinepay")
    public String medicinepay(){
        return "medicinepay";
    }
    /**
     * 药剂师确认开药，跳转到付款确认界面
     * @return
     */
    @RequestMapping("getpill")
    public String getpill(){
        return "getpill";
    }

    /**
     * 确认药单并且点击付款以后的确认付款并返回方法，修改开药表中已经就诊但是未付钱的患者的ispay为true代表一付钱
     * @return
     */
    @RequestMapping("paypill")
    public String paypill(){
        return "redirect:druggistjudgement";
    }

    /**
     * 跳转到管理员登录界面
     * @return
     */
    @RequestMapping("managerlogin")
    public String managerlogin(){
        return "managerlogin";
    }
    /**
     * 超管登录进入后台管理界面首页
     * @return
     */
    @RequestMapping("allmanager")
    public  String allmanager(){
        return "redirect:allmanagerjudgement";
    }
    @RequestMapping("allmanagerjudgement")
    public String allmanagerjudgement(){
        return "allmanager";
    }
    /**
     * 跳转到后台管理的患者管理
     * @return
     */
    @RequestMapping("patientmanager")
    public String patientmanager(){
        return "patientmanager";
    }

    /**
     * 跳转到后台管理的职工管理
     * @return
     */
    @RequestMapping("doctormanager")
    public String doctormanager(){
        return "doctormanager";
    }

    /**
     * 跳到后台维护的药品管理
     * @return
     */
    @RequestMapping("medicinemanager")
    public  String medicinemanager(){
        return "medicinemanager";
    }

    //跳到后台维护的许可维护
    @RequestMapping("permissionmanager")
    public  String role(){
        return "permissionmanager";
    }
}
