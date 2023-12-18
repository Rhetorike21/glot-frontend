import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "../../components/Header";

export default function PricingInfo() {
    const navigate = useNavigate();
    const price = 18000;

    const onClickBasic = () => {
        navigate('/payment/basic');
    }

    const onClickEnterprise = () => {
        navigate('/payment/enterprise');
    }

    return(
        <Container>
            <Header />
            <TextArea>
                <Title>
                    가장 합리적인 가격의{'\n'}
                    GLOT(General Logic of Text) 인공 지능(AI)으로{'\n'}
                    최고가 되어보세요.
                </Title>
            </TextArea>
            <BannerArea>
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
                            ✔️ 작문 내역 문서 다운로드 <Small>(PDF, JPG, TXT)</Small>{'\n'}
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
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
`;

const TextArea = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 96px;
`;

const Title = styled.div`
    width: 100%;
    height: 100%;
    font-size: 36px;
    font-weight: 700;
    line-height: 50.4px;
    letter-spacing: -0.03em;
    text-align: center;
    color: rgba(17, 17, 17, 1);
    white-space: pre-line;
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