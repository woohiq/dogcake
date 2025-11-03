package com.mice_star.demo.dto;

import com.mice_star.demo.domain.HomePageContent;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class HomePageContentDto {
    private Long id;
    private String title;
    private String description;
    private String imagePath;
    private String linkUrl;


    public HomePageContentDto(HomePageContent entity){
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.description = entity.getDescription();
        this.imagePath = entity.getImagePath();
        this.linkUrl = entity.getLinkUrl();
    }
}
