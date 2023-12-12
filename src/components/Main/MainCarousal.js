import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";
import React from 'react';

import slideImg1 from '../../asset/slide1.png';
import slideImg2 from '../../asset/slide2.png';
import slideImg3 from '../../asset/slide3.png';
import slideImg4 from '../../asset/slide4.png';
import slideImg5 from '../../asset/slide5.png';
import next from '../../asset/next.png';
import prev from '../../asset/before.png';

export default function MainCarousal() {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        autoplay: false,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '10px',
        arrows: true,
        nextArrow: (
            <Next>

            </Next>
        ),
        prevArrow: (
            <Prev>
                 
            </Prev>
        ),
    };

    return (
        <MainSlideArea>
            <MainSlideText>
                <MainSlideTitle>
                    <Blue>네 번째 이야기{'\n'}</Blue>
                    작문과 언어에 관한 최상의 학습 효과를{'\n'}
                    사용자에게 가져다주는 GLOT 인공 지능(AI),{'\n'}
                    GLOT Writing
                </MainSlideTitle>
            </MainSlideText>
            <Slider {...settings}>
                <CarousalContent>
                    <Image
                        src={slideImg1}
                    />
                </CarousalContent>
                <CarousalContent>
                    <Image
                        src={slideImg2}
                    />
                </CarousalContent>
                <CarousalContent>
                    <Image
                        src={slideImg3}
                    />
                </CarousalContent>
                <CarousalContent>
                    <Image
                        src={slideImg4}
                    />
                </CarousalContent>
                <CarousalContent>
                    <Image
                        src={slideImg5}
                    />
                </CarousalContent>
                <CarousalContent>
                    <Image
                        src={slideImg5}
                    />
                </CarousalContent>
            </Slider>
        </MainSlideArea>
    );
}

const MainSlideArea = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(238, 246, 255, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const MainSlideText = styled.div`
    width: 800px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    margin-top: 104px;
    margin-bottom: 40px;
    margin-left: 34%;
    @media (max-width: 781px) {
        margin-top: 64px;
        margin-bottom: 64px;
        margin-left: auto;
    }
    @media (max-width: 591px) {
        margin-top: 32px;
        margin-bottom: 32px;
        margin-left: auto;
    }
`;

const MainSlideTitle = styled.div`
    font-size: 44px;
    font-weight: 600;
    line-height: 67px;
    letter-spacing: -0.05em;
    text-align: left;
    letter-spacing: -0.03em;
    white-space: pre-line;
    color: rgba(17, 17, 17, 1);
    @media (max-width: 781px) {
        font-size: 28px;
        line-height: 32px;
    }
    @media (max-width: 591px) {
        font-size: 22px;
        line-height: 32px;
    }
`;

const Blue = styled.span`
    color: #4c68fa;
`;

const CarousalContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 104px;
`;

const Image = styled.img`
    width: 31vw;
    height: auto;
`;

const Next = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 90%;
    right: 47%;
    z-index: 999;
    content: url(${next});
    @media (max-width: 781px) {
        right: 45%;
        width: 25px;
        height: 25px;
    }
    @media (max-width: 591px) {
        right: 43%;
        width: 20px;
        height: 20px;
    }
`;

const Prev = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 90%;
    left: 47%;
    z-index: 999;
    content: url(${prev});
    @media (max-width: 781px) {
        left: 45%;
        height: 25px;
        width: 25px;
    }
    @media (max-width: 591px) {
        left: 43%;
        height: 20px;
        width: 20px;
    }
`;

