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
        arrows: false,
        nextArrow: (
            <Next>
                <img 
                    src={next} 
                    alt="next"
                    style={{
                        width: '20px',
                        height: '20px',
                    
                    }}
                />
            </Next>
        ),
        prevArrow: (
            <Prev>
                 <img 
                    src={prev} 
                    alt="prev"
                    style={{
                        width: '20px',
                        height: '20px',  
                    }}
                />
            </Prev>
        ),
    };

    return (
        <MainSlideArea>
            <MainSlideText>
                <MainSlideTitle>
                    4. 똑똑한 글쓰기 파트너,{`\n`}
                    GLOT Writing
                </MainSlideTitle>
                <MainSlideSubTitle>
                    General Logic of Text Writing
                </MainSlideSubTitle>
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    margin-top: 104px;
    margin-bottom: 40px;
    @media (max-width: 781px) {
        margin-top: 64px;
        margin-bottom: 64px;
    }
    @media (max-width: 591px) {
        margin-top: 32px;
        margin-bottom: 32px;
    }
`;

const MainSlideTitle = styled.div`
    font-size: 48px;
    font-weight: 700;
    line-height: 67px;
    letter-spacing: -0.05em;
    text-align: left;
    letter-spacing: -0.03em;
    text-align: center;
    white-space: pre-line;
    color: rgba(17, 17, 17, 1);
    @media (max-width: 781px) {
        font-size: 32px;
        font-weight: 700;
        line-height: 32px;
    }
    @media (max-width: 591px) {
        font-size: 28px;ß
        line-height: 32px;

    }
`;

const MainSlideSubTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.05em;
    text-align: center;
    white-space: pre-line;
    color: rgba(210, 220, 240, 1);
    @media (max-width: 781px) {
        font-size: 16px;
        font-weight: 700;
        line-height: 32px;
    }
    @media (max-width: 591px) {
        font-size: 14px;
        line-height: 32px;
    }

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
    position: absolute;
    top: -20%;
    right: 20%;
    z-index: 999;
`;

const Prev = styled.div`
    position: absolute;
    top: -20%;
    left: 70%;
    z-index: 999;
`;