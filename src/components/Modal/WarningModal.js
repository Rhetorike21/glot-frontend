import React from "react";
import styled from "styled-components";

import close from "../../asset/closeButton.png";

export default function WarningModal(props) {
    const onClickButton = () => {
        props.setIsModalOpen(false);
    }

    return (
        <ModalContainer>
            <Text>{props.text}</Text>
            <Button 
                onClick={onClickButton}
                img={close}
            ></Button>
        </ModalContainer>
    );
}

const ModalContainer = styled.div`
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(17, 17, 17, 1);
    border-radius: 9999px;
    z-index: 999;
    padding: 14px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Text = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 22.4px;
    letter-spacing: -0.03em;
    color: rgba(255, 255, 255, 1);
`;

const Button = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 9999px;
    background-image: url(${props => props.img});
    background-size: cover;
    margin-left: 10px;
    cursor: pointer;
`;
