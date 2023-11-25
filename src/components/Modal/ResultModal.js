import React from "react";
import styled from "styled-components";

function ResultModal(props) {
    //const idlist = props.searchResult.accountIds;
    const idlist = ['test1', 'test2', 'test3'];
    const length = idlist.length;

    const closeInfoModal = () => {
        props.setIsResult(false);
    };

    return (
        <ModalContainer>
            <Title>
                아이디 찾기 결과
            </Title>
            <Description>
                입력하신 정보로 가입된 아이디 <Number>{length}건</Number>을 찾았습니다.
            </Description>
            <IdList>
                {idlist.map((id, index) => {
                    return (
                        <Id key={index}>
                            {id}
                        </Id>
                    );
                }
                )}
            </IdList>
            <ButtonArea>
                <Button onClick={closeInfoModal}>
                    확인
                </Button>
            </ButtonArea>
        </ModalContainer>
    );
}

const ModalContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 418px;
    height: 270px;
    background-color: #fff;
    border-radius: 8px;
    z-index: 999;
    padding: 30px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #97989a;
    margin-top: 10px;
`;

const Number = styled.span`
    font-size: 16px;
    font-weight: 700;
    color: #3290ff;
`;

const IdList = styled.div`
    width: 100%;
    margin-top: 20px;
    border: none;
    border-radius: 7px;
    background-color: #f2f3f5;
    overflow: scroll;
    min-height: 120px;
    max-height: 140px;
`;

const ButtonArea = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
`;

const Button = styled.div`
    width: 100%;
    height: 50px;
    border: none;
    background-color: #3290ff;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    line-height: 50px;
`;

const Id = styled.div`
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    color: #595959;
    margin-top: 5px;
    margin-left: 20px;
`;

export default ResultModal;