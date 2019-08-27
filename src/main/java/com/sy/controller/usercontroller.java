package com.sy.controller;

import com.sy.pojo.TbDoctor;
import com.sy.pojo.TbMedRec;
import com.sy.pojo.TbUser;
import com.sy.pojo.UserRoleMapperKey;
import com.sy.service.UserServiceImp.TbDoctorServiceImp;
import com.sy.service.UserServiceImp.TbMedRecServiceImp;
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
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

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
    public String newpatient(TbUser user ,String passwordParden,String checkcode,String checkcode1){
        System.out.println(user);
        System.out.println(checkcode+"++++++"+checkcode1);
//            if (user.getUsername()!=null&user.getUserpwd()!=null&user.getUsersex()!=null&user.getUseremail()!=null&user.getIdnum()!=null&user.getUserrealname()!=null&user.getPhone()!=null){
//                if (userServiceImp.findUserInfoByUserName(user.getUsername())==null){
//                    int i = userServiceImp.creatNewUser(user);
//                    TbUser userInfoByUserName = userServiceImp.findUserInfoByUserName(user.getUsername());
//                    Integer uid = userInfoByUserName.getUid();
//                    UserRoleMapperKey userRoleMapperKey = new UserRoleMapperKey();
//                    userRoleMapperKey.setUid(uid);
//                    userRoleMapperKey.setRid(8);
//                    int i1 = userServiceImp.creatUserRoleMapping(userRoleMapperKey);
//                    return ("patient");
//                }
//                return "error2";
//            }
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

    /**
     * 挂号回执
     * @param tbMedRec
     * @return
     */
    @RequestMapping("orderresult")
    public String orderresult(TbMedRec tbMedRec){
        TbDoctor doctorByDid = tbDoctorServiceImp.findDoctorByDid(tbMedRec.getDid());
        tbMedRec.setDepartment(doctorByDid.getDepartment());
        tbMedRec.setIstreat(false);
        tbMedRec.setDoctor(doctorByDid.getDoctorrealname());
        tbMedRec.setIspay(false);
        boolean b = tbMedRecServiceImp.newMedRe(tbMedRec);
        if (b){
            return "orderresult";
        }
        return "error2";
    }

    /**
     * 生成验证码的图片
     * @param request
     * @param response
     * @param model
     * @throws IOException
     */
    @RequestMapping("checkCodeServlet")
    public void checkCodeServlet(HttpServletRequest request, HttpServletResponse response,Model model) throws IOException {
        //定义验证码图片的宽和高
        int width=120,height=25;
        //定义图片的宽高以及构建类型
        BufferedImage bufferedImage=new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        //一个构建图片的画笔(或者画布)
        Graphics g=bufferedImage.getGraphics();

        Random r=new Random();

        g.setColor(new Color(r.nextInt(255),r.nextInt(255),r.nextInt(255)));

        //创建的画笔 填充一个矩形
        g.fillRect(0, 0, width, height);

        //干扰线
        for (int i = 0; i < 7; i++) {
            g.setColor(new Color(r.nextInt(255),r.nextInt(255),r.nextInt(255)));
            g.drawLine(r.nextInt(width), r.nextInt(height), r.nextInt(width), r.nextInt(height));
        }

        String base="abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        String code="";
        while(code.length()<4) {
            code+=base.charAt(r.nextInt(base.length()))+"";
        }
        g.setFont(new Font("宋体",Font.BOLD,24));
        String displayCode="";
        char[] cs=code.toCharArray();
        for (int i = 0; i < cs.length; i++) {
            displayCode+=i==cs.length-1?cs[i]:cs[i]+" ";
        }
        System.out.println(code);
        model.addAttribute("code",code);
        request.getSession().setAttribute("code", code);
        g.drawString(displayCode, 10, 20);
        //response 响应对象(服务器到客户端) 客户端
        ImageIO.write(bufferedImage,"JPEG",response.getOutputStream());

    }

}
