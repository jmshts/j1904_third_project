package com.sy.shiro;


import com.sy.pojo.TbPermission;
import com.sy.pojo.TbUser;
import com.sy.service.TbUserService;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MyRealm extends AuthorizingRealm {
    @Autowired
    private TbUserService tbUserService;
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        Object primaryPrincipal = principals.getPrimaryPrincipal();
        if(!StringUtils.isEmpty(primaryPrincipal)){
            String userName=(String) primaryPrincipal;
            List<TbPermission> permissionsByUserName = tbUserService.findPermissionsByUserName(userName);
            //权限去重
            Set<String> perms = new HashSet<>();
            for(TbPermission perm:permissionsByUserName){
                String permPtext = perm.getPtext();
                perms.add(permPtext);
            }
            SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
            authorizationInfo.setStringPermissions(perms);
            return authorizationInfo;
        }
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        //获取身份信息
        Object principal = token.getPrincipal();
        if(!StringUtils.isEmpty(principal)){
            String userName=(String) principal;
            //查询用户的逻辑信息
            TbUser userInfoByUserName = tbUserService.findUserInfoByUserName(userName);
            SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(userName,userInfoByUserName.getUserpwd(),getName());
            return authenticationInfo;
        }
        return null;
    }
}
