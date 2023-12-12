import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { LoginState } from '../../data/Atom';

import TopBar from '../../components/Main/TopBar';
import MainFooter from '../../components/Main/MainFooter';

import banner from '../../asset/pricingbanner.png';
import vector from '../../asset/Vector.png';

export default function Pricing() {
    const navigate = useNavigate();

    const price = 18000;
    const isLogin = useRecoilValue(LoginState);

    const onClickBasic = () => {
        // if(!isLogin){
        //     alert('로그인 후 이용해주세요.');
        //     navigate('/login');
        //     return;
        // }
        // else{
        //     navigate('/payment/basic');
        // }
        alert('준비 중입니다.')
    }

    const onClickEnterprise = () => {
        // if(!isLogin){
        //     alert('로그인 후 이용해주세요.');
        //     navigate('/login');
        //     return;
        // }
        // else{
        //     navigate('/payment/enterprise');
        // }
        alert('준비 중입니다.')
    }

    return(
        <MainContainer>
            <TopBar />
            <Content>
                <TitleArea>
                    <Title>
                        <TitleSentence>
                            <div className='bold'>GLOT Writing.&nbsp;</div>선택하고 변형하면서{'\n'}
                        </TitleSentence>
                        <TitleSentence>
                            완성하는 텍스트(text)의 작문
                        </TitleSentence>
                    </Title>
                    <Button
                        onClick={() => {
                            window.open("https://www.heyglot.com/writing", "_blank");
                        }}
                    >
                        무료 체험하기
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
                </TitleArea>
                <ContentArea>
                    <Sentence>
                        <div className="highlight">하나, </div> 원하는 문장을 입력하면 GLOT Writing이 전개 유형들을 추천해 주어요.{'\n'}
                    </Sentence>
                    <Sentence>
                        <div className='highlight'>둘, </div> 전개 유형들 중에서 하나를 선택하면, GLOT Writing이 사용자가 선택한 전개 유형에 해당하는 문장들을 추천해 주어요.{'\n'}
                    </Sentence>
                    <Sentence>
                        <div className='highlight'>셋, </div> 전개 유형에 해당하는 문장들 중에서 하나를 선택하거나 전개 유형에 해당하는 문장을 직접 입력하면서, 원하는 작문을 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;완성하세요.
                    </Sentence>
                </ContentArea>
                <ImageArea>
                    <img
                        src={banner}
                        alt='banner'
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '30px',
                        }}
                    />
                </ImageArea>
                <TextArea>
                    GLOT Writing 1.0의 고객에 대한 배려{'\n'}
                    <Bold>사용자를 배려한 여러 가지 GLOT Writing</Bold>
                </TextArea>
                <BannerArea>
                    <Banner>
                        <BannerTitle
                            style={{
                                backgroundColor: 'rgba(229, 213, 68, 1)',
                                color: 'rgba(255, 255, 255, 1)'
                            }}
                        >
                            GLOT 게스트
                        </BannerTitle>
                        <BannerPrice>
                            무료
                        </BannerPrice>
                        <BannerContent>
                            ✔️ 작문 입력 <Small>(글자 수 제한)</Small>{'\n'}
                            {'\n'}
                            {'\n'}
                            ✔️ 트래픽에 따른 서비스 이용 속도 제한{'\n'}
                            {'\n'}
                            {'\n'}
                            ✔️ GLOT Writing 초급 레벨 제공{'\n'}
                            {'\n'}
                            {'\n'}
                            ✔️ PDF 다운로드 제공
                        </BannerContent>
                    </Banner>
                    <Banner>
                        <BannerTitle
                            style={{
                                backgroundColor: 'rgba(50, 144, 255, 1)',
                                color: 'rgba(255, 255, 255, 1)'
                            }}
                        >
                            GLOT 베이직
                        </BannerTitle>
                        <BannerPrice>
                            {new Intl.NumberFormat().format(price)}<Small style={{ fontSize: '28px', lineHeight: '32px', marginBottom: '3px'}}>원</Small><Gray>/월</Gray>
                        </BannerPrice>
                        <BannerContent>
                            ✔️ 작문 입력 <Small>(글자 수 무제한)</Small>{'\n'}
                            {'\n'}
                            {'\n'}
                            ✔️ 작문 내역 메모리 제공 (최근 100건 보관){'\n'}
                            {'\n'}
                            {'\n'}
                            ✔️ 작문 내역 문서 다운로드 <Small>(DOC, PDF, JPG, TXT)</Small>{'\n'}
                            {'\n'}
                            {'\n'}
                            ✔️ 작문 내역 인쇄 기능 제공{'\n'}
                            {'\n'}
                            {'\n'}
                            ✔️ 연 요금제 30% 할인 혜택 적용
                        </BannerContent>
                        <ButtonContent>
                            <CheckButton
                                style={{
                                    backgroundColor: 'rgba(50, 144, 255, 1)',
                                }}
                                onClick={onClickBasic}
                            >
                                GLOT 베이직 구매하기
                            </CheckButton>
                        </ButtonContent>
                    </Banner>
                    <Banner>
                        <BannerTitle
                            style={{
                                backgroundColor: 'rgba(255, 102, 102, 1)',
                                color: 'rgba(255, 255, 255, 1)'
                            }}
                        >
                            GLOT 엔터프라이즈
                        </BannerTitle>
                        <BannerPrice>
                            {new Intl.NumberFormat().format(price*0.8)}<Small style={{ fontSize: '28px', lineHeight: '32px', marginBottom: '3px'}}>원</Small><Gray>/월, 유저당</Gray>
                        </BannerPrice>
                        <BannerContent>
                            <Bold
                                style={{
                                    fontSize: '20px',
                                }}
                            >
                                Everything in Plus.
                            </Bold>{'\n'}
                            {'\n'}
                            {'\n'}
                            ✔️ 교육 기관 가입 요금제{'\n'} 
                            <Small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(10개 이상의 계정 단체 등록 시 혜택 적용)</Small>{'\n'}
                            {'\n'}
                            {'\n'}
                            ✔️ 교육 전용 계정 할인 적용{'\n'}
                            <Small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(월 기준 20%, 연 요금제 30% 할인 혜택 적용)</Small>
                        </BannerContent>
                        <ButtonContent>
                            <CheckButton
                                style={{
                                    backgroundColor: 'rgba(255, 102, 102, 1)',
                                }}
                                onClick={onClickEnterprise}
                            >
                                GLOT 엔터프라이즈 구매하기
                            </CheckButton>
                        </ButtonContent>
                    </Banner>
                </BannerArea>
            </Content>
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

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(242, 243, 245, 1);
`;

const TitleArea = styled.div`
    width: 1064px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 74px;
