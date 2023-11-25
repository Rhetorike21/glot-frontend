import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import CheckBox from '../CheckBox';

import RefundInfoApi from '../../services/RefundInfo';

import notice from '../../asset/notice.png';
import close from '../../asset/closeModal.png';

export default function Refund(props) {
    const [isCheck, setIsCheck] = useState(false); //환불규정 체크
    const [refundInfo, setRefundInfo] = useState({
        accountId: 'test',
        numOfMembers: 1,
        remainDays: 30,
        refundAmount: 10000,
    });

    // useEffect(() => {
    //     const getRefundInfo = async() => {
    //         try {
    //             const response = await RefundInfoApi();
    //             setRefundInfo(response.data);
    //         }
    //         catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getRefundInfo();
    // }, []);

    return(
        <Container>
            <CloseButton>
                <img
                    src={close}
                    alt='close'
                    onClick={() => {
                        props.setIsRefundModalOpen(false);
                    }}
                    style={{
                        width: '13.2px',
                        height: '13.2px',
                        cursor: 'pointer',
                    }}
                />
            </CloseButton>
            <Icon
                src={notice}
            />
            <Title>
                환불하시겠습니까?
            </Title>
            <Description>
                환불 완료 후에는 되돌릴 수 없으며 내 계정을 비롯하여 전체 구매 계{'\n'}
                정이 영구적으로 삭제됩니다. 또한 구매 계정으로 작성된 모든 작문{'\n'}
                내역이 삭제되며 복구할 수 없습니다.
            </Description>
            <Content>
                <ContentTitle>
                    삭제 계정
                </ContentTitle>
                <Line>
                    <Name>
                        내 계정
                    </Name>
                    <Value>
                        {refundInfo.accountId}
                    </Value>
                </Line>
                <Line>
                    <Name>
                        구매 계정수
                    </Name>
                    <Value>
                        {refundInfo.numOfMembers}개
                    </Value>
                </Line>
                <Line>
                    <Name>
                        잔여 구독일수
                    </Name>
                    <Value>
                        {refundInfo.remainDays}일
                    </Value>
                </Line>
                <Line>
                    <Name>
                        환불 예정 금액
                    </Name>
                    <Value>
                        {refundInfo.refundAmount}원
                    </Value>
                </Line>
            </Content>
            <Notice>
                <CheckArea>
                    <CheckBox
                        checked={isCheck}
                        onChange={setIsCheck}
                    />
                    <Link href='https://rhetorike.notion.site/f8d3efed08d5415f95547c06095a9ea3?pvs=4' target='_blank'>환불규정</Link>을 확인하였습니다.
                </CheckArea>
            </Notice>
            <ButtonArea>
                <Button>
                    취소
                </Button>
                <Button
                    style={{
                        color: 'rgba(255, 255, 255, 1)',
                        backgroundColor: 'rgba(17, 17, 17, 1)',
                    }}
                >
                    환불
                </Button>
            </ButtonArea>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: #fff;
    border-radius: 12px;
    z-index: 999;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const CloseButton = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: flex-end;
`;

const Icon = styled.img`
    width: 72px;
    height: 72px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
    margin-top: 16px;
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 25.6px;
    letter-spacing: -0.03em;
    text-align: center;
    color: rgba(91, 92, 94, 1);
    margin-top: 16px;
    white-space: pre-line;
`;

const Content = styled.div`
    width: calc(100% - 40px);
    border: 1px solid rgba(234, 235, 237, 1);
    border-radius: 7px;
    margin-top: 24px;
    background-color: rgba(248, 249, 251, 1);
    padding: 20px;
`;

const ContentTitle = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: rgba(17,17,17,1);
`;

const Line = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 25px;
`;

const Name = styled.div`
    width: 110px;
    font-size: 15px;
    font-weight: 400;
    color: rgba(60, 61, 63, 1);
`;

const Value = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: rgba(60, 61, 63, 1);
`;

const Notice = styled.div`
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    color: rgba(60, 61, 63, 1);
    margin-top: 11px;
    margin-bottom: 24px;
`;

const Link = styled.a`
    color: rgba(50,144,255,1);
    text-decoration: underline;
    cursor: pointer;
    margin-left: 5px;
`;

const ButtonArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Button = styled.div`
    width: 194.92px;
    height: 52px;
    border: none;
    background-color: rgba(234, 235, 237, 1);
    border-radius: 8px;
    text-align: center;
    color: rgba(151, 152, 154, 1);
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: -0.03em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const CheckArea = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
`;