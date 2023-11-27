import React from "react";
import styled from "styled-components";

import { WritingTitle, WritingContent, WritingId } from "../../recoil/Atom";
import { useRecoilState } from "recoil";

import word from '../../asset/word.png';
import pdf from '../../asset/pdf.png';
import jpg from '../../asset/jpg.png';
import print from '../../asset/print.png';
import trash from  '../../asset/delete.png';

import WritingDeleteApi from "../../services/WritingDelete";

export default function WritingDownload(props) {
    const [writingTitle, setWritingTitle] = useRecoilState(WritingTitle);
    const [writingContent, setWritingContent] = useRecoilState(WritingContent);
    const [writingId, setWritingId] = useRecoilState(WritingId);

    // 모달 내부 클릭 시 모달이 닫히지 않도록
    const modalIndsideClick = (e) => {
        e.stopPropagation();
    }

    const onClickPrint = () => {
        props.onClickPrint();
        props.setIsOpenDownload(false);
    }

    const onClickJPG = () => {
        props.onClickSaveAsJpg();
        props.setIsOpenDownload(false);
    }

    const onClickDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            WritingDeleteApi(writingId)
                .then((response) => {
                    props.setIsOpenDownload(false);
                    props.setWritingListUpdate(!props.writingListUpdate);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            props.setIsOpenDownload(false);
        }
        setWritingTitle('');
        setWritingContent('');
        setWritingId('');
    }

    return (
        <ModalWrapper
            style={{
                top: props.clickCoordinates.y,
                left: props.clickCoordinates.x,
            }}
            ref={props.modalRef}
            onClick={() => props.setIsOpenDownload(false)}
        >
            <ModalContent
                onClick={modalIndsideClick}
            >
                <SelectContent>
                    <SelectIcon>
                        <img src={word} alt="word"/>
                    </SelectIcon>
                    <SelectTitle>Word 다운로드</SelectTitle>
                </SelectContent>
                <SelectContent
                    onClick={onClickPrint}
                >
                    <SelectIcon>
                        <img src={pdf} alt="pdf"/>
                    </SelectIcon>
                    <SelectTitle>PDF 다운로드</SelectTitle>
                </SelectContent>
                <SelectContent
                    onClick={onClickJPG}
                >
                    <SelectIcon>
                        <img src={jpg} alt="jpg"/>
                    </SelectIcon>
                    <SelectTitle>JPG 다운로드</SelectTitle>
                </SelectContent>
                <SelectContent
                    onClick={onClickPrint}
                >
                    <SelectIcon>
                        <img src={print} alt="print"/>
                    </SelectIcon>
                    <SelectTitle>인쇄하기</SelectTitle>
                </SelectContent>
                <SelectContent
                    onClick={onClickDelete}
                >
                    <SelectIcon>
                        <img src={trash} alt="trash"/>
                    </SelectIcon>
                    <SelectTitle>삭제</SelectTitle>
                </SelectContent>
            </ModalContent>
        </ModalWrapper>
    );
};

const ModalWrapper = styled.div`
    position: absolute;
    padding: 10px;
    background-color: #FFFFFF;
    background: linear-gradient(0deg, #F2F3F5, #F2F3F5),
    box-shadow: 0px 2px 8px 0px rgba(134, 140, 70, 0.11);
    border: 1px solid rgba(242, 243, 245, 1);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const SelectContent = styled.div`
    width: calc(100% - 16px);
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 8px;
    &:hover {
        background: rgba(242, 243, 245, 1);
        border-radius: 6px;
    }
`;

const SelectIcon = styled.div`
    width: 24px;
    height: 24px;
    margin-top: 8px;
`;

const SelectTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #5B5C5E;
`;
