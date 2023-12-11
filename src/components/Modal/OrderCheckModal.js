import React,{useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserType } from "../../data/Atom";

import OrderApi from "../../services/Order";

function OrderCheck(props) {
    const navigate = useNavigate();
    const [userType, setUserType] = useRecoilState(UserType);

    const onClickOrder = async () => {
        try {
            const planId = props.pricingType === 'perYear' ? 2 : 1;
            const quantity = props.userNumber;
            const expiry = `${props.expiryYear}-${props.expiryMonth}`;

            const finalData = {
                ...props.payment,
                expiry,
            }
            const response = await OrderApi(planId, quantity, finalData);
            try {
                setUserType('SUBSCRIBED');
                props.setOpenCheck(false);
                props.setOpenSuccess(true);
            }
            catch (error) {
                props.setOpenWarning(true);
                props.setWarningMessage(error.response.data.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    const onClickClose = () => {
        props.setOpenCheck(false)
    };

    return (
        <ModalContainer>
            <Title>
                결제를 신청하시겠습니까?
            </Title>
            <Description>
               카드 유효성을 확인하기 위해 1원이 자동 결제 후 즉시 취소되며,{'\n'}
                서비스 이용료는 카드 유효성 확인 후 곧바로 결제됩니다.
            </Description>
            <ButtonArea>
                <Button onClick={onClickOrder}>
                    결제
                </Button>
                <Button 
                    onClick={onClickClose}
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 12px;
    z-index: 999;
    padding: 24px;
`;

const Title = styled.div`
    font-size: 24px;
    line-height: 24px;
    font-weight: 700;
    margin-top: 10px;
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: rgba(91, 92, 94, 1);
    margin-top: 16px;
    white-space: pre-line;
    line-height: 25.6px;
`;

const ButtonArea = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 24px;
`;

const Button = styled.div`
    width: 190px;
    height: 52px;
    border: none;
    background-color: rgba(50, 144, 255, 1);
    border-radius: 7px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default OrderCheck;