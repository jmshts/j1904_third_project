package com.sy.mapper;

import com.sy.pojo.TbPermission;
import com.sy.pojo.TbUser;
import com.sy.pojo.UserRoleMapperKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Create By SHI_YAO On 2019/8/21
 */
@Mapper
public interface TbUserMapper{
    /**
     * 通过患者的姓名获取用户的信息
     * @param userName
     * @return TbUser
     */
    public TbUser findUserInfoByUserName(@Param("userName") String userName);

    /**
     * 通过患者名获取患者的权限
     * @param userName
     * @return
     */
    public List<TbPermission> findPermissionsByUserName(@Param("userName") String userName);

    /**
     * 创建一个新的患者账号
     * @param user 患者的对象
     */
    public int creatNewUser( TbUser user);

    /**
     * 创建患者的角色用户关系表
     * @param uid
     * @param rid
     * @return
     */
    public int creatUserRoleMapping(UserRoleMapperKey userRoleMapperKey);
    public List<TbUser> loadalluser();

}