`;

const Title = styled.div`
    width: 100%;
`;

const TitleSentence = styled.div`
    width: 100%;
    font-size: 48px;
    font-weight: 400;
    line-height: 67.2px;
    letter-spacing: -0.03em;
    text-align: left;
    color: rgba(17, 17, 17, 1);
    white-space: pre-line;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div.bold {
        font-weight: 700;
    }
`;

const Button = styled.div`
    width: 200px;
    height: 22px;
    cursor: pointer;
    color: rgba(17, 17, 17, 1);
    font-size: 22px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.03em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`;

const ContentArea = styled.div`
    width: 1064px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    white-space: pre-line;
    margin: 0 auto;
    margin-top: 52px;
    div.highlight {
        color: rgba(50, 144, 255, 1); // 변경하고자 하는 색상으로 설정
        display: inline; // 줄바꿈 방지
    }
`;

const Sentence = styled.div`
    width: 100%;
    font-size: 23px;
    font-weight: 500;
    line-height: 52.8px;
    letter-spacing: -0.03em;
    color: rgba(60, 61, 63, 1);
    white-space: pre-line;
`;

const ImageArea = styled.div`
    width: 1064px;
    height: 574px;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 1);
    margin: 0 auto;
    margin-top: 28px;
`;

const TextArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 40px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.03em;
    color: rgba(17, 17, 17, 1);
    white-space: pre-line;
    margin-top: 82px;
`;

const Line = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-size: 40px;
    font-weight: 500;
    letter-spacing: -0.03em;
    color: rgba(17, 17, 17, 1);
    white-space: pre-line;
    div.highlight {
        font-size: 32px;
        line-height: 44.8px;
    }
`;

const BannerArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 53px;
    margin-bottom: 96px;
`;

const Banner = styled.div`
    width: 385px;
    height: 560px;
    border-radius: 24px;
    background-color: rgba(255, 255, 255, 1);
    margin: 0 18px;
    box-shadow: 0px 5px 60px 0px rgba(62, 96, 130, 0.16);
`;

const BannerTitle = styled.div`
    width: 100%;
    height: 64px;
    font-size: 24px;
    font-weight: 600;
    line-height: 33.6px;
    letter-spacing: -0.03em;
    text-align: center;
    color: rgba(17, 17, 17, 1);
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BannerPrice = styled.div`
    width: calc(100% - 48px);
    height: 52px;
    padding-top: 16px;
    padding-bottom: 24px;
    padding-left: 24px;
    padding-right: 24px;
    font-size: 32px;
    font-weight: 600;
    line-height: 38px;
    letter-spacing: -0.03em;
    text-align: center;
    color: rgba(17, 17, 17, 1);
    display: flex;
    justify-content: flex-start;
    align-items: end;
    border-bottom: 1px solid rgba(242, 243, 245, 1);
`;

const BannerContent = styled.div`
    width: calc(100% - 48px);
    height: 244px;
    padding: 24px;
    font-size: 17px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: -0.03em;
    text-align: left;
    color: rgba(17, 17, 17, 1);
    white-space: pre-line;
`;

const Small = styled.span`
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: -0.03em;
    text-align: left;
    color: rgba(17, 17, 17, 1);
`;

const Check = styled.img`
    width: 15px;
    height: 13px;
    margin-right: 8px;
`;

const Bold = styled.span`
    font-weight: 700;
    letter-spacing: -0.03em;
    text-align: left;
    color: rgba(17, 17, 17, 1);
`;

const Gray = styled.span`
    font-size: 18px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: -0.03em;
    color: rgba(195, 202, 211, 1);
    margin-left: 3px;
    margin-bottom: 6px;
`;

const ButtonContent = styled.div`
    width: calc(100% - 48px);
    height: 56px;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CheckButton = styled.div`
    width: 100%;
    height: 56px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: -0.03em;
    display: flex;
    justify-content: center;
    align-items: center;
`;

