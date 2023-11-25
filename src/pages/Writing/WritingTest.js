import React from 'react';
import {useRef, useEffect, useState} from 'react'
import getCaretCoordinates from 'textarea-caret'
import makePdf from './Download';
import styled from 'styled-components';

export default function WritingTest() {
    const [writingTitle, setWritingTitle] = useState('');
    const [writingContent, setWritingContent] = useState('');

    const pdf = makePdf();

    // const handleContentChange = (e) => {
    //     setWritingContent(e.target.value);
    // }

    const onClickDown = async(e) => {
        e.preventDefault()
        await pdf.viewWithPdf()
    }

    const handleContentChange = (e) => {
        setWritingContent(e.target.value);
    
        // Get caret coordinates on content change
        const textarea = document.getElementById('yourTextareaId');
        const caretPos = getCaretCoordinates(textarea, textarea.selectionEnd);
        console.log(caretPos);
      };

    return (
        <Container>
            <InnerContainer>
            <WritingArea id='writing'>
            <TitleArea>
                <TitleInput
                type='text'
                placeholder='제목을 입력해주세요'
                value={writingTitle}
                onChange={(e) => setWritingTitle(e.target.value)}
                />
            </TitleArea>
            <ContentArea>
                <ContentInput
                id='yourTextareaId'
                type='text'
                placeholder='내용을 입력해주세요'
                value={writingContent}
                onChange={handleContentChange}
                style={{
                    height: '100%',
                    overflow: 'hidden',
                }}
                />
            </ContentArea>
            </WritingArea>
            <ButtonArea>
            <SaveButton onClick={onClickDown}>저장</SaveButton>
            <SaveButton>출력</SaveButton>
            </ButtonArea>
        </InnerContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
`;

const WritingArea = styled.div`
    height: 842px;
    width: 595px;
    margin: 30px;
    background-color: white;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const TitleArea = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px;
`;

const TitleInput = styled.input`
    width: 80%;
    height: 40px;
    font-size: 24px;
    font-weight: 700;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    &:focus {
        outline: none;
    }
`;

const ContentArea = styled.div`
    width: 100%;
    height: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center;
    margin: 30px;
    
`;

const ContentInput = styled.textarea`
    width: 80%;
    font-size: 18px;
    font-weight: 500;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    resize: none;
    &:focus {
        outline: none;
    }
`;

const ButtonArea = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SaveButton = styled.button`
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background-color: #3290ff;
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
`;
