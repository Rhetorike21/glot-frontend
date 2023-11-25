import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MainTopBar from '../../components/Main/MainTopBar';
import MainFAQ from '../../components/Main/MainFAQ';
import MainFooter from '../../components/Main/MainFooter';
import MainCarousal from '../../components/Main/MainCarousal';

import mainImg from '../../asset/mainbackground.png';
import mainImg2 from '../../asset/mainbackground2.png';
import AppStore from '../../asset/AppStore.png';
import PlayStore from '../../asset/PlayStore.png';
import slide1 from '../../asset/sectionA.png';
import slide2 from '../../asset/sectionB.png';
import slide3 from '../../asset/sectionC.png';
import frame2 from '../../asset/GlotFrame.png';
import card1 from '../../asset/card1.png';
import card2 from '../../asset/card2.png';
import card3 from '../../asset/card3.png';
import banner from '../../asset/banner.png';
import banner1 from '../../asset/banner1.png';
import vector from '../../asset/Vector.png';
import blueVector from '../../asset/blueVector.png';
import whiteVector from '../../asset/whiteVector.png';


export default function About() {
    const navigate = useNavigate();

    const onClickStart = () => {
        // window.open("http://localhost:3000/writing", "_blank");
        navigate('/writing');
    }

    return (
        <MainContainer>
            <BackgroundImg>
                <MainTopBar/>
                <MainContent>
                    <MainText>
                        <Title>
                            Save your time on Writing.{'\n'}
                            and then Invest your time{'\n'}
                            in realizing ideal.
                        </Title>
                        <Description>
                            작문에 투자하는 시간을 절약해보세요.{'\n'}
                            그리고 이상 실현에 여러분의 시간을 투자하세요!
                        </Description>
                        <ButtonArea>
                            <DownButton>
                                <Icon src={AppStore} alt='appStore'/>App Store
                            </DownButton>
                            <DownButton>
                                <Icon src={PlayStore} alt='playStore' />Play Store
                            </DownButton>
                        </ButtonArea>
                    </MainText>
                    <MainImage
                        src={frame2}
                    />
                </MainContent>
            </BackgroundImg>
            <MainDescription>
                <MainDescriptionTitle>
                    텍스트 해석의 개척자. GLOT
                </MainDescriptionTitle>
                <MainDescriptionContent>
                    General Logic Of Text
                </MainDescriptionContent>
                <MainDescriptionContainer
                    src={slide1}
                >
                </MainDescriptionContainer>
                <MainDescriptionContainer
                    src={slide2}
                >
                </MainDescriptionContainer>
                <MainDescriptionContainer
                    src={slide3}
                >
                </MainDescriptionContainer>
                <Button>
                    PDF 다운로드
                    <img 
                        src={blueVector}
                        alt='vector'
                        style={{
                            width: '18px',
                            height: '15px',
                            marginLeft: '20px',
                        }}
                    />
                </Button>
            </MainDescription>
            <MainImgArea>
                <MainImgTitle>
                    GLOT<Small>(General Logic Of Text)</Small>에{'\n'}
                    인공 지능<Small>(AI)</Small>을 입히다.
                </MainImgTitle>
                <MainImgContent>
                    <MainImgContentOuter>
                        <CardImage
                            src={card1}
                        />
                    </MainImgContentOuter>
                    <MainImgContentOuter>
                        <CardImage
                            src={card2}
                        />
                    </MainImgContentOuter>
                    <MainImgContentOuter>
                        <CardImage
                            src={card3}
                        />
                    </MainImgContentOuter>
                </MainImgContent>
                <MainImgButtonArea>
                    <MainImgButton>
                        GLOT AI 더 알아보기
                        <img 
                            src={whiteVector}
                            alt='vector'
                            style={{
                                width: '18px',
                                height: '15px',
                                marginLeft: '20px',
                            }}
                        />
                    </MainImgButton>
                </MainImgButtonArea>
            </MainImgArea>
            <MainSlideArea>
                <MainSlideText>
                    <MainSlideTitle>
                        똑똑한 글쓰기 파트너,{`\n`}
                        GLOT Writing
                    </MainSlideTitle>
                    <MainSlideSubTitle>
                        General Logic of Text Writing
                    </MainSlideSubTitle>
                </MainSlideText>
                <MainCarousal/>
            </MainSlideArea>
            <MainBannerArea
                style={{
                    backgroundImage: `url(${banner1})`,
                }}
            >
                <BannerText>
                    텍스트 작문,GLOT AI와 함께 최고가 되어 보세요.
                </BannerText>
                <BannerButtonArea>
                    <BannerButton onClick={onClickStart}>
                       GLOT 무료체험
                        <img 
                            src={vector}
                            alt='vector'
                            style={{
                                width: '18px',
                                height: '15px',
                                marginLeft: '20px',
                            }}
                        />
                    </BannerButton>
                </BannerButtonArea>    
            </MainBannerArea>
            <MainFAQ/>
            <MainBannerArea
                style={{
                    color: 'rgba(255, 255, 255, 1)',
                    backgroundImage: `url(${banner})`,
                    backgroundSize: 'cover',
                }}
            >
                <BottomBannerText>
                    레토리케에 궁금한 점을 바로 문의할 수 있어요!
                </BottomBannerText>
            </MainBannerArea>
            <MainFooter/>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const BackgroundImg = styled.div`
    background-color: #f2f3f5;
    background-image: url(${mainImg}); // mainImg를 배경 이미지로 설정
    background-size: cover; // 배경 이미지를 꽉 채우도록 설정
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    @media (max-width: 591px) {
        background-image: url(${mainImg});
        background-size: cover;
    }
`;

const MainContent = styled.div`
    width: 100%;
    height: 797px;
    display: flex;
    justify-content: center;
    text-align: center;
    @media (max-width: 591px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
`;

const MainText = styled.div`
    width: 591px;
    height: 366px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;   
    margin-top: 197px;
    @media (max-width: 591px) {
        margin-top: 64px;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
`;

const Title = styled.div`
    width: 591px;
    color: rgba(255, 255, 255, 1);
    font-size: 46px;
    font-weight: 900;
    line-height: 70px;
    letter-spacing: -0.03em;
    text-align: left;
    white-space: pre-line;
    @media (max-width: 591px) {
        width: 100%;
        font-size: 32px;
        font-weight: 900;
        line-height: 42px;
        letter-spacing: -0.03em;
        text-align: center;
        white-space: pre-line;
    }
`;

const Description = styled.div`
    width: 100%;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: -0.03em;
    text-align: left;
    white-space: pre-line;
    margin-top: 16px;
    color: rgba(77, 100, 122, 1);
    @media (max-width: 591px) {
        font-size: 16px;
        font-weight: 700;
        line-height: 32px;
        letter-spacing: -0.03em;
        text-align: center;
        white-space: pre-line;
        margin-top: 16px;
        color: rgba(77, 100, 122, 1);
    }
`;

const ButtonArea = styled.div`
    width: 264px;
    height: 48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 28px;
    @media (max-width: 591px) {
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        margin-top: 28px;
    }
`;

const DownButton = styled.div`
    width: 128px;
    height: 48px;
    border: none;
    border-radius: 10px;
    background-color: rgba(74, 93, 113, 0.4);
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    font-weight: 500;
    line-height: 48px;
    letter-spacing: -0.03em;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 591px) {
        width: 108px;
        height: 32px;
        font-size: 12px;
        font-weight: 500;
        line-height: 32px;
        margin-right: 8px;
    }
`;

const Icon = styled.img`
    width: 20px;
    height: 23px;
    margin-right: 8px;
`;

const MainImage = styled.img`
    width: 699.6px;
    height: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 110px;
    margin-left: 10px;
    @media (max-width: 1135px) {
        display: none;
    }
`;

const MainDescription = styled.div`
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-bottom: 78px;
`;

const MainDescriptionTitle = styled.div`
    width: 100%;
    height: 53px;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 48px;
    font-weight: 700;
    margin-top: 112px;
    @media (max-width: 781px) {
        font-size: 38px;
        font-weight: 700;
        line-height: 32px;
        letter-spacing: -0.03em;
        text-align: center;
        margin-top: 64px;
    }
    @media (max-width: 591px) {
        font-size: 32px;
        font-weight: 700;
        line-height: 32px;
        letter-spacing: -0.03em;
        text-align: center;
        margin-top: 64px;
    }
`;

const MainDescriptionContent = styled.div`
    height: 51px;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-top: 16px;
    margin-bottom: 56px;
    color: rgba(210, 220, 240, 1);
    @media (max-width: 591px) {
        font-size: 26px;
        font-weight: 700;
        line-height: 36px;
        letter-spacing: -0.03em;
        text-align: center;
        margin-top: 8px;
        margin-bottom: 56px;
        color: rgba(210, 220, 240, 1);
    }
`;

const MainDescriptionContainer = styled.img`
    width: 909px;
    height: auto;
    max-width: 1150px;
    border-radius: 32px;
    margin: 0 auto; /* 좌우 중앙 정렬을 위해 추가 */
    margin-bottom: 20px;
    @media (max-width: 591px) {
        width: 100%;
        height: 100%;
    }
`;

const Button = styled.div`
    width: 178px;
    height: 57px;
    border-radius: 10px;
    background-color: transparent;
    border: 1.3px solid rgba(50,144,255,1);
    color: rgba(50,144,255,1);
    font-size: 17px;
    font-weight: 700;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto; /* 좌우 중앙 정렬을 위해 추가 */
    position: relative;
    bottom: 130px;
    cursor: pointer;
    @media (max-width: 591px) {
        width: 96px;
        height: 32px;
        font-size: 12px;
        font-weight: 700;
        line-height: 32px;
        letter-spacing: -0.03em;
        text-align: center;
        position: relative;
        bottom: 80px;
        cursor: pointer;
    }
`;

const MainImgArea = styled.div`
    width: 100%;
    background-image: url(${mainImg2});
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const MainImgTitle = styled.div`
    width: 100%;
    font-size: 48px;
    font-weight: 700;
    line-height: 62px;
    letter-spacing: -0.03em;
    text-align: center;
    white-space: pre-line;
    color: rgba(255, 255, 255, 1);
    margin: 0 auto; /* 좌우 중앙 정렬을 위해 추가 */
    margin-top: 104px;
    @media (max-width: 591px) {
        font-size: 28px;
        font-weight: 700;
        line-height: 32px;
        letter-spacing: -0.03em;
        text-align: center;
        margin-top: 104px;
    }
`;

const Small = styled.span`
    font-size: 40px;
    font-weight: 700;
    line-height: 52px;
    letter-spacing: -0.03em;
    text-align: center;
    @media (max-width: 591px) {
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
        letter-spacing: -0.03em;
        text-align: center;
    }
`;

const MainImgContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 0 auto; /* 좌우 중앙 정렬을 위해 추가 */
    margin-top: 74px;
    @media (max-width: 1135px) {
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const MainImgContentOuter = styled.div`
    width: 352px;
    height: 428px;
    border-radius: 20px;
    margin-right: 39px;
    @media (max-width: 1150px) {
        margin-top: 16px;
    }
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px;
`;

const MainImgButtonArea = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 57px;
    margin-bottom: 76px;
`;

const MainImgButton = styled.div`
    width: 212px;
    height: 61px;
    color: rgba(255, 255, 255, 1);
    font-size: 17px;
    font-weight: 700;
    border: 1.3px solid #ffffff;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: rgba(243, 233, 255, 0.03);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
`;

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
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-top: 104px;
    margin-bottom: 104px;
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

const MainBannerArea = styled.div`
    height: 100%;
    background: linear-gradient(180deg, #010101 0%, #010101 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const BannerButtonArea = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 42px;
    @media (max-width: 781px) {
        margin-top: 16px;
        margin-bottom: 32px;
    }
    @media (max-width: 591px) {
        margin-top: 16px;
        margin-bottom: 32px;
    }
`;

const BannerButton = styled.div`
    width: 178px;
    height: 57px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    font-size: 17px;
    font-weight: 700;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @media (max-width: 781px) {
        width: 128px;
        height: 42px;
        font-size: 14px;
        font-weight: 700;
        line-height: 32px;
        letter-spacing: -0.03em;
        text-align: center;
    }
    @media (max-width: 591px) {
        width: 108px;
        height: 32px;
        font-size: 12px;
        font-weight: 700;
        line-height: 32px;
        letter-spacing: -0.03em;
        text-align: center;
    }
`;

const BannerText = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    margin-top: 42px;
    background: linear-gradient(92.34deg, #D0E6FF 21.01%, #8EFFB5 75.27%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    @media (max-width: 781px) {
        font-size: 32px;
        font-weight: 700;
        line-height: 32px;
        letter-spacing: -0.03em;
        text-align: center;
        margin-top: 42px;
    }
    @media (max-width: 591px) {
        font-size: 20px;
        font-weight: 700;
        line-height: 32px;
        letter-spacing: -0.03em;
        text-align: center;
        margin-top: 42px;
    }
`;

const BottomBannerText = styled.div`
    font-size: 32px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: -0.03em;
    text-align: center;
    color: 'rgba(255, 255, 255, 1)';
    margin-top: 52px;
    margin-bottom: 52px;
    @media (max-width: 781px) {
        font-size: 24px;
        margin-top: 32px;
        margin-bottom: 32px;
    }
    @media (max-width: 591px) {
        font-size: 20px;
        margin-top: 32px;
        margin-bottom: 32px;
    }
`;

