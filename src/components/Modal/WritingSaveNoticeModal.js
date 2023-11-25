import React from "react";
import styled from "styled-components";

import close from "../../asset/closeButton.png";

export default function WarningModal(props) {
    const onClickButton = () => {
        props.setShowSaveNoticeModal(false);
    }

    return (
        <ModalContainer>
            <Text>작문 내역은 최대 100건까지 보관 가능합니다. 오래된 작문 내역은{'\n'} 삭제하여 정리해주세요. 100건 초과 시 오래된 내역부터 자동 삭제됩니다.</Text>
            <Button 
                onClick={onClickButton}
                img={close}
            ></Button>
        </ModalContainer>
    );
}

const ModalContainer = styled.div`
    position: absolute;
    top: 95%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(17, 17, 17, 1);
    border-radius: 15px;
    z-index: 999;
    padding: 14px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Text = styled.div`
    width: 435px;
    font-size: 16px;
    font-weight: 400;
    line-height: 22.4px;
    letter-spacing: -0.03em;
    color: rgba(255, 255, 255, 1);
    white-space: pre-line;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Button = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 9999px;
    background-image: url(${props => props.img});
    background-size: cover;
    margin-left: 16px;
    cursor: pointer;
`;
