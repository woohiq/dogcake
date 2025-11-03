package com.mice_star.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ArchiveController {

    @GetMapping("/archive")
    public String archive(Model model) {
        return "archive";
    }


    @GetMapping("/archive/Sub/{id}")
    public String archivesSub(@PathVariable("id") int id, Model model) {
        String frameImagesUrl;
        int totalImages;

        switch(id) {
            case 0:
                totalImages=20;
                break;

            case 2:
                totalImages=11;
                break;

            default:
            totalImages=10;
            break;
        }

        if (id == 0) {
            frameImagesUrl="/images/archive/blueframe.png";
        } else if(id>=1 && id<=8){
            frameImagesUrl="/images/archive/orangeframe.png";
        } else{
            frameImagesUrl="/images/archive/blueframe.png";
        }

        model.addAttribute("archiveId", id);
        model.addAttribute("totalImages", totalImages);
        model.addAttribute("frameImageUrl", frameImagesUrl);

        return "archive_sub/archiveDetail";
    }

}

