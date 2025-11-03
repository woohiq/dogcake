package com.mice_star.demo.config;

import com.mice_star.demo.dto.Menuitem;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalControllerAdvice {


    @ModelAttribute("menuitems")
    public List<Menuitem> addMenuItems() {
        List<Menuitem>  menuitems = new ArrayList<>();

        menuitems.add(new Menuitem("브랜드", "/brand"));
        menuitems.add(new Menuitem("프로젝트", "/project"));
        menuitems.add(new Menuitem("출판물", "/publications"));
        menuitems.add(new Menuitem("다닥x행궁", "/dadak"));
        menuitems.add(new Menuitem("아카이브", "/archive"));
//        menuitems.add(new Menuitem("방명록", "/guestbook"));

        return menuitems;
    }
}
