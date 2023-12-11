import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { WritingTitle, WritingContent, WritingId } from "../../data/Atom";

import WritingDeleteApi from "../../services/WritingDelete";

export default function WritingDeleteModal(props) {
    const [writingTitle, setWritingTitle] = useRecoilState(WritingTitle);
    const [writingContent, setWritingContent] = useRecoilState(WritingContent);
    const [writingId, setWritingId] = useRecoilState(WritingId);

    const onClickDelete = () => {
        WritingDeleteApi(writingId)
            .then((response) => {
                props.setIsDeleteModalOpen(false);
                props.setWritingListUpdate(!props.writingListUpdate);
            })
            .catch((error) => {
                console.log(error);
            });
        setWritingTitle('');
        setWritingContent('');
        setWritingId('');
    }

    return (
        <ModalWrapper>
            <ModalTitle>
                삭제 확인
            </ModalTitle>
            <ModalContent>
                "#{writingTitle}" 작문을 정말 삭제하시겠어요?{"\n"}
                삭제 시 복원할 수 없습니다.
            </ModalContent>
            <ModalButtonWrapper>
                <ModalButton
                    onClick={() => props.setIsOpenDelete(false)}
                    style={{
                        backgroundColor: "#eaebed",
                        color: "rgba(151, 152, 154, 1)",
                    }}
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
    transform: translate(-50%, -50%);
    width: 400px;
    height: 200px;
    background-color: #FFFFFF;
    border-radius: 12px;
    padding: 12px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const ModalTitle = styled.div`
    width: 100%;
    padding-left: 8px;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.03em;
    color: rgba(0, 0, 0, 1);
`;

const ModalContent = styled.div`
    width: 100%;
    padding-left: 8px;
    font-size: 16px;
    font-weight: 500;
    line-height: 25.6px;
    letter-spacing: -0.03em;
    color: rgba(91, 92, 94, 1);
    white-space: pre-line;
    margin-top: 16px;
`;

const ModalButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ModalButton = styled.div`
    width: 195px;
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
    margin-top: 24px;
`;