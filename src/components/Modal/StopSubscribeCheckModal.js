import React from "react";
import styled from "styled-components";

import notice from '../../asset/notice.png';

export default function StopSubscribeCheck(props) {

    return(
        <ModalContainer>
            <Icon
                src={notice}
            />
            <Title>
                계속 이용하시겠습니까?
            </Title>
            <Description>
                구독을 정지하였습니다.{'\n'}
                {props.lastDate}까지 이용할 수 있습니다.{'\n'}
                계속 구독을 이용하시려면 [구독 계속 이용하기]를 해주세요.
            </Description>
            <ContentArea>
                결제 수단 : {props.payMethod} {props.cardNumber}
            </ContentArea>
            <ButtonArea>
                <Button
                    style={{
                        color: 'rgba(151, 152, 154, 1)',
                        backgroundColor: 'rgba(234, 235, 237, 1)',
                    }}
                    onClick={() => {
                        props.setIsCheckModalOpen(false);
                    }}
                >
                    취소
                </Button>
                <Button>
                    구독 계속 이용하기
                </Button>
            </ButtonArea>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 390px;
    background-color: #fff;
    border-radius: 12px;
    z-index: 999;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const Icon = styled.img`
    width: 72px;
    height: 72px;
    margin-top: 18px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
    margin-top: 16px;
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 25.6px;
    letter-spacing: -0.03em;
    text-align: center;
    color: rgba(91, 92, 94, 1);
    white-space: pre-line;
    margin-top: 16px;
`;

const ContentArea = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(234, 235, 237, 1);
    border-radius: 7px;
    font-size: 15px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: -0.03em;
    text-align: center;
    color: rgba(151,152,154,1);
    background-color: rgba(248, 249, 251, 1);
    margin-top: 24px;
`;

const ButtonArea = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 32px;
`;

const Button = styled.div`
    width: 194.92px;
    height: 52px;
    background-color: rgba(17, 17, 17, 1);
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: -0.03em;
    display: flex;
    justify-content: center;
    align-items: center;
`;