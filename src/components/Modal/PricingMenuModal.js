import React,{useState} from "react";
import styled from "styled-components";

import check from '../../asset/blueCheck.png';
import unCheck from '../../asset/grayCheck.png';

export default function PricingMenu(props) {
    const onClickMenu = (e) => {
        if (e.target.innerText === '연간결제') {
            props.setPricingType('perYear');
            props.setOpenMenu(false);
        }
        else {
            props.setPricingType('perMonth')
            props.setOpenMenu(false);
        }
    }

    const modalStyle = {
        position: 'absolute',
        top: props.clickCoordinates.y + 'px',
        left: props.clickCoordinates.x + 'px',
    };

    return (
        <Container
            style={modalStyle}
            ref={props.modalRef}
        >
            <Content 
                onClick={onClickMenu}
                style={{
                    backgroundColor: props.pricingType === 'perYear' ? 'rgba(242, 243, 245, 1);' : '#ffffff',
                    marginBottom: '8px',
                }}
            >
                연간결제
                <Icon src={props.pricingType === 'perYear' ? check : unCheck}/>
            </Content>
            <Content 
                onClick={onClickMenu}
                style={{
                    backgroundColor: props.pricingType === 'perMonth' ? 'rgba(242, 243, 245, 1);' : '#ffffff',
                }}
            >
                월간결제
                <Icon src={props.pricingType === 'perMonth' ? check : unCheck}/>
            </Content>
        </Container> 
    );
}

const Container = styled.div`
    position: absolute;
    box-shadow: 0px 2px 8px 0px rgba(134, 140, 70, 0.11);
    transform: translate(-50%,-50%);
    width: 134px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 8px;
    z-index: 999;
`;

const Content = styled.div`
    width: calc(100% - 16px);
    height: calc(50% - 16px);
    display: flex;
    border-radius: 8px;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;
    padding: 8px;
    background-color: rgba(242, 243, 245, 1);
`;

const Icon = styled.img`
    width: 16px;
    height: 12px;
`;

