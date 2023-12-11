import React from "react";
import styled from "styled-components";

import StopApi from "../../services/StopSubscription";

import notice from '../../asset/notice.png';

export default function StopSubscribe(props) {

    const onClickStop = async() => {
        try {
            const response = await StopApi();
            alert('구독이 정상적으로 중지되었습니다.');
        }
        catch (error) {
            console.log(error);
        }
        props.setIsStopModalOpen(false);
        props.setIsCheckModalOpen(true);
    }

    return(
        <ModalContainer>
            <Icon
                src={notice}
            />
            <Title>
                {props.plan} 구독 중지 하겠어요?
            </Title>
            <Description>
                지금 구독을 해지하시면 {props.lastDate}까지 이용 가능하고,{'\n'}
                다음 정기 결제일인 {props.nextPayDate}부로{'\n'}
                결제가 이루어지지 않습니다.
            </Description>
            <ButtonArea>
                <Button
                    style={{
                        color: 'rgba(151, 152, 154, 1)',
                        backgroundColor: 'rgba(234, 235, 237, 1)',
                    }}
                    onClick={() => {
                        props.setIsStopModalOpen(false);
                    }}
                >
                    취소
                </Button>
                <Button onClick={onClickStop}>
                    구독중지
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
    height: 292px;
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
    margin-top: 16px;
    white-space: pre-line;
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