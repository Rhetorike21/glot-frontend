import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useCookies } from "react-cookie";
import { UserType, LoginState } from "../data/Atom";
import {useRecoilState} from "recoil";

import Dropdown from "../components/Writing/Dropdown";

import LogoutApi from "../services/Logout";

import logo from "../asset/GLOT logo.png";
import open from '../asset/dropOpen.png';
import close from '../asset/dropClose.png';
import menu from '../asset/menu.png';

export default function Header(props) {
    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    });

    const navigate = useNavigate();
    
    const [isMenuOpen, setIsMenuOpen] = useState(false); //dropdown 제어
    const [userType, setUserType] = useRecoilState(UserType);
    const [loginState, setLoginState] = useRecoilState(LoginState);
    const [cookies, setCookie, removeCookie] = useCookies(); 

    const onClickLogin = () => {
        navigate('/login');
    }

    const onClickLogout = async () => {
        try {
            const auth = localStorage.getItem('token');
            const refresh = cookies.token;
            await LogoutApi(auth, refresh);
        } catch (error) {
          console.error('로그아웃 중 오류 발생:', error);
        }
        removeCookie('token');
        localStorage.removeItem('token');
        setLoginState(false);
        setUserType('FREE');
        alert('로그아웃 되었습니다.');
        window.location.reload();
      };

    const onClickMyPage = () => {
        navigate('/mypage');
    }

    const onClickPayment = () => {
        navigate('/payment');
    }

    const onClickLogo = () => {
        navigate('/');
    }

    return (
        <Container>
            <LogoArea>
                <Icon src={menu} onClick={() => {props.setIsSideBarOpen(true)}} />
                <Logo src={logo} onClick={onClickLogo} />
            </LogoArea>
            <MenuArea>
                <Menu onClick={() => {setIsMenuOpen(!isMenuOpen)}}> 
                    GLOT<Bold>Writing</Bold><img src={isMenuOpen ? close : open} alt='open' style={{width: '11px', height: '6px', marginLeft: '8px'}} />
                    {isMenuOpen && <Dropdown />}
                </Menu>
            </MenuArea>
            <ButtonOuter>
                <ButtonArea>
                    {loginState ? (
                        <>
                            <Button
                                onClick={onClickPayment}
                                style={{
                                    display: isMobile ? "none" : "block",
                                }}
                            >
                                요금제 플랜
                            </Button>
                            {isMobile ? (
                                <Button onClick={onClickLogout}>
                                    로그아웃
                                </Button>
                            ) : (
                                <Button onClick={onClickMyPage}>
                                    마이페이지
                                </Button>
                            )}
                        </>
                    ) : (
                    <>
                        <Button
                            onClick={onClickPayment}
                            style={{
                                display: isMobile ? "none" : "block",
                            }}
                        >
                            요금제 플랜
                        </Button>
                        <Button onClick={onClickLogin}>
                            로그인
                        </Button>
                    </>
                    )}
                </ButtonArea>
            </ButtonOuter>
        </Container>
    );
}

const Container = styled.div`
    width: calc(100% - 2px);
    height: 80px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(242, 243, 245, 1);
    box-shadow: 0px 3px 7px 0px #00000008;
`;

const LogoArea = styled.div`
    width: 75px;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 28px;
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
    display: none;
    @media (max-width: 768px) {
        display: block;
    }
`;


const Logo = styled.img`
    width: 73px;
    cursor: pointer;
`;

const MenuArea = styled.div`
    width: 153px;
    margin-left: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        display: none;
    }
`;

const Menu = styled.div`
    width: 153px;
    height: 44px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: -0.04em;
    &:hover {
        background-color: rgba(242, 243, 245, 1);
    }
`;

const Bold = styled.span`
    font-weight: 700;
    margin-left: 5px;
`;

const ButtonOuter = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: 50px;
`;

const ButtonArea = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Button = styled.div`
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    margin-right: 40px;
`;
