package com.sy;

import com.sy.mapper.TbDoctorMapper;
import com.sy.mapper.TbUserMapper;
import com.sy.pojo.TbDoctor;
import com.sy.pojo.TbPermission;
import com.sy.pojo.TbUser;
import com.sy.pojo.UserRoleMapperKey;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class J1904ThirdProjectApplicationTests {
    @Autowired
    private TbUserMapper userMapper;
    @Autowired
    private TbDoctorMapper doctorMapper;
    @Test
    public void contextLoads() {

        List<TbDoctor> mio = doctorMapper.like("mio");
        System.out.println(mio);
    }

}
