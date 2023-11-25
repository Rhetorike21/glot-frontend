import React from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { SentenceType } from "../../recoil/Atom";

export default function WritingOptionModal({ coordinates, setIsSlashTyped, setIsOptionSelected }) {
    const [selectOption, setSelectOption] = useRecoilState(SentenceType); // 선택한 작문 옵션
    
    const onClickOption = (option) => {
        setSelectOption(option);
        setIsSlashTyped(false);
        setIsOptionSelected(true);
    }

    return (
        <ModalWrapper coordinates={coordinates}>
            <ModalContent>
                <SelectContent onClick={() => onClickOption('progress')}>
                    <SelectTitle>발전형</SelectTitle>
                    <SelectDescription>제시된 문장을 이어 가면서 진행시키는 유형</SelectDescription>
                </SelectContent>
                <SelectContent onClick={() => onClickOption('reverse')}>
                    <SelectTitle>반대형</SelectTitle>
                    <SelectDescription>제시된 문장에 반대되는 문장을 만드는 유형</SelectDescription>
                </SelectContent>
                <SelectContent onClick={() => onClickOption('conclusion')}>
                    <SelectTitle>결론형</SelectTitle>
                    <SelectDescription>제시된 문장을 이어 가면서 잠정적인 결론을 만드는 유형</SelectDescription>
                </SelectContent>
            </ModalContent>
        </ModalWrapper>
    );
};

const ModalWrapper = styled.div`
    position: absolute;
    top: ${props => props.coordinates.y}px;
    left: ${props => props.coordinates.x}px;
    height: 169px;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 14px 0px rgba(70, 71, 57, 0.12);
    border: 1px solid #eaebed;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
`;

const ModalContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const SelectContent = styled.div`
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    padding: 8px;
    &:hover {
        background: rgba(242, 243, 245, 1);
        border-radius: 6px;
    }
`;

const SelectTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: rgba(91, 92, 94, 1);
`;

const SelectDescription = styled.div`
    font-size: 13px;
    font-weight: 400;
    color: rgba(151, 152, 154, 1);
    margin-top: 5px;
`;