package com.sy.mapper;

import com.sy.pojo.TbMedRec;
import org.apache.ibatis.annotations.Mapper;

/**
 * Create By SHI_YAO On 2019/8/21
 */
@Mapper
public interface TbMedRecMapper {
    /**
     * 创建新的病历表
     * @param medRec
     * @return
     */
    public int newMedRe(TbMedRec medRec);
}
