import React from "react";
import styled from "styled-components";

export default function WritingDeleteModal(props) {
    const onClickDelete = () => {
        
    }

    return (
        <ModalWrapper>
            <ModalTitle>
                삭제 확인
            </ModalTitle>
            <ModalContent>
                "{props.title}" 작문을 정말 삭제하시겠어요?{"\n"}
                삭제 시 복원할 수 없습니다.
            </ModalContent>
            <ModalButtonWrapper>
                <ModalButton
                    onClick={() => props.setIsOpenDelete(false)}
                >
                    취소
                </ModalButton>
                <ModalButton
                    onClick={onClickDelete}
                >
                    삭제하기
                </ModalButton>
            </ModalButtonWrapper>
        </ModalWrapper>
    )
}

const ModalWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #FFFFFF;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ModalTitle = styled.div`
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.03em;
    color: rgba(0, 0, 0, 1);
`;

const ModalContent = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 25.6px;
    letter-spacing: -0.03em;
    color: rgba(91,92,94,1);
    white-space: pre-line;
`;

const ModalButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ModalButton = styled.div`
    width: 100%;
    height: 48px;
    border-radius: 8px;
    background-color: rgba(234, 235, 237, 1);
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.03em;
    text-align: center;
    color: rgba(91, 92, 94, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    cursor: pointer;
    &:hover {
        background-color: rgba(234, 235, 237, 0.8);
    }
`;