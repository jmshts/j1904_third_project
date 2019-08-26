package com.sy.pojo;

import lombok.Data;

@Data
public class TbPermission {
    private int id;
    private int pid;
    private String ptext;
    private String icon;
    private boolean open=true;

}
