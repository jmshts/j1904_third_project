package com.sy.service;

import com.sy.pojo.TbDoctor;

import java.util.List;

/**
 * Create By SHI_YAO On 2019/8/21
 */
public interface TbDoctorService {
    /**
     * 获取所有的医生
     * @return
     */
    public List<TbDoctor> loadAll();
    /**
     * 获取一页的医生的集合
     * @return
     */
    public List<TbDoctor> loadpage(int page,int rows);

    /**
     * 获取医生的总数
     * @return
     */
    public int calcmaxpage(int rows);

    /**
     * 模糊查询
     * @param sql
     * @return
     */
    public List<TbDoctor> like(String sql);

    /**
     * 通过id获取doctor
     * @return
     */
    public TbDoctor findDoctorByDid(int did);
}
