package com.sy.service;

import com.sy.pojo.TbMedRec;

/**
 * Create By SHI_YAO On 2019/8/21
 */
public interface TbMedRecService {
    /**
     * 创建新的病历表
     * @param medRec
     * @return
     */
    public boolean newMedRe(TbMedRec medRec);
}
