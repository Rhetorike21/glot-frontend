import React from "react";
import styled from "styled-components";

import mainLogo from "../../asset/mainLogo.png";

export default function MainFooter() {
    return (
        <Container>
            <Content>
                <Logo>
                    <img src={mainLogo} alt="logo" width="153.56px" height="20px" />
                </Logo>
                <Description>
                    <Title href="https://rhetorike.notion.site/ff6b3077e9124da1b5d61684c86c9f66" target='_blank'>
                        개인정보처리방침
                    </Title>
                    <Script
                        style={{
                            marginBottom: '11px',
                        }}
                    >
                        상호 : (주)레토리케 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;대표 : 김상진, 김세현
                    </Script>
                    <Script
                        style={{
                            marginBottom: '12px',
                        }}
                    >
                        주소 : 서울특별시 종로구 세종대로 23길 47, 603-451호
                    </Script>
                    <Script
                        style={{
                            marginBottom: '19px',
                        }}
                    >
                        사업자 등록번호 : 670-86-02140
                    </Script>
                    <Script>
                        Copyright(c) 2023 Rhetorike corp. All Rights reserved.
                    </Script>
                </Description>
            </Content>
        </Container>
    );
    }



const Container = styled.div`
    width: 100%;
    height: 308px;
    display: flex;
    justify-content: center;
    text-align: center;
`;

const Content = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.div`
    width: 153.56px;
    height: 20px;
    margin-top: 48px;
    margin-bottom: 36px;
`;

const Description = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Title = styled.a`
    width: 100%;
    height: 15px;
    line-height: 17.9px;
    font-size: 15px;
    font-weight: 700;
    color: rgba(151, 152, 154, 1);
    margin-bottom: 22px;
`;

const Script = styled.div`
    font-size: 13px;
    font-weight: 400;
    line-height: 15.51px;
    color: rgba(151, 152, 154, 1);
    margin-bottom: 11px;
`;


