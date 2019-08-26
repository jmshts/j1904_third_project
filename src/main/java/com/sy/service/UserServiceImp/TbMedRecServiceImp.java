package com.sy.service.UserServiceImp;

import com.sy.mapper.TbMedRecMapper;
import com.sy.pojo.TbMedRec;
import com.sy.service.TbMedRecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TbMedRecServiceImp implements TbMedRecService {
    @Autowired
    private TbMedRecMapper tbMedRecMapper;
    /**
     * 创建新的病历表
     * @param medRec
     * @return
     */
    public boolean newMedRe(TbMedRec medRec){
        int i = tbMedRecMapper.newMedRe(medRec);
        return i>0?true:false;
    }
}
