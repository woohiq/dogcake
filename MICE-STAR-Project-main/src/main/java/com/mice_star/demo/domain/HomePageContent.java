package com.mice_star.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "HomePageContent")
public class HomePageContent {

    @Id //PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private contentType contentType;

    @Column(nullable = false, length = 50)
    private String title;

    @Lob //매우 긴 문자열 저장 가능 지정
    private String description;

    @Column(length = 255)
    private String imagePath;

    @Column(length = 255)
    private String linkUrl;

    @Column(name = "created_time", updatable = false)
    private LocalDateTime createdtime;

    @PrePersist
    protected void onCreate(){
        this.createdtime = LocalDateTime.now();

    }
}
