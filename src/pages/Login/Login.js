import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';

import LoginApi from '../../services/Login';
import { LoginState, UserType } from '../../data/Atom';

import CheckBox from '../../components/CheckBox';
import WarningModal from '../../components/Modal/WarningModal';

import logo from '../../asset/GLOT logo.png';

export default function Login() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const inputRef = useRef();

    const [idRemember, setIdRemember] = useState(false); //아이디 저장
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [isLogin, setIsLogin] = useRecoilState(LoginState);
    const [userType, setUserType] = useRecoilState(UserType);
    const [isModalOpen, setIsModalOpen] = useState(false); //팝업창 제어

    /*아이디 저장 관련 쿠키 선언*/
    const [cookies, setCookie, removeCookie] = useCookies(['idRemember']);

    useEffect(() => {
        if (cookies.idRemember !== undefined) {
            setUserId(cookies.idRemember);
            setIdRemember(true);
        }
        inputRef.current.focus();
    }, []);

    const activeEnter = (e) => {
        if(e.key === 'Enter') {
            onClickLogIn();
        }
    }

    const onClickLogo = () => {
        navigate('/writing');
    }

    const onClickLogIn = async (event) => {
        if (event) {
            event.preventDefault();
        }
        try {
            const response = await LoginApi(userId, userPw);
            console.log(response);
            setCookie('token', response.token.refreshToken, { path: '/' })
            localStorage.setItem('token', response.token.accessToken);
            setIsLogin(true);
            setUserType(response.subStatus);
            if (idRemember) {
                // 아이디 저장이 체크되어 있으면 쿠키에 아이디 저장
                setCookie('idRemember', userId, { path: '/' });
            } else {
                // 아이디 저장 체크가 해제되었을 때 쿠키 제거
                removeCookie('idRemember');
            }
            navigate('/writing');
        }
        catch (error) {
            setIsModalOpen(true);
        }
    }

    const onClickIdSearch = () => {
        navigate('/member/idsearch');
    }

    const onClickChangePw = () => {
        navigate('/member/changepw');
    }

    const onClickSignUp = () => {
        navigate('/member/signup');
    }

    return(
        <Container>
            <InputArea>
                <LogoArea>
                    <Logo src={logo} onClick={onClickLogo}/>
                </LogoArea>
                <Title>
                    GLOT 로그인하기
                </Title>
                <SubTitle>
                    GLOT(General Logic of Text) Login
                </SubTitle>
                <InnerContainer>
                    <InputContainer>
                        <Naming>
                            아이디
                        </Naming>
                        <Input 
                            placeholder="아이디를 입력해주세요"
                            type='text'
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            ref={inputRef}
                        >
                        </Input>
                    </InputContainer>
                    <InputContainer>
                        <Naming>
                            비밀번호
                        </Naming>
                        <Input 
                            placeholder="비밀번호를 입력해주세요"
                            type='password'
                            value={userPw}
                            onChange={(e) => setUserPw(e.target.value)}
                            onKeyDown={(e) => activeEnter(e)}
                        >
                        </Input>
                    </InputContainer>
                    <CheckArea>
                        <CheckBox
                            checked={idRemember}
                            onChange={setIdRemember}
                        />
                        <CheckText
                            onClick={() => setIdRemember(!idRemember)}
                        >
                            아이디저장
                        </CheckText>
                    </CheckArea>
                    <LoginButton onClick={onClickLogIn}>
                        로그인
                    </LoginButton>
                    <SubArea>
                        <SearchButton>
                            <SubButton onClick={onClickSignUp}>
                                회원가입
                            </SubButton>
                            <SubButton onClick={onClickIdSearch}>
                                아이디 찾기
                            </SubButton>
                            <SubButton 
                                onClick={onClickChangePw}
                                style={{borderRight: 'none'}}
                            >
                                비밀번호 변경
                            </SubButton>
                        </SearchButton>
                    </SubArea>
                </InnerContainer>
            </InputArea>
            {isModalOpen && (<WarningModal setIsModalOpen={setIsModalOpen} text='로그인 정보가 올바르지 않습니다. 아이디와 비밀번호를 확인한 후 다시 시도해 주십시오.'/>)}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LogoArea = styled.div`
    width: 100%;
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    width: 127px;
    height: 56px;
`;

const InputArea = styled.div`
    width: 700px;
    height: 100%;
    background-color: #FFFFFF;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.div`
    width: 100%;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.5px;
    text-align: center;
    white-space: pre-line;
`;

const SubTitle = styled.div`
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.5px;
    text-align: center;
    white-space: pre-line;
    margin-top: 10px;
    color: #b7b8ba;
`;

const InnerContainer = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 28px;
`;

const Naming = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 6px;
    margin-left: 3px;
    color: rgba(111, 112, 113, 1);
`;

const Input = styled.input`
    width: 385px;
    height: 48px;
    border: 1px solid rgba(234, 235, 237, 1);
    border-radius: 10px;
    padding-left: 15px;
    font-size: 13px;
    font-weight: 400;
    ::placeholder {
        color: rgba(183, 184, 186, 1);
    }
`;

const CheckArea = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const CheckText = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #6f7071;
    margin-left: 5px;
`;

const SubArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 20px;
`;

const SearchButton = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const SubButton = styled.button`
    width: 100px;
    height: 14px;
    cursor: pointer;
    border: none;
    border-right: 1px solid #eaebed;
    background-color: #FFFFFF;
    cursor: pointer;
    color: #595959;
    font-size: 13px;
    font-weight: 400;
`;

const LoginButton = styled.div`
    width: 100%;
    height: 56px;
    border: none;
    border-radius: 10px;
    background-color: #3290ff;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    margin-top: 30px;
    cursor: pointer;
`;
