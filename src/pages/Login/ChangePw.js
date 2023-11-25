import React,{useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import EmailInput from '../../components/Signup/EmailInput';
import NoResultModal from '../../components/Modal/NoResultModal';
import Backdrop from '../../components/Modal/Backdrop';

import MobileApi from '../../services/MobileAuth';
import MobileCheckApi from '../../services/MobileAuthCode';

import logo from '../../asset/GLOT logo.png';

export default function ChangePw() {
    const navigate = useNavigate();
    
    const [selectMethod, setSelectMethod] = useState('휴대폰');
    const [userId, setUserId] = useState('');  //아이디
    const [userName, setUserName] = useState('');  //이름
    const [userEmail, setUserEmail] = useState('');
    const [userMobile, setUserMobile] = useState('');  //휴대폰번호
    const [userMobileCode, setUserMobileCode] = useState('');  //인증번호

    const [isModal, setIsModal] = useState(false);  //일치하는 정보없음 모달
    const [isInputCompleted, setIsInputCompleted] = useState(false);  //모든 입력이 완료되었는지 여부
    const [isAuth, setIsAuth] = useState(false);  //인증번호 확인 여부
    const isResult = true;  //비밀번호 변경 페이지확인용 임시변수

    const handleSelectMethod = (selectMethod) => {
        setSelectMethod(selectMethod);
    }

    const checkChangeAuth = () => {
        if (userId === '' || userName === '') {
            setIsInputCompleted(false);
        }
        else {
            setIsInputCompleted(true);
        }
    }

    const onClickAuth = async () => {
        try {
            if(window.confirm(`${userMobile}로 인증번호를 전송합니다.`)){
                alert("인증번호가 전송 되었습니다.");
                const response = await MobileApi(userMobile);
            }
            else{
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onClickCheckCode = () => {  
        try {
            const response = MobileCheckApi(userMobileCode);
            setIsAuth(true);
            checkChangeAuth();
        } catch (error) {
            console.log(error);
        }
    } 

    const onClickSearch = () => {
        if (selectMethod === '휴대폰') {
            navigate('/member/newpw');
        }
        else {
            alert('입력하신 이메일로 비밀번호 변경 안내 메일이 발송되었습니다.')
        }
    }

    return(
        <Container>
            <InputArea>
                <InnerContainer>
                    <LogoArea>
                        <Logo src={logo}/>
                    </LogoArea>
                    <Title>
                        비밀번호 변경
                    </Title>
                    <SubTitle>
                        비밀번호를 변경할 방법을 선택하세요
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
                                아이디
                            </Naming>
                            <InputOuter>
                                <Input
                                    placeholder="아이디를 입력해주세요"
                                    type="text"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </InputOuter>
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
                                    placeholder='휴대폰번호를 입력하세요'
                                    type='text'
                                    style={{ width: "73%"}}
                                    value={userMobile}
                                    onChange={(e) => setUserMobile(e.target.value)}
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
                                    style={{ width: "73%"}}
                                    value={userMobileCode}
                                    onChange={(e) => setUserMobileCode(e.target.value)}
                                />
                                <InputButton onClick={onClickCheckCode}>
                                    확인
                                </InputButton>
                            </InputOuter>
                        </InputContainer>
                    ):(
                        <InputContainer>
                            <Naming>
                                아이디
                            </Naming>
                            <InputOuter>
                                <Input
                                    placeholder="아이디를 입력해주세요"
                                    type="text"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </InputOuter>
                            <Naming>
                                이름
                            </Naming>
                            <InputOuter>
                                <Input 
                                    placeholder="이름을 입력하세요"
                                    type='text'
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                >
                                </Input>
                            </InputOuter>
                            <Naming>
                                이메일
                            </Naming>
                            <EmailInput setUserEmail={setUserEmail} margin='5px'/>
                        </InputContainer>
                    )}
                    <ButtonArea>
                        <Button 
                            style={{
                                backgroundColor: selectMethod === '휴대폰' ? isAuth ? '#3290ff' : '#eaebed' : '#3290ff',
                                color: selectMethod === '휴대폰' ? isAuth ? 'white' : '#97989a' : 'white',
                            }}
                            onClick={onClickSearch}
                            // selectMethod가 휴대폰이면 isAuth 와 isInputCompleted가 true여야 버튼이 활성화되고 이메일이면 isInputCompleted가 true여야 버튼이 활성화됨
                            disabled={selectMethod === '휴대폰' ? !isAuth || !isInputCompleted : !isInputCompleted}
                        >
                            변경
                        </Button>
                        <Button style={{backgroundColor:'#eaebed', color:'#97989a'}}>
                            취소
                        </Button>
                    </ButtonArea>
                </InnerContainer>
            </InputArea>
            {isModal && <NoResultModal setIsModal={setIsModal}/>}
            {isModal && <Backdrop setIsModal={setIsModal}/>}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const InputArea = styled.div`
    width: 700px;
    background-color: #FFFFFF;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InnerContainer = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    letter-spacing: -0.5px;
    white-space: pre-line;
    margin-top: 5px;
    color: #b7b8ba;
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
`;

const Naming = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #6f7071;
    padding-left: 3px;
`;

const InputOuter = styled.div`
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    margin-top: 5px;
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
    height: 100%;
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
`;

const ButtonArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 4px;
    margin-bottom: 46px;
`;

const Button = styled.button`
    width: 195px;
    height: 50px;
    border: none;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;

