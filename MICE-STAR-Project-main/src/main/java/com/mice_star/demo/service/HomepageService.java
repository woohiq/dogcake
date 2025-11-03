package com.mice_star.demo.service;

import com.mice_star.demo.domain.HomePageContent;
import com.mice_star.demo.domain.contentType;
import com.mice_star.demo.dto.HomePageContentDto;
import com.mice_star.demo.repository.HomepageContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HomepageService {

    private final HomepageContentRepository homepageContentRepository;

    //생성자를 통한 의존성 주입
    public HomepageService(HomepageContentRepository homepageContentRepository){
        this.homepageContentRepository = homepageContentRepository;
    }

    //Core Value
    public List<HomePageContentDto> getCoreValues(){
        List<HomePageContent> entities = homepageContentRepository.findByContentType(contentType.CORE_VALUE);

        return entities.stream()
                .map(HomePageContentDto::new)
                .collect(Collectors.toList());
    }


    //HashTag
    public List<HomePageContentDto> getHashtags(){
        List<HomePageContent> entities = homepageContentRepository.findByContentType(contentType.HASHTAG);

        return entities.stream()
                .map(HomePageContentDto::new)
                .collect(Collectors.toList());
    }

    //Mice Card
    public List<HomePageContentDto> getMiceCards(){
        List<HomePageContent> entities = homepageContentRepository.findByContentType(contentType.MICE_CARD);

        return entities.stream()
                .map(HomePageContentDto::new)
                .collect(Collectors.toList());
    }

}
