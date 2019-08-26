package com.sy.service.UserServiceImp;

import com.github.pagehelper.PageHelper;
import com.sy.mapper.TbDoctorMapper;
import com.sy.pojo.TbDoctor;
import com.sy.service.TbDoctorService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TbDoctorServiceImp implements TbDoctorService {
    @Resource
    private TbDoctorMapper doctorMapper;
    /**
     * 获取所有的医生
     * @return
     */
    @Override
    public List<TbDoctor> loadAll() {
        List<TbDoctor> tbDoctors = doctorMapper.loadAll();
        return tbDoctors;
    }

    /**
     * 按分页获取医生表
     * @param page
     * @param rows
     * @return
     */
    @Override
    public List<TbDoctor> loadpage(int page, int rows) {
        PageHelper.startPage(page,rows);
        return doctorMapper.loadpage();
    }

    /**
     * 获取医生表的最大分页
     * @param rows
     * @return
     */
    @Override
    public int  calcmaxpage(int rows) {
      int count=doctorMapper.gettotalcount();
        return count%rows==0?count/rows:count/rows+1;
    }

    /**
     * 模糊查询医生表
     * @param sql
     * @return
     */
    @Override
    public List<TbDoctor> like(String sql) {
        List<TbDoctor> doctorList = doctorMapper.like(sql);
        return doctorList;
    }
    /**
     * 通过doctor的did来获取doctor
     * @param did
     * @return
     */
    public TbDoctor findDoctorByDid(int did){
        TbDoctor doctor = doctorMapper.findDoctorByDid(did);
        return doctor;
    }


}
