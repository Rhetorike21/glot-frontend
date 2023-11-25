import React,{useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import logo from '../../asset/GLOT logo.png';

import SetPwApi from '../../services/SetNewPw';

export default function NewPw() {
    const navigate = useNavigate();

    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [isSame, setIsSame] = useState(true); //비밀번호와 비밀번호 확인 일치 여부
    const [pwCheckInputCompleted, setPwCheckInputCompleted] = useState(false); //비밀번호 확인 입력 완료 여부

    // 비밀번호와 비밀번호 확인 일치 여부를 체크하는 함수
    const handlePwCheckBlur = () => {
        if (pwCheck !== pw) {
            setIsSame(false);
        } else {
            setIsSame(true);
        }
        setPwCheckInputCompleted(true);
    };

    const onClickChangePw = () => {
        try {
            const response = SetPwApi(pw);
            alert('비밀번호가 변경되었습니다.');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Container>
            <InputArea>
                <LogoArea>
                    <Logo src={logo}/>
                </LogoArea>
                <InnerContainer>
                    <Content>
                        <Title>
                            새로운 비밀번호 설정하기
                        </Title>
                        <SubTitle>
                            비밀번호를 재설정 해주세요.
                        </SubTitle>
                    </Content>
                    <InputContainer
                        style={{
                            marginBottom: isSame ? '28px' : '3px',
                        }}
                    >
                        <Naming>
                            비밀번호
                        </Naming>
                        <Input
                            placeholder="영문,숫자 조합 8자리 이상"
                            type="password"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                        />
                        <Naming>
                            비밀번호 재입력
                        </Naming>
                        <Input 
                            placeholder="비밀번호 재입력"
                            type='password'
                            value={pwCheck}
                            onChange={(e) => setPwCheck(e.target.value)}
                            onBlur={handlePwCheckBlur} // onBlur 이벤트 추가
                            style={{
                                marginBottom: '0px',
                            }}
                        />
                        {!isSame && pwCheckInputCompleted ? (
                            <Warning>비밀번호가 일치하지 않습니다.</Warning>
                        ) : null}
                    </InputContainer>
                    <ButtonArea>
                        <Button 
                            onClick={onClickChangePw}
                            disabled={!isSame} // 비밀번호와 비밀번호 확인이 일치하지 않으면 버튼 비활성화
                            style={{
                                backgroundColor: isSame ? '#3290ff' : '#eaebed',
                                color: isSame ? '#FFFFFF' : '#97989a',
                            }}
                        >
                            변경
                        </Button>
                        <Button style={{backgroundColor:'#eaebed', color:'#97989a'}}>
                            취소
                        </Button>
                    </ButtonArea>
                </InnerContainer>
            </InputArea>
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

const InputArea = styled.div`
    width: 700px;
    height: 100%;
    background-color: #FFFFFF;
    border-radius: 20px;
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

const InnerContainer = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    item-align: center;
    text-align: center;
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

const InputContainer = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 56px;
    margin-bottom: 28px;
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

const Input = styled.input`
    width: 385px;
    height: 56px;
    border: 1px solid #eaebec;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 400;
    padding-left: 15px;
    color: #b7b8ba;
    margin-bottom: 28px;
`;

const Warning = styled.div`
    width: 100%;
    height: 20px;
    font-size: 13px;
    font-weight: 400;
    color: #ff0000;
    padding-left: 3px;
    margin-top: 5px;
`;

const ButtonArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 4px;
`;

const Button = styled.div`
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
`;

