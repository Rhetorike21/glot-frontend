import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

import mainLogo from '../../asset/mainLogoBlack.png';

export default function TopBar() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const onClickLogo = () => {
        navigate('/');
    }

    const onClickMenu = (menu) => {
        if(menu === 'About') {
            navigate('/');
        } else if(menu === 'GLOT AI') {
            navigate('/glotai');
        } else if(menu === 'Pricing') {
            navigate('/pricing');
        }
    }

    const isMenuActive = (menu) => {
        return (location.pathname === '/' && menu === 'About') ||
       (location.pathname === '/glotai' && menu === 'GLOT AI') ||
       (location.pathname === '/pricing' && menu === 'Pricing');
    }

    const onClickStart = () => {
       //window.open("http://localhost:3000/writing", "_blank");
       navigate('/writing');
    }

    return (
        <MainTopBarOuter>
            <MainTopBarContainer>
                <MainTopBarLogo src={mainLogo} onClick={onClickLogo}>
                </MainTopBarLogo>
                <MainTopBarMenu>
                    <MainTopBarMenuList>
                        <MainTopBarMenuButton
                            onClick={() => onClickMenu('About')} 
                            active={isMenuActive('About')}
                            style={{
                                width: '100px',
                            }}
                        >
                            레토리케 소개
                        </MainTopBarMenuButton>
                        <MainTopBarMenuButton
                            onClick={() => onClickMenu('GLOT AI')} 
                            active={isMenuActive('GLOT AI')}
                            style={{
                                width: '70px',
                                marginLeft: '56px',
                            }}
                        >
                            GLOT AI
                        </MainTopBarMenuButton>
                        <MainTopBarMenuButton
                            onClick={() => onClickMenu('Pricing')} 
                            active={isMenuActive('Pricing')}
                            style={{
                                width: '65px',
                                marginLeft: '56px',
                            }}
                        >
                            Pricing
                        </MainTopBarMenuButton>
                    </MainTopBarMenuList>
                    <MainTopBarStartBtn onClick={onClickStart}>
                        GLOT AI 시작하기
                    </MainTopBarStartBtn>
                </MainTopBarMenu>
            </MainTopBarContainer>
        </MainTopBarOuter>
    );
}

const MainTopBarOuter = styled.div`
    width: 100%;
    height: 80px;
    border-bottom: 1px solid rgba(242, 243, 245, 1);
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainTopBarContainer = styled.div`
    width: 80%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const MainTopBarLogo = styled.img`
    width: 155.65px;
    height: 20.27px;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    color: #000000;
`;

const MainTopBarMenu = styled.div`
    margin-left: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const MainTopBarMenuList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1010px) {
        display: none;
    }
`;

const MainTopBarMenuButton = styled.div`
    font-size: 18px;
    font-weight: ${props => props.active ? 'bold' : 'normal'};
    cursor: pointer;
`;

const MainTopBarStartBtn = styled.button`
    padding: 13px 12px;
    border: none;
    border-radius: 10px;
    background-color: rgba(50, 144, 255, 1);
    color: #FFFFFF;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
`;
