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

export default function MainCarousal() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        arrow: true,
        // nextArrow: (
        //     <Next>
        //         <img 
        //             src={next} 
        //             alt="next"
        //             style={{
        //                 width: '20px',
        //                 height: '20px',
        //             }}
        //         />
        //     </Next>
        // ),
        // prevArrow: (
        //     <Prev>
        //          <img 
        //             src={prev} 
        //             alt="prev"
        //             style={{
        //                 width: '20px',
        //                 height: '20px',
        //             }}
        //         />
        //     </Prev>
        // ),
    };

    return (
        <MainCarousalContainer>
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
        </MainCarousalContainer>
    );
}

const MainCarousalContainer = styled.div`
    width: 60%;
    height: 100%;
    margin: 0 auto;
    margin-bottom: 104px;
`;

const CarousalContent = styled.div`
    width: 100%;
    height: 100%;
`;

const Image = styled.img`
    width: 588px;
    height: 414px;
    margin: 0 auto;
`;

// const Next = styled.div`
//     width: 20px;
//     height: 20px;
//     cursor: pointer;
//     position: absolute;
//     right: 20%;
//     z-index: 999;
//     border: 1px solid black;
// `;

// const Prev = styled.div`
//     width: 20px;
//     height: 20px;
//     cursor: pointer;
//     position: absolute;
//     left: 70%;
//     z-index: 999;
//     border: 1px solid black;
// `;