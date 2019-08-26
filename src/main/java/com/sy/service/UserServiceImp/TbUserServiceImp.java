package com.sy.service.UserServiceImp;

import com.sy.mapper.TbUserMapper;
import com.sy.pojo.TbPermission;
import com.sy.pojo.TbUser;
import com.sy.pojo.UserRoleMapperKey;
import com.sy.service.TbUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TbUserServiceImp implements TbUserService {
    @Autowired
    private TbUserMapper userMapper;
    @Override
    /**
     * 通过用户的姓名获取用户的信息
     * @param userName
     * @return TbUser
     */
    public TbUser findUserInfoByUserName(String userName) {
        TbUser userInfoByUserName = userMapper.findUserInfoByUserName(userName);
        return userInfoByUserName;

    }
    /**
     * 通过患者名获取患者的权限
     * @param userName
     * @return
     */
    @Override
    public List<TbPermission> findPermissionsByUserName(String userName) {
        List<TbPermission> permissionsByUserName = userMapper.findPermissionsByUserName(userName);
        return permissionsByUserName;
    }

    /**
     * 创建一个新的用户
     * @param user 患者的对象
     * @return
     */
    @Override
    public int creatNewUser(TbUser user) {
        int i = userMapper.creatNewUser(user);
        return i;
    }

    /**
     * 创建患者角色关系表
     * @param userRoleMapperKey
     * @return
     */
    @Override
    public int creatUserRoleMapping(UserRoleMapperKey userRoleMapperKey) {
        int i = userMapper.creatUserRoleMapping(userRoleMapperKey);
        return i;
    }

}
