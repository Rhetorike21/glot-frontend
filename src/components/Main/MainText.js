import React from 'react';
import styled from 'styled-components';

export default function MainText(props) {

    return (
        <MainTextContainer>
            <MainTextContent>
                텍스트 해석의 개척자. GLOT
            </MainTextContent>
            <MainTextTopContent>
               
            </MainTextTopContent>
            <MainTextBottomContent>
            
            </MainTextBottomContent>
        </MainTextContainer>
    );
}

const MainTextContainer = styled.div`
    width: 100%;
    height: 1300px;
    background-color: #f8f8f8;
`;

const MainTextContent = styled.div`
    width: 100%;
    height: 100px;
    font-size: 48px;
    font-weight: 700;
    margin-top: 100px;
`;

const MainTextTopContent = styled.div`
    width: 70%;
    height: 240px;
    display: flex;
    margin-top: 100px;
    margin-left: 20%;
`;

const MainTextBottomContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;



