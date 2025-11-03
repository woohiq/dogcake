package com.mice_star.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProjectController {

    @GetMapping("/project")
    public String project(Model model) {
        return "project";
    }

    @GetMapping("/project/map/white")
    public String selectWhiteMap(Model model) {
        return "fragments/project_sections/whiteMap";
    }

    @GetMapping("/project/map/black")
    public String selectBlackMap(Model model) {
        return "fragments/project_sections/blackMap";
    }

}
