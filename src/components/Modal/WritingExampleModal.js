import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { SentenceList, Sentence, SentenceType } from "../../data/Atom";

import SentenceRecomendApi from "../../services/Sentence";
import SearchApi from "../../services/SearchSchool";

import reload from "../../asset/reload.png";

export default function WritingExampleModal( {coordinates, setIsOptionSelected , writingContent, setWritingContent}) {
    const [sentence, setSentence] = useRecoilState(Sentence);
    const [sentenceType, setSentenceType] = useRecoilState(SentenceType);
    const [sentenceList, setSentenceList] = useRecoilState(SentenceList);
    const content = writingContent.slice(0, -1);

    const [isLoading, setIsLoading] = useState(true); // 초기에 로딩 상태를 설정

    useEffect(() => {
        setIsLoading(true); // API 요청이 시작될 때 로딩 상태 설정

        SentenceRecomendApi(content, sentenceType)
            .then((response) => {
                setSentenceList(response.result);
                setIsLoading(false); // API 응답 후 로딩 상태 해제
            })
            .catch((error) => {
                setIsLoading(false); // 에러 발생 시도 로딩 상태 해제
            });
    }, []);

    const onClickOption = (e) => {
        // if(sentenceList.length === 0) {
        //     setSentence('');
        //     setIsOptionSelected(false);
        //     return;
        // }
        // const option = e.target.innerText;
        // setSentence(option);
        // setIsOptionSelected(false);
        setSentence(e.target.innerText);
        setIsOptionSelected(false);
    };

    const onClickSelfInput = () => {
        const option = '';
        setWritingContent(writingContent.slice(0, -1));
        setSentence(option);
        setIsOptionSelected(false);
    }

    const onClickReload = () => {
        setIsLoading(true); // API 요청이 시작될 때 로딩 상태 설정

        SentenceRecomendApi(content, sentenceType)
            .then((response) => {
                setSentenceList(response.result);
                setIsLoading(false); // API 응답 후 로딩 상태 해제
            })
            .catch((error) => {
                setIsLoading(false); // 에러 발생 시도 로딩 상태 해제
            });
    }

    return (
        <ModalWrapper coordinates={coordinates}>
            <ModalTitle>
                <Title>
                    GLOT 문장 추천
                </Title>
                <Button onClick={onClickReload}>
                    <Icon src={reload}></Icon>다른 문장 추천
                </Button>
            </ModalTitle>
            <ModalContent>
                {isLoading ? ( // 로딩 중일 때 로딩 메시지 또는 스피너를 표시
                    <LoadingMessage>Loading...</LoadingMessage>
                ) : (
                    sentenceList && sentenceList.length > 0 && sentenceList.map((sentence, index) => (
                        <SelectContent key={index} onClick={onClickOption}>
                            <SelectDescription>{sentence}</SelectDescription>
                        </SelectContent>
                    ))
                )}
                <SelfInput onClick={onClickSelfInput}>
                    <SelfInputBox>
                        직접 입력하기
                    </SelfInputBox>
                </SelfInput>
            </ModalContent>
        </ModalWrapper>
    );
};


const ModalWrapper = styled.div`
    position: absolute;
    top: ${props => props.coordinates.y}px;
    left: ${props => props.coordinates.x}px;
    width: 423px;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 14px 0px rgba(70, 71, 57, 0.12);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    @media (max-width: 768px) {
        width: 100%;
        top: 38vh;
        left: 0px;
        border: 1px solid #eaebed;
        border-radius: 0px;
        box-shadow: none;
        overflow-y: scroll;
    }
`;

const ModalTitle = styled.div`
    width: calc(100% - 32px);
    height: 8px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(242, 243, 245, 1);
`;

const Title = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #33B864;
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    border: none;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #B7B8BA;
    margin-left: 10px;
    cursor: pointer;
`;

const Icon = styled.img`
    width: 12.19px;
    height: 12.19px;
    margin-right: 5px;
`;

const ModalContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const SelectContent = styled.div`
    width: calc(100% - 32px);
    border-bottom: 1px solid rgba(242, 243, 245, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    padding: 16px;
    &:hover {
        background: rgba(242, 243, 245, 1);
    }
`;

const SelectDescription = styled.div`
    font-size: 13px;
    font-weight: 400;
    color: rgba(17, 17, 17, 1);
    margin-top: 5px;
`;

const SelfInput = styled.div`
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SelfInputBox = styled.div`
    width: calc(100% - 32px);
    height: calc(100% - 32px);
    padding: 16px;
    border: none;
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 13px;
    font-weight: 400;
    color: rgba(17, 17, 17, 1);
    cursor: pointer;
    &:hover {
        background: rgba(242, 243, 245, 1);
    }
`;

const LoadingMessage = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: #33B864;
    padding: 20px;
    @media (max-width: 768px) {
        height: 210px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;