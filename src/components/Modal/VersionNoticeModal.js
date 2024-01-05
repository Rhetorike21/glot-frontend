import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


function VersionNotice({ setIsVersionNotified }) {
    const navigate = useNavigate();

    const onClickUpgrade = () => {
        setIsVersionNotified(false);
        navigate("/payment");
    }

    return (
        <ModalContainer>
            <Title>
                현재 무료 버전을 이용하고 계시네요!
            </Title>
            <Description>
                <Bold>GLOT 프리미엄</Bold>으로 업그레이드 하실 경우 더 많은 기능을{'\n'}
                이용하실 수 있어요! 버전을 업그레이드 하시려면 GLOT 프리미엄{'\n'}
                업그레이드 버튼을 선택해주세요.
            </Description>
            <ButtonArea>
                <Button onClick={onClickUpgrade}>
                    GLOT 프리미엄 업그레이드
                </Button>
                <Button
                    style={{
                        backgroundColor: "#ffffff",
                        color: "rgba(183, 184, 186, 1)",
                        fontSize: "16px",
                        fontWeight: "600",
                    }}
                    onClick={() => {
                        setIsVersionNotified(false);
                    }}
                >
                    계속 무료 버전 이용하기
                </Button>
            </ButtonArea>
        </ModalContainer>
    );
}

const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 248px;
    background-color: #fff;
    border-radius: 8px;
    z-index: 999;
    padding: 24px;
    @media (max-width: 768px) {
        width: 327px;
        height: 218px;
    }
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
    margin-top: 6px;
    @media (max-width: 768px) {
        font-size: 20px;
        font-weight: 600;
    }
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: rgba(151, 152, 154, 1);
    margin-top: 20px;
    white-space: pre-line;
    line-height: 25.6px;
    letter-spacing: -0.03em;
    @media (max-width: 768px) {
        font-size: 13px;
        font-weight: 500;
        line-height: 20px;
    }
`;

const Bold = styled.span`
    font-weight: 700;
`;

const ButtonArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
`;

const Button = styled.div`
    width: 400px;
    height: 52px;
    border: none;
    background-color: rgba(255, 14, 57, 1);
    border-radius: 8px;
    cursor: pointer;
    color: #fff;

    font-size: 18px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: -0.03em;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        width: 327px;
        height: 42px;
        font-size: 16px;
        font-weight: 700;
    }
`;

export default VersionNotice;