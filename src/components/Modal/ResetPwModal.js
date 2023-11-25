import React, { useState, useRef } from "react";
import styled from "styled-components";

import hidden from '../../asset/hidden.png';
import visible from '../../asset/visible.png';

export default function ResultModal(props) {
    const currentPwRef = useRef(null);
    const newPwRef = useRef(null);
    const newPwConfirmRef = useRef(null);

    const [userPw, setUserPw] = useState('');
    const [userNewPw, setUserNewPw] = useState('');
    const [userPwConfirm, setUserPwConfirm] = useState('');
    const [pwCheckSame, setPwCheckSame] = useState(false);
    const [pwCheckInputCompleted, setPwCheckInputCompleted] = useState(false);

    const [currentPwVisible, setCurrentPwVisible] = useState(false);
    const [newPwVisible, setNewPwVisible] = useState(false);
    const [confirmPwVisible, setConfirmPwVisible] = useState(false);

    const handlePwCheckBlur = () => {
        if (userPwConfirm !== userNewPw) {
            setPwCheckSame(false);
        } else {
            setPwCheckSame(true);
        }
        setPwCheckInputCompleted(true);
    };

    const onClickReset = () => {
        alert('비밀번호가 변경되었습니다.');
        props.setIsResetModalOpen(false);
    }

    const onClickCancle = () => {
        props.setIsResetModalOpen(false);
    }

    const toggleVisibility = (inputRef, setVisibleState) => {
        if (setVisibleState) {
            inputRef.current.type = 'text';
        } else {
            inputRef.current.type = 'password';
        }
    };

    const onClickVisible = (inputRef, isVisible, setVisibleState) => {
        setVisibleState(!isVisible);
        toggleVisibility(inputRef, isVisible);
    };

    return (
        <ModalContainer>
            <Title>비밀번호 변경</Title>
            <Descriptions>
                새로운 비밀번호는 현재 비밀번호와 다르게 입력해야 합니다.{'\n'}
                비밀번호는 영문, 숫자 조합 8자리 이상 입력하시기 바랍니다.{'\n'}
                비밀번호 변경 후 새로운 비밀번호로 로그인하시기 바랍니다.
            </Descriptions>
            <InputArea>
                <InputName>현재 비밀번호</InputName>
                <InputBox
                    value={userPw}
                    type={currentPwVisible ? "text" : "password"}
                    placeholder="기존 비밀번호를 입력하세요"
                    ref={currentPwRef}
                    onChange={(e) => {
                        setUserPw(e.target.value);
                    }}
                />
                <Icon
                    onClick={() => onClickVisible(currentPwRef, currentPwVisible, setCurrentPwVisible)}
                    src={currentPwVisible ? visible : hidden}
                />
                <InputName>새로운 비밀번호</InputName>
                <InputBox
                    value={userNewPw}
                    type={newPwVisible ? "text" : "password"}
                    placeholder="새로운 비밀번호를 입력하세요"
                    ref={newPwRef}
                    onChange={(e) => {
                        setUserNewPw(e.target.value);
                    }}
                />
                <Icon
                    onClick={() => onClickVisible(newPwRef, newPwVisible, setNewPwVisible)}
                    src={newPwVisible ? visible : hidden}
                    style={{ top: '333px' }}
                />
                <InputName>새로운 비밀번호 확인</InputName>
                <InputBox
                    value={userPwConfirm}
                    type={confirmPwVisible ? "text" : "password"}
                    placeholder="새로운 비밀번호를 다시 입력하세요"
                    ref={newPwConfirmRef}
                    onChange={(e) => {
                        setUserPwConfirm(e.target.value);
                    }}
                    onBlur={handlePwCheckBlur}
                    style={{
                        marginBottom: pwCheckInputCompleted ? (pwCheckSame ? '28px' : '0px') : '28px',
                        border: pwCheckInputCompleted ? (pwCheckSame ? '1px solid rgba(234, 235, 237, 1)' : '1px solid #ff0000') : '1px solid rgba(234, 235, 237, 1)',
                    }}
                />
                <Icon
                    onClick={() => onClickVisible(newPwConfirmRef, confirmPwVisible, setConfirmPwVisible)}
                    src={confirmPwVisible ? visible : hidden}
                    style={{ top: '444px' }}
                />
                {!pwCheckSame && pwCheckInputCompleted ? (
                    <Warning pwCheckSame={pwCheckSame}>비밀번호가 일치하지 않습니다.</Warning>
                ) : null}
            </InputArea>
            <ButtonArea>
                <Button onClick={onClickReset}>변경</Button>
                <Button onClick={onClickCancle} style={{ color: 'rgba(151, 152, 154, 1)', backgroundColor: 'rgba(234, 235, 237, 1)' }}>취소</Button>
            </ButtonArea>
        </ModalContainer>
    );
}

const ModalContainer = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 550px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 12px;
    z-index: 999;
    padding: 24px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
    margin-top: 4px;
`;

const Descriptions = styled.div`
    color: rgba(151, 152, 154, 1);
    margin-top: 16px;
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    letter-spacing: -0.03em;
    text-align: left;
    white-space: pre-line;
`;

const InputArea = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const InputName = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: rgba(111, 112, 113, 1);
`;

const InputBox = styled.input`
    &::placeholder {
        color: rgba(183, 184, 186, 1);
        font-size: 16px;
        font-weight: 500;
    }
    height: 56px;
    border: 1px solid rgba(234, 235, 237, 1);
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(183, 184, 186, 1);
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
    margin-bottom: 28px;
    padding-left: 16px;
`;

const Icon = styled.img`
    position: absolute;
    top: 223px;
    right: 6%;
    width: 20px;
    height: 20px;
    margin-right: 16px;
    cursor: pointer;
`;

const Warning = styled.div`
    width: 100%;
    font-size: 13px;
    font-weight: 400;
    color: #ff0000;
    margin-top: 5px;
    margin-bottom: ${(props) => (props.pwCheckSame ? '0px' : '8px')};
`;

const ButtonArea = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 4px;
`;

const Button = styled.div`
    width: 195px;
    height: 52px;
    border: none;
    background-color: rgba(50, 144, 255, 1);
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
`;


