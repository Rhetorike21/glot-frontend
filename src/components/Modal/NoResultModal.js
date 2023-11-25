import React,{useState} from "react";
import styled from "styled-components";


function NoResultModal({ setIsModal }) {
    const [id, setId] = useState('3');

    const closeInfoModal = () => {
        setIsModal(false);
    };

    return (
        <ModalContainer>
            <Title>
                비밀번호 변경 결과
            </Title>
            <Description>
                입력하신 정보와는 일치하는 사용자가 없습니다.{'\n'}
                다음과 같은 이유로 오류가 표시될 수 있습니다.{'\n'}
                {'\n'}
                - 아이디 입력 시 대/소문자 구분{'\n'}
                - 아이디 뒤에 공란 입력
            </Description>
            <ButtonArea>
                <Button onClick={closeInfoModal}>
                    다시 찾기
                </Button>
                <Button
                    style={{
                        backgroundColor: "#eaebed",
                        color: "#97989a",
                    }}
                >
                    취소
                </Button>
            </ButtonArea>
        </ModalContainer>
    );
}

const ModalContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 418px;
    height: 270px;
    background-color: #fff;
    border-radius: 8px;
    z-index: 999;
    padding: 30px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
    margin-top: 10px;
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: 500;
    colr: #5b5c5e;
    margin-top: 20px;
    white-space: pre-line;
    line-height: 1.5;
`;

const IdList = styled.div`
    width: 100%;
    height: 130px;
    margin-top: 20px;
    border: none;
    border-radius: 7px;
    background-color: #f2f3f5;
    overflow: scroll;
`;

const ButtonArea = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
`;

const Button = styled.div`
    width: 200px;
    height: 50px;
    border: none;
    background-color: #3290ff;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    line-height: 50px;
`;

export default NoResultModal;