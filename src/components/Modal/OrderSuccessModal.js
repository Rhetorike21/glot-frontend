import React,{useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Check from "../../asset/CheckModal.png";

function OrderCheck(props) {
    const navigate = useNavigate();

    const onClickMove = () => {
        navigate('/mypage');
        props.setOpenSuccess(false)
    }

    return (
        <ModalContainer>
            <Icon>
                <img
                    src={Check}
                    alt='check'
                    style={{
                        width: '72px',
                        height: '72px',
                    }}
                />
            </Icon>
            <Title>
                결제가 완료되었습니다.
            </Title>
            <ButtonArea>
                <Button onClick={onClickMove}>
                    마이페이지로 이동
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
    background-color: #fff;
    border-radius: 12px;
    z-index: 999;
    padding: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.div`
    width: 72px;
    height: 72px;
    border-radius: 9999px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 14px;
`;

const Title = styled.div`
    font-size: 24px;
    line-height: 24px;
    font-weight: 600;
    margin-top: 16px;
`;

const ButtonArea = styled.div`
    width: 100%;
    height: 52px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 29px;
`;

const Button = styled.div`
    width: 304px;
    height: 52px;
    border: none;
    background-color: rgba(50, 144, 255, 1);
    border-radius: 7px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default OrderCheck;