package com.mice_star.demo.repository;

import com.mice_star.demo.domain.HomePageContent;
import com.mice_star.demo.domain.contentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HomepageContentRepository extends JpaRepository<HomePageContent, Long> {
    //Spring data jpa -> Query Method 기능, 정해진 규칙으로 메서드 이름 생성시 sql 쿼리 자동 생성
    List<HomePageContent> findByContentType(contentType contentType);
}
