package com.sy.controller;

import com.sy.pojo.TbDoctor;
import com.sy.pojo.TbMedRec;
import com.sy.pojo.TbUser;
import com.sy.pojo.UserRoleMapperKey;
import com.sy.service.UserServiceImp.TbDoctorServiceImp;
import com.sy.service.UserServiceImp.TbMedRecServiceImp;
import com.sy.service.UserServiceImp.TbMedicineServiceImp;
import com.sy.service.UserServiceImp.TbUserServiceImp;
import org.apache.ibatis.annotations.Param;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class usercontroller {
    @Autowired
    private TbUserServiceImp userServiceImp;
    @Autowired
    private TbDoctorServiceImp tbDoctorServiceImp;
    @Autowired
    private TbMedRecServiceImp tbMedRecServiceImp;
    /**
     * 病人登录，借助shiro，并且对比页面传回的角色选择值进行判断
     * @return
     */
    @RequestMapping("patientlogin")
    public String patientlogin(@Param("userName") String userName,
                               @Param("userPwd") String userPwd,
                               HttpSession session
                               ){
        try {
            Subject subject = SecurityUtils.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(userName, userPwd);
            subject.login(token);
            if(subject.isAuthenticated()){
                TbUser user = userServiceImp.findUserInfoByUserName(userName);
                System.out.println(user);
                session.setAttribute("user",user);
                return "redirect:patientloginjudgement";
        }
    } catch (AuthenticationException e) {
        e.printStackTrace();
    }
        return "error";

        //通过传入的username和userpwd在shiro中进行认证并且对权限进行过滤

    }

    /**
     * 进行shiro过滤器进行权限的判断
     * @return
     */
    @RequestMapping("patientloginjudgement")
    public String patientloginjudgement(){

        return "order";
    }
    /**
     *注册一个新的病人账号，创建完成以后直接登录并且将此用户信息存入session中
     * @return
     */
    @RequestMapping("newpatient")
    public String newpatient(TbUser user ,String passwordParden){
        System.out.println(user);
            if (user.getUsername()!=null&user.getUserpwd()!=null&user.getUsersex()!=null&user.getUseremail()!=null&user.getIdnum()!=null&user.getUserrealname()!=null&user.getPhone()!=null){
                if (userServiceImp.findUserInfoByUserName(user.getUsername())==null){
                    System.out.println(user);
                    int i = userServiceImp.creatNewUser(user);
                    TbUser userInfoByUserName = userServiceImp.findUserInfoByUserName(user.getUsername());
                    Integer uid = userInfoByUserName.getUid();
                    System.out.println(uid);
                    UserRoleMapperKey userRoleMapperKey = new UserRoleMapperKey();
                    userRoleMapperKey.setUid(uid);
                    userRoleMapperKey.setRid(8);
                    int i1 = userServiceImp.creatUserRoleMapping(userRoleMapperKey);
                    return ("patient");
                }
                return "error2";
            }
            return "error2";

    }

    /**
     * 将用户传回的修改信息传回，更新自己的用户信息
     * @return
     */
    @RequestMapping("handlepatientedit")
    public String handlepatientedit(){
        return "order";
    }



    /**
     * 患者创建新的挂号信息
     * @return
     */
    @RequestMapping("neworder")
    public String neworder(int did, int uid, Model model){
        model.addAttribute("did",did);
        model.addAttribute("uid",uid);
        return "neworder";
    }
    @RequestMapping("orderresult")
    public String orderresult(TbMedRec tbMedRec){
        TbDoctor doctorByDid = tbDoctorServiceImp.findDoctorByDid(tbMedRec.getDid());
        tbMedRec.setDepartment(doctorByDid.getDepartment());
        tbMedRec.setIstreat(false);
        tbMedRec.setDoctor(doctorByDid.getDoctorrealname());
        tbMedRec.setIspay(false);
        System.out.println(tbMedRec);
        System.out.println(tbMedRec.getDate());
        boolean b = tbMedRecServiceImp.newMedRe(tbMedRec);
        if (b){
            return "orderresult";
        }
        return "error2";
    }

}
