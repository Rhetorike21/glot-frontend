import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

import mainLogo from '../../asset/mainLogoWhite.png';

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
                                marginLeft: '0px',
                            }}
                        >
                            GLOT과 AI
                        </MainTopBarMenuButton>
                        <MainTopBarMenuButton
                            onClick={() => onClickMenu('GLOT AI')} 
                            active={isMenuActive('GLOT AI')}
                        >
                            GLOT Writing
                        </MainTopBarMenuButton>
                        <MainTopBarMenuButton
                            onClick={() => onClickMenu('Pricing')} 
                            active={isMenuActive('Pricing')}
                        >
                            Pricing
                        </MainTopBarMenuButton>
                    </MainTopBarMenuList>
                    <MainTopBarStartBtn onClick={onClickStart}>
                        GLOT Writing 시작하기
                    </MainTopBarStartBtn>
                </MainTopBarMenu>
            </MainTopBarContainer>
        </MainTopBarOuter>
    );
}

const MainTopBarOuter = styled.div`
    width: 100%;
    height: 80px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainTopBarContainer = styled.div`
    width: 78%;
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
    margin-left: 56px;
    font-size: 18px;
    font-weight: ${props => props.active ? 'bold' : 'normal'};
    letter-spacing: -0.3px;
    cursor: pointer;
    color: #ffffff;
`;

const MainTopBarStartBtn = styled.button`
    padding: 13px;
    border: none;
    border-radius: 10px;
    background-color: rgba(50, 144, 255, 1);
    color: #FFFFFF;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: -0.3px;
`;
