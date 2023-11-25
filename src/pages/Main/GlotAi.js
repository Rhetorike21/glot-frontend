import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import TopBar from '../../components/Main/TopBar';
import MainFooter from '../../components/Main/MainFooter';

import mainImg from '../../asset/GLOTAIMain.png';
import background from '../../asset/wholeBack.png';
import banner from '../../asset/GlotBanner.png';
import AppStore from '../../asset/AppStore.png';
import PlayStore from '../../asset/PlayStore.png';
import vector from '../../asset/whiteVector.png';
import img1 from '../../asset/image1.png';
import img2 from '../../asset/image2.png';
import img3 from '../../asset/image3.png';

export default function GlotAi() {
    const navigate = useNavigate();

    const onClickStart = () => {
        // window.open("http://localhost:3000/writing", "_blank");
        navigate('/writing');
    }

    return(
        <MainContainer>
            <TopBar />
            <MainBanner>
                <Title>
                    통찰력과 GLOT(General Logic of Text)의 만남,{"\n"}
                    생산적인 글쓰기, 높아지는 논리력
                </Title>
                <Button
                    onClick={onClickStart}
                >
                    시작하기
                    <img 
                        src={vector}
                        alt='vector'
                        style={{
                            width: '18px',
                            height: '15px',
                            marginLeft: '8px',
                        }}
                    />
                </Button>
            </MainBanner>
            <MainContent>
                <ContentBackground>
                    {/* <MainBox>
                        <BoxContent
                            style={{
                                marginBottom: '100px',
                            }}
                        >
                            <BoxTitle>
                                작성자가 주도적으로 글 리드(lead)하는.
                            </BoxTitle>
                            <BoxDescription>
                                다음 문장을 이어가는 것이 어렵다면 '클릭(click)'하세요.{'\n'}
                                학습자는 발전형, 반대형, 결론형을 선택하여{'\n'}
                                글의 방향을 주도적으로 이어갈 수 있습니다.
                            </BoxDescription>
                        </BoxContent>
                        <BoxImage/>
                    </MainBox>
                    <MainBox>
                        <BoxImage
                            style={{
                                width: '368px',
                                height: '306px',
                                marginRight: '100px',
                            }}
                        />
                        <BoxContent
                            style={{
                                width: '566px',
                                height: '205px',
                                marginBottom: '160px',
                            }}
                        >
                            <BoxTitle
                                style={{
                                    textAlign: 'right',
                                }}
                            >
                            스마트(smart)한 문장 추천.
                            </BoxTitle>
                            <BoxDescription
                                style={{
                                    textAlign: 'right',
                                }}
                            >
                                글을 쉽게 이어나가고 싶으신가요?{'\n'}
                                GLOT(General Logic of Text) 인공 지능(AI)은{'\n'}
                                문장의 논리 구조를 분석하여 다음에 이어질 수 있는 문장을 추천해드립니다.{'\n'} 
                                마음에 드는 문장을 클릭(click) 하세요.
                            </BoxDescription>
                        </BoxContent>
                    </MainBox>
                    <MainBox>
                     
                    </MainBox> */}
                    <img src={background} alt='background' style={{width: '100%', height: '100%'}}/>
                </ContentBackground>
                <MainText>
                    <Text
                        style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            color: 'rgba(151, 152, 154, 1)'
                        }}
                    >
                        내가 쓴 문장과 다음 문장의 관계는 어떻게 이루어질까?{'\n'}
                        다음 문장을 어떻게 이어나가면 좋을까?{'\n'}
                    </Text>
                    <Text
                        style={{
                            fontSize: '32px',
                            fontWeight: '700',
                            color: 'rgba(50, 144, 255, 1)'
                        }}
                    >
                        GLOT Writing은 글을 작성하는 동안 글쓰기의 노하우를 전달합니다.{'\n'}
                    </Text>
                    <Text
                        style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: 'rgba(60, 61, 63, 1)'
                        }}
                    >
                        사용자가 주도적으로 글을 작성하는 동안 앞으로 이어질 글의 방향,{"\n"}
                        문장과 문장, 문단과 문단의 관계에 대하여 가이드(guide)를 제공합니다.{'\n'}
                    </Text>
                </MainText>
                <MainBox
                    style={{
                        width: '1137.6px',
                        height: '542.7px',
                    }}
                >
                    <img src={img3} alt='img3' style={{width: '1137.6px', height: '542.7px'}}/>
                </MainBox>
                <MainBox
                    style={{
                        width: '1137px',
                        height: '603px',
                        marginTop: '24px',
                        marginBottom: '56px',
                    }}
                >
                    <BoxContent
                        style={{
                            width: '556.5px',
                            height: '603px',
                            marginRight: '24px',
                        }}
                    >
                        <img src={img2} alt='img2' style={{width: '556.5px', height: '603px'}}/>
                    </BoxContent>
                    <BoxContent
                        style={{
                            width: '556.5px',
                            height: '603px',
                            borderRadius: '24px',
                        }}
                    >
                        <img src={img1} alt='img1' style={{width: '556.5px', height: '603px'}}/>
                    </BoxContent>
                </MainBox>
            </MainContent>
            <MainBanner
                style={{
                    backgroundImage: `url(${banner})`,
                    height: '210px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <BannerText>
                    GLOT App Download
                </BannerText>
                <ButtonArea>
                    <DownButton>
                        <Icon src={AppStore} alt='appStore'/>App Store
                    </DownButton>
                    <DownButton>
                        <Icon src={PlayStore} alt='playStore' />Play Store
                    </DownButton>
                </ButtonArea>
            </MainBanner>
           <MainFooter />
        </MainContainer>
    )
}

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MainBanner = styled.div`
    width: 100%;
    height: 226px;
    background-image: url(${mainImg}); // mainImg를 배경 이미지로 설정
    background-size: cover; // 배경 이미지를 꽉 채우도록 설정
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const Title = styled.div`
    width: 552px;
    height: 78px;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #FFFFFF;
    text-align: left;
    white-space: pre-line;
`;

const Button = styled.div`
    width: 113px;
    height: 24px;
    font-size: 22px;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    cursor: pointer;
`;

const MainContent = styled.div`
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MainBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentBackground = styled.div`
    width: 1150px;
    height: 100%;
    background-size: cover;
    display: flex;
    flex-direction: column;
`;


const BoxContent = styled.div`
    width: 484px;
    height: 169px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const BoxTitle = styled.div`
    font-size: 32px;
    font-weight: 600;
    line-height: 44.8px;
    letter-spacing: -0.03em;
    color: rgba(60, 61, 63, 1);
    text-align: left;
`;

const BoxDescription = styled.div`
    font-size: 20px;
    font-weight: 500;
    line-height: 36px;
    letter-spacing: -0.03em;
    color: rgba(60, 61, 63, 1);
    text-align: left;
    white-space: pre-line;
    margin-top: 16px;
`;

const BoxImage = styled.div`
    width: 649px;
    height: 461px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 62px;
`;

const MainText = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-bottom: 61px;
`;

const Text = styled.div`
    width: 100%;
    height: 100%;
    line-height: 43.2px;
    letter-spacing: -0.03em;
    color: rgba(60, 61, 63, 1);
    text-align: center;
    white-space: pre-line;
    margin-bottom: 40px;
`;

const BannerText = styled.div`
    font-size: 30px;
    font-weight: 700;
    line-height: 50px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin-bottom: 12px;
`;

const ButtonArea = styled.div`
    width: 264px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
`;

const Icon = styled.img`
    width: 20px;
    height: 23px;
    margin-right: 8px;
`;

