import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import logo from '../../asset/GLOT logo.png';

import CheckBox from '../../components/CheckBox';
import EmailInput from '../../components/Signup/EmailInput';
import MobileEmailInput from '../../components/Signup/MobilEmailInput';
import Result from '../../components/Signup/SchoolSearch';

import OrganizationSignUpApi from '../../services/OrgSignUp';
import PersonalSignUpApi from '../../services/PersonalSignUp';
import MobileApi from '../../services/MobileAuth';
import MobileCheckApi from '../../services/MobileAuthCode';

export default function SignUp() {
    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    });

    const navigate = useNavigate();

    const [selectMethod, setSelectMethod] = useState('기관');

    //회원가입 정보
    const [userSchool, setUserSchool] = useState(''); //기관명
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userMobileCode, setUserMobileCode] = useState(''); //휴대폰 인증번호
    const [userMobileAuth, setUserMobileAuth] = useState(false); //휴대폰 인증 여부
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState(''); 
    const [userPwConfirm, setUserPwConfirm] = useState('');

    //회원가입 약관 동의 (순서대로 필수, 선택)
    const [service, setService] = useState(false);
    const [marketing, setMarketing] = useState(false);

    const [pwCheckSame, setPwCheckSame] = useState(true); //비밀번호와 비밀번호 확인 일치 여부
    const [pwCheckInputCompleted, setPwCheckInputCompleted] = useState(false); //비밀번호 확인 입력 완료 여부

    const [idExist, setIdExist] = useState(false); //아이디 중복 여부

    // 비밀번호와 비밀번호 확인 일치 여부를 체크하는 함수
    const handlePwCheckBlur = () => {
        if (userPwConfirm !== userPw) {
            setPwCheckSame(false);
        } else {
            setPwCheckSame(true);
        }
        setPwCheckInputCompleted(true);
    };

    const emailRegex = /.*\.com$/; // .com 이라는 단어가 포함된 이메일 형식
    const isValidEmail = emailRegex.test(userEmail);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[`~!@#$%^&*|₩₩₩'₩";:₩/?])[A-Za-z\d`~!@#$%^&*|₩₩₩'₩";:₩/?]{8,}$/; // 8자 이상 영문, 숫자, 특수기호 조합
    const isValidPw = passwordRegex.test(userPw);

    const handleSelectMethod = (method) => {
        setSelectMethod(method);
    }

    const onClickLogo = () => {
        navigate('/writing');
    }

    const onClickLogin = () => {
        navigate('/login');
    }

    //인증번호 전송
    const onClickMobileAuth = async() => {
        try {
            if(window.confirm(`${userMobile}로 인증번호를 전송합니다.`)){
                alert("인증번호가 전송 되었습니다.");
                const response = await MobileApi(userMobile);
                console.log(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    //인증번호 확인
    const onClickMobileAuthCheck = async() => {
        try {
            const response = await MobileCheckApi(userMobileCode);
            if(response.data.success===true){
                alert('인증이 완료되었습니다.');
                setUserMobileAuth(true);
            }
            else{
                alert('인증번호가 일치하지 않습니다.');
            }
        }
        catch (error) {
            console.log(error);
        }
    
    }

    //회원가입
    const onClickSignUp = async() => {
        try {
            // 필수 입력 항목 확인
            if (userSchool === '' && selectMethod === '기관') {
                alert('기관명을 입력해주세요.');
                return;
            } else if (userName === '' || userMobile === '' || userEmail === '' || userId === '' || userPw === '' || userPwConfirm === '') {
                alert('필수 입력 사항을 입력해주세요.');
                return;
            } else if (!isValidEmail) {
                alert('이메일 형식이 올바르지 않습니다.');
                return;
            } else if (!service) {
                alert('이용약관에 동의해주세요.');
                return;
            }
    
            // API 호출
            let response;
            if (selectMethod === '기관') {
                response = await OrganizationSignUpApi(userId, userPw, userName, userPhone, userMobile, userEmail, service, userMobileCode, userSchool);
            } else {
                response = await PersonalSignUpApi(userId, userPw, userName, userPhone, userMobile, userEmail, service, userMobileCode);
            }
    
            alert('회원가입이 완료되었습니다.');
            navigate('/login');
        } catch (error) {
            alert(error);
        }
    };

    return(
        <Container>
            <InputArea>
                <LogoArea>
                    <Logo src={logo} onClick={onClickLogo}/>
                </LogoArea>
                <Title>
                    새로운 계정 생성하기
                </Title>
                <LoginButton onClick={onClickLogin}>
                    로그인 하러가기{">"} 
                </LoginButton>
                <SelectBox>
                    <SelectButton onClick={() => handleSelectMethod('기관')} selectMethod={selectMethod}>
                        기관
                    </SelectButton>
                    <SelectButton onClick={() => handleSelectMethod('개인')} selectMethod={selectMethod}>
                        개인
                    </SelectButton>
                </SelectBox>
                {selectMethod === '기관' ?(
                <InputContainer pwCheckSame={pwCheckSame}>
                    <Naming>
                        기관명 <Star>*</Star>
                    </Naming>
                    <Result userSchool={userSchool} setUserSchool={setUserSchool}/>  
                    <Naming>
                        이름 <Star>*</Star>
                    </Naming>
                    <Input
                        placeholder="이름" 
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    >
                    </Input>
                    <Naming>
                        전화번호
                    </Naming>
                    <Input
                        placeholder="'-' 구분없이 입력"
                        type='text'
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                    >
                    </Input>
                    <Naming>
                        휴대 전화번호 <Star>*</Star>
                    </Naming>
                    <InputOuter
                        style={{
                            marginTop: '5px',
                        }}
                    >
                        <ShortInput
                            placeholder='관리자 휴대폰번호를 입력하세요'
                            type='text'
                            value={userMobile}
                            onChange={(e) => setUserMobile(e.target.value)}
                            style={{ 
                                width: "293px",
                                marginBottom: '0px',
                            }}
                        />
                        <InputButton onClick={onClickMobileAuth}>
                            인증
                        </InputButton>
                    </InputOuter>
                    <Naming>
                        인증 번호 <Star>*</Star>
                    </Naming>
                    <InputOuter
                        style={{
                            marginTop: '5px',
                        }}
                    >
                        <ShortInput
                            placeholder='6자리 입력'
                            type='text'
                            value={userMobileCode}
                            onChange={(e) => setUserMobileCode(e.target.value)}
                            style={{ 
                                width: "293px",
                                marginBottom: '0px',
                            }}
                        />
                        <InputButton onClick={onClickMobileAuthCheck}>
                            확인
                        </InputButton>
                    </InputOuter>
                    <Naming>
                        이메일 <Star>*</Star>
                    </Naming>
                    {isMobile ? 
                    (
                        <MobileEmailInput setUserEmail={setUserEmail} margin='5px' width='337px'/>
                    ):(
                        <EmailInput userEmail={userEmail} setUserEmail={setUserEmail} margin='5px'/>
                    )}
                    <Naming>
                        아이디 <Star>*</Star>
                    </Naming>
                    <Input
                        placeholder="아이디를 입력해 주세요"
                        type='text'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        style={{marginBottom: idExist  ? '3px' : '28px'}}
                    >
                    </Input>
                    {idExist ? (
                        <Warning>사용 중인 아이디 입니다.</Warning>
                    ) : null}
                    <Naming>
                        비밀번호 <Star>*</Star>
                    </Naming>
                    <Input
                        placeholder="영문, 숫자 조합 8자리 이상"
                        type='password'
                        value={userPw}
                        onChange={(e) => setUserPw(e.target.value)}
                    >
                    </Input>
                    <Naming
                        style={{display: 'flex', flexDirection: 'row'}}
                    >
                        비밀번호 확인 <Star>*</Star>
                    </Naming>
                    <Input
                        placeholder="비밀번호 확인"
                        type='password'
                        value={userPwConfirm}
                        onChange={(e) => setUserPwConfirm(e.target.value)}
                        onBlur={handlePwCheckBlur} // onBlur 이벤트 추가
                        pwCheckSame={pwCheckSame}
                        style={{marginBottom: '0px'}}
                    />
                    {!pwCheckSame && pwCheckInputCompleted ? (
                        <Warning pwCheckSame={pwCheckSame}>비밀번호가 일치하지 않습니다.</Warning>
                    ) : null}
                </InputContainer>
                ):(
                <InputContainer pwCheckSame={pwCheckSame}>
                    <Naming>
                        이름 <Star>*</Star>
                    </Naming>
                    <Input
                        placeholder="이름" 
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    >
                    </Input>
                    <Naming>
                        전화번호
                    </Naming>
                    <Input
                        placeholder="'-' 구분없이 입력"
                        type='text'
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                    >
                    </Input>
                    <Naming>
                        휴대 전화번호 <Star>*</Star>
                    </Naming>
                    <InputOuter
                        style={{
                            marginTop: '5px',
                        }}
                    >
                        <ShortInput
                            placeholder='휴대전화번호를 입력해 주세요'
                            type='text'
                            value={userMobile}
                            onChange={(e) => setUserMobile(e.target.value)}
                            style={{ 
                                width: "293px",
                                marginBottom: '0px'
                            }}
                        />
                        <InputButton onClick={onClickMobileAuth}>
                            인증
                        </InputButton>
                    </InputOuter>
                    <Naming>
                        인증 번호 <Star>*</Star>
                    </Naming>
                    <InputOuter
                        style={{
                            marginTop: '5px',
                        }}
                    >
                        <ShortInput
                            placeholder='6자리 입력'
                            type='text'
                            value={userMobileCode}
                            onChange={(e) => setUserMobileCode(e.target.value)}
                            style={{ 
                                width: "293px",
                                marginBottom: '0px',
                            }}
                        />
                        <InputButton onClick={onClickMobileAuthCheck}>
                            확인
                        </InputButton>
                    </InputOuter>
                    <Naming>
                        이메일 <Star>*</Star>
                    </Naming>
                    {isMobile ? 
                    (
                        <MobileEmailInput setUserEmail={setUserEmail} margin='5px' width='337px'/>
                    ):(
                        <EmailInput userEmail={userEmail} setUserEmail={setUserEmail} margin='5px'/>
                    )}
                    <Naming>
                        아이디 <Star>*</Star>
                    </Naming>
                    <Input
                        placeholder="아이디를 입력해 주세요"
                        type='text'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        style={{marginBottom: idExist  ? '3px' : '28px'}}
                        >
                    </Input>
                    {idExist ? (
                        <Warning>사용 중인 아이디 입니다.</Warning>
                    ) : null}
                    <Naming>
                        비밀번호 <Star>*</Star>
                    </Naming>
                    <Input
                        placeholder="영문, 숫자 조합 8자리 이상"
                        type='password'
                        value={userPw}
                        onChange={(e) => setUserPw(e.target.value)}
                    >
                    </Input>
                    <Naming>
                        비밀번호 확인 <Star>*</Star>
                    </Naming>
                    <Input
                        placeholder="비밀번호 확인"
                        type='password'
                        value={userPwConfirm}
                        onChange={(e) => setUserPwConfirm(e.target.value)}
                        onBlur={handlePwCheckBlur} // onBlur 이벤트 추가
                        pwCheckSame={pwCheckSame}
                        style={{marginBottom: '0px'}}
                    />
                    {!pwCheckSame && pwCheckInputCompleted ? (
                        <Warning pwCheckSame={pwCheckSame}>비밀번호가 일치하지 않습니다.</Warning>
                    ) : null}      
                </InputContainer>
                )}
                <CheckContainer>
                    <CheckNaming>
                        이용약관
                    </CheckNaming>
                    <CheckArea>
                        <div 
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <CheckBox
                                checked={service}
                                onChange={setService}
                            >
                            </CheckBox>
                            <CheckText>
                                <Text>(필수)</Text> 개인 정보 수집 및 이용에 동의 <a href='https://rhetorike.notion.site/a74696057ca94a4194eedb21b1156d55?pvs=4' target="_blank" rel='noreferrer'>[보기]</a>
                            </CheckText>
                        </div>
                        <div 
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <CheckBox
                                checked={marketing}
                                onChange={setMarketing}
                            >
                            </CheckBox>
                            <CheckText>
                                (선택) 홍보 및 마케팅 수집 이용에 동의 <a href='https://rhetorike.notion.site/64393437d72c49fa8603da877392a1e3?pvs=4' target="_blank" rel='noreferrer'>[보기]</a>
                            </CheckText>
                        </div>
                    </CheckArea>
                </CheckContainer>
                <ButtonArea>
                    <Button 
                        disabled={!service}
                        style={{
                            backgroundColor: service ? '#3290ff' : '#eaebed',
                            color: service ? '#FFFFFF' : '#97989a',
                        }}
                        onClick={onClickSignUp}
                    >
                        가입하기
                    </Button>
                </ButtonArea>
            </InputArea>
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
        width: 100%;
    }
`;

const InputArea = styled.div`
    width: 400px;
    height: 100%;
    background-color: #FFFFFF;
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
    @media (max-width: 768px) {
        font-size: 24px;
        font-weight: 600;
    }
`;

const LoginButton = styled.button`
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    border: none;
    background-color: #FFFFFF;
    color: #6f7071;
    cursor: pointer;
    margin-top: 24px;
    @media (max-width: 768px) {
        display: none;
    }
`;

const SelectBox = styled.div`
    width: 338px;
    height: 48px;
    display: flex;
    flex-direction: row;
    margin-top: 40px;
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

const Star = styled.span`
    color: #FF0000;
`;

const InputContainer = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-top: 40px;
    margin-bottom: ${props => props.pwCheckSame ? '28px' : '3px'};
    @media (max-width: 768px) {
        width: 327px;
    }
`;

const InputOuter = styled.div`
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    @media (max-width: 768px) {
        width: 337px;
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
    margin-top: 5px;
    @media (max-width: 768px) {
        margin-left: 5px;
        height: 56px;
    }
`;

const Input = styled.input`
    width: 385px;
    height: 48px;
    border: 1px solid #eaebed;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 400;
    padding-left: 15px;
    margin-top: 5px;
    margin-bottom: 28px;
    @media (max-width: 768px) {
        width: 312px;
    }
`;

const ShortInput = styled.input`
    width: 293px;
    height: 48px;
    border: 1px solid #eaebed;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 400;
    padding-left: 15px;
    margin-top: 5px;
    margin-bottom: 28px;
    @media (max-width: 768px) {
        width: 210px;
    }
`;

const Naming = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #6f7071;
`;

const Warning = styled.div`
    width: 100%;
    font-size: 13px;
    font-weight: 400;
    color: #ff0000;
    margin-bottom: ${props => props.pwCheckSame ? '28px' : '5px'};
    margin-top: 5px;
`;

const CheckContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: left;
    justify-content: left;
    @media (max-width: 768px) {
        width: 327px;
        flex-direction: column;
    }
`;

const CheckArea = styled.div`
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    margin-left: 10px;
    @media (max-width: 768px) {
        margin-left: 0px;
        margin-top: 10px;
    }
`;

const CheckNaming = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #6f7071;
    margin-top: 5px;
`;

const CheckText = styled.div`
    width: 100%;
    height: 20px;
    font-size: 12px;
    font-weight: 400;
    color: #000000;
    margin-left: 10px;
    margin-top: 5px;
`;

const Text = styled.span`
    color: #FF0000;
`;

const ButtonArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 120px;
    @media (max-width: 768px) {
        width: 327px;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 56px;
    border: none;
    border-radius: 10px;
    background-color: #3290ff;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 400;
    cursor: pointer; 
`;
