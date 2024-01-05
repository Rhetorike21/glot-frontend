import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import logo from '../../asset/GLOT logo.png';

import EmailInput from '../../components/Signup/EmailInput';
import MobileEmailInput from '../../components/Signup/MobilEmailInput';

import EditModal from '../../components/Modal/ResultModal';
import Backdrop from '../../components/Modal/Backdrop';

import IdSearchMobileApi from '../../services/IdSearchMobile';
import IdSearchEmailApi from '../../services/IdSearchEmail';
import MobileCheckApi from '../../services/MobileAuthCode';
import MobileApi from '../../services/MobileAuth';

export default function Idsearch() {
    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    });

    const navigate = useNavigate();

    const [isResult, setIsResult] = useState(false); //아이디 찾기 결과 모달제어 변수

    const [selectMethod, setSelectMethod] = useState('휴대폰');
    const [userName, setUserName] = useState(''); //이름
    const [userMobile, setUserMobile] = useState(''); //휴대폰번호
    const [userMobileCode, setUserMobileCode] = useState(''); //인증번호
    const [userEmail, setUserEmail] = useState(''); //이메일
    const [isAuth, setIsAuth] = useState(false); //인증여부
    const [searchResult, setSearchResult] = useState([])

    const onClickCancel = () => {
        navigate('/login');
    }

    const onClickAuth = async () => {
        try {
            if(window.confirm(`${userMobile}로 인증번호를 전송합니다.`)){
                alert("인증번호가 전송 되었습니다.");
                const response = await MobileApi(userMobile);
            }else{
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onClickCheckCode = async () => {  
        try {
            const response = await MobileCheckApi(userMobileCode);

            if (response.data.success) {
                setIsAuth(true);
                alert('인증되었습니다.');
            } else {
                throw new Error('인증번호가 일치하지 않습니다.');
            }
        } catch (error) {
            alert(error.message || '인증번호가 일치하지 않습니다.');
        }
    }

    const onClickFindId = async () => {
        if (selectMethod === '휴대폰') {
            try {
                const response = await IdSearchMobileApi(userName, userMobile, userMobileCode);
                console.log(response);
                setSearchResult(response);
                setIsResult(true);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await IdSearchEmailApi(userName, userEmail);
                console.log(response)
                alert('입력하신 이메일로 일치하는 아이디 정보를 발송했습니다.');
                navigate('/login');
            } catch (error) {
                console.log(error);
            }
        }
    }


    const handleSelectMethod = (selectMethod) => {
        setSelectMethod(selectMethod);
        setUserName('');
    }

    return(
        <Container>
            <InputArea>
                <InnerContainer>
                    <LogoArea>
                        <Logo src={logo}/>
                    </LogoArea>
                    <Title>
                        아이디 찾기
                    </Title>
                    <SubTitle>
                        아이디 찾을 방법을 선택하세요.
                    </SubTitle>
                    <SelectBox>
                        <SelectButton onClick={() => handleSelectMethod('휴대폰')} selectMethod={selectMethod}>
                            휴대폰
                        </SelectButton>
                        <SelectButton onClick={() => handleSelectMethod('이메일')} selectMethod={selectMethod}>
                            이메일
                        </SelectButton>
                    </SelectBox>
                    {selectMethod === '휴대폰' ? (
                        <InputContainer>
                            <Naming>
                                이름
                            </Naming>
                            <InputOuter>
                                <Input
                                    placeholder="이름을 입력해주세요"
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </InputOuter>
                            <Naming>
                                휴대폰번호
                            </Naming>
                            <InputOuter>
                                <Input
                                    placeholder='휴대폰번호를 입력해주세요'
                                    type='text'
                                    value={userMobile}
                                    onChange={(e) => setUserMobile(e.target.value)}
                                    style={{ width: "73%"}}
                                />
                                <InputButton onClick={onClickAuth}>
                                    인증
                                </InputButton>
                            </InputOuter>
                            <Naming>
                                인증번호
                            </Naming>
                            <InputOuter>
                                <Input
                                    placeholder='인증번호를 입력하세요'
                                    type='text'
                                    value={userMobileCode}
                                    onChange={(e) => setUserMobileCode(e.target.value)}
                                    style={{ width: "73%"}}
                                />
                                <InputButton onClick={onClickCheckCode}>
                                    확인
                                </InputButton>
                            </InputOuter>
                        </InputContainer>
                    ):(
                        <InputContainer>
                            <Naming>
                                이름
                            </Naming>
                            <InputOuter>
                                <Input 
                                    placeholder="이름을 입력하세요"
                                    type='text'
                                    value={userName}
                                    style={{ width: "100%" }}
                                    onChange={(e) => setUserName(e.target.value)}
                                >
                                </Input>
                            </InputOuter>
                            <Naming>
                                이메일
                            </Naming>
                            {isMobile ? (
                                <MobileEmailInput setUserEmail={setUserEmail} margin='5px'/>
                            ):(
                                <EmailInput userEmail={userEmail} setUserEmail={setUserEmail} margin='5px'/>
                            )}
                        </InputContainer>
                    )}
                    <ButtonArea>
                        <Button 
                            style={{
                                backgroundColor: selectMethod === '휴대폰' ? isAuth ? '#3290ff' : '#eaebed' : '#3290ff',
                                color: selectMethod === '휴대폰' ? isAuth ? 'white' : '#97989a' : 'white',
                            }} 
                            onClick={onClickFindId}
                            disabled={selectMethod === '휴대폰' ? !isAuth : false}
                        >
                            찾기
                        </Button>
                        <Button style={{backgroundColor:'#eaebed', color:'#97989a'}} onClick={onClickCancel}>
                            취소
                        </Button>
                    </ButtonArea>
                </InnerContainer>
            </InputArea>
            {isResult && <EditModal setIsResult={setIsResult} searchResult={searchResult} userName={userName} userMobile={userMobile} userMobileCode={userMobileCode}/>}
            {isResult && <Backdrop setIsResult={setIsResult}/>}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        height: calc(var(--vh, 1vh) * 100);
    }
`;

const InputArea = styled.div`
    width: 700px;
    height: 100%;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const InnerContainer = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const LogoArea = styled.div`
    width: 100%;
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
        height: 120px;
    }
`;

const Logo = styled.img`
    width: 127px;
    height: 56px;
`;

const Title = styled.div`
    width: 100%;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.5px;
    text-align: center;
    white-space: pre-line;
    @media (max-width: 768px) {
        font-size: 24px;
        font-weight: 600;
    }
`;

const SubTitle = styled.div`
    width: 100%;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    letter-spacing: -0.5px;
    white-space: pre-line;
    margin-top: 5px;
    color: #b7b8ba;
    @media (max-width: 768px) {
        font-size: 13px;
        font-weight: 500;
    }
`;

const SelectBox = styled.div`
    width: 335px;
    height: 48px;
    display: flex;
    flex-direction: row;
    margin-top: 32px;
    border-radius: 999px;
    background-color: #F2f3f5;
    padding: 3px;
`;

const SelectButton = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    border-radius: 999px;
    background-color: ${props => props.selectMethod === props.children ? '#ffffff' : '#F2f3f5'};
`;

const InputContainer = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 40px;
    @media (max-width: 768px) {
        width: 327px;
    }
`;

const Naming = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #6f7071;
    padding-left: 3px;
    margin-bottom: 6px;
`;

const InputOuter = styled.div`
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
`;

const Input = styled.input`
    width: 385px;
    height: 48px;
    border: 1px solid rgba(234, 235, 237, 1);
    border-radius: 10px;
    font-size: 13px;
    font-weight: 400;
    padding-left: 15px;
    ::placeholder {
        color: rgba(183, 184, 186, 1);
    }
`;

const InputButton = styled.div`
    width: 80px;
    height: 48px;
    border: none;
    border-radius: 8px;
    background-color: #111111;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    @media (max-width: 768px) {
        margin-left: 5px;
        height: 56px;
    }
`;

const ButtonArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 4px;
    @media (max-width: 768px) {
        width: 327px;
        margin-bottom: 100px;
    }
`;

const Button = styled.button`
    width: 195px;
    height: 56px;
    border: none;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    @media (max-width: 768px) {
        width: 155px;
    }
`;

