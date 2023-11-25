import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { UserType } from '../../recoil/Atom';

import Header from '../../components/Header';

import recent from '../../asset/recentIcon.png';

export default function PaidInformation() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isStopModalOpen, setIsStopModalOpen] = useState(false);
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
    const userType = useRecoilValue(UserType);

    const onClickGroupInfo = () => {
        if(userType === 'SUBSCRIBED') {
            navigate('/mypage/groupinfo');
        }
        else {
            alert('요금제 구매 후 이용 가능합니다.');
        }
    }

    const onClickPricePlan = () => {
        navigate('/mypage/free_info');
    }

    const onClickStop = () => {
        setIsStopModalOpen(true);
    }

    const onClickRefund = () => {
        setIsRefundModalOpen(true);
    }

    return (
        <Container>
            <Header />
            <Content>
                <SideContent>
                    <SideTitle>마이페이지</SideTitle>
                    <Menu isActive={location.pathname === "/mypage"} onClick={() => navigate("/mypage")}>
                        내 정보
                    </Menu>

                    <Menu
                        isActive={location.pathname === "/mypage/groupinfo"}
                        onClick={onClickGroupInfo}
                    >
                        구매 계정 정보
                    </Menu>

                    <Menu
                        isActive={
                            location.pathname === "/mypage/paid_info" ||
                            location.pathname === "/mypage/free_info"
                        }
                        onClick={onClickPricePlan}
                    >
                        결제 정보
                    </Menu>
                </SideContent>
                <InnerContent>
                    <ContentOuter>
                        <TitleArea>
                            <Title>
                                <Blue>GLOT 무료체험&nbsp;</Blue> 구독중
                            </Title>
                            <Descriptions>
                                
                            </Descriptions>
                        </TitleArea>
                        <ContentArea>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <TextArea>
                                    <Line>
                                        <Text>
                                            <Name>
                                                결제일
                                            </Name>
                                            <Value>
                                                결제 정보가 없습니다.
                                            </Value>
                                        </Text>
                                    </Line>
                                    <Line>
                                        <Text>
                                            <Name>
                                                결제 방법
                                            </Name>
                                            <Value>
                                                결제 정보가 없습니다.
                                            </Value>
                                        </Text>
                                    </Line>
                                    <Line>
                                        <Text>
                                            <Name>
                                                다음 결제일
                                            </Name>
                                            <Value>
                                                결제 정보가 없습니다.
                                            </Value>
                                        </Text>
                                    </Line>
                                </TextArea>
                                <ButtonArea>
                                    <Button>
                                        구독중지
                                    </Button>
                                    <Button>
                                        환불
                                    </Button>
                                    <Button>
                                        결제 수단 변경
                                    </Button>
                                </ButtonArea>
                            </div>
                            <Line>
                                <Text>
                                    <Name>
                                        결제 내역
                                    </Name>
                                </Text>
                                <Button
                                    style={{
                                        fontSize: '14px',
                                        color: 'rgba(17, 17, 17, 1)',
                                        marginBottom: '0px',
                                    }}
                                >
                                    최신순
                                    <Icon
                                        src={recent}
                                    />
                                </Button>
                            </Line>
                            <Table>
                                <TableContent>
                                    결제 내역이 존재하지 않습니다.
                                </TableContent>
                            </Table>
                            <Notice>
                                결제 내역은 최대 1년 동안 보관합니다.
                            </Notice>
                        </ContentArea>
                    </ContentOuter>
                </InnerContent>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Content = styled.div`
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    overflow: auto;
`;

const SideContent = styled.div`
    width: 176px;
    padding: 28px;
    background-color: #FCFCFC;
    border-right: 1px solid #F2F3F5;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.04);
`;

const SideTitle = styled.div`
    width: 100%;
    font-size: 22px;
    font-weight: 700;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 14px;
`;

const Menu = styled.div`
    width: 100%;
    height: 40px;
    font-size: 15px;
    font-weight: ${({ isActive }) => (isActive ? 700 : 500)};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    &:hover {
        font-weight: 700;
    }
`;

const Blue = styled.span`
    color: rgba(50, 144, 255, 1);
`;

const Big = styled.span`
    font-size: 22px;
    font-weight: 600;
`;

const InnerContent = styled.div`
    width: calc(100% - 176px);
    height: 100%;
    min-width: 934px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: start;
    overflow: auto;
    flex: 1;
`;

const ContentOuter = styled.div`
    width: 616px;
    height: 100%;
    background-color: rgba(248, 249, 251, 1);
    border-radius: 11px;
    margin-top: 48px;
`;

const TitleArea = styled.div`
    width : calc(100% - 48px);
    height: 67px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    border-bottom: 1px solid rgba(242, 243, 245, 1);
`;

const Title = styled.div`
    font-size: 21px;
    font-weight: 700;
    display: flex;
    align-items: center;
`;

const Icon = styled.img`
    width: 13px;
    height: 11.2px;
    margin-left: 4px;
`;

const Descriptions = styled.div`
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.03em;
`;

const ContentArea = styled.div`
    width: calc(100% - 48px);
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
`;

const TextArea = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const ButtonArea = styled.div`
    width: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
`;

const Line = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
`;

const Text = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Name = styled.div`
    width: 90px;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    display: flex;
    color: rgba(17, 17, 17, 1);
`;

const Value = styled.div`
    height: 100%;
    font-size: 14px;
    font-weight: 400;
    color: rgba(151, 152, 154, 1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Button = styled.div`
    font-size: 13px;
    font-weight: 400;
    color: rgba(111, 112, 113, 1);
    margin-bottom: 16px;
`;

const Table = styled.div`
    width: 100%;
    height: 449px;
    background-color: #FFFFFF;
    border-radius: 8px;
    overflow-y: scroll;
`;

const TableContent = styled.div`
    width: 100%;
    margin-top: 40px;
    font-size: 15px;
    font-weight: 400;
    color: rgba(151,152,154,1);
    display: flex;
    justify-content: center;
`;

const Notice = styled.div`
    width: 100%;
    font-size: 13px;
    font-weight: 400;
    line-height: 13px;
    display: flex;
    justify-content: flex-end;
    color: rgba(151, 152, 154, 1);
    margin-top: 16px;
    margin-bottom: 27px;
`;