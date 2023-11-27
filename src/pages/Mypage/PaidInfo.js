import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { UserType } from '../../recoil/Atom';

import Header from '../../components/Header';
import StopModal from '../../components/Modal/StopSubscribeModal';
import StopCheckModal from '../../components/Modal/StopSubscribeCheckModal';
import RefundModal from '../../components/Modal/RefundModal';
import Backdrop from '../../components/Modal/Backdrop';

import PaidInfoApi from '../../services/PaidInfo';

import recent from '../../asset/recentIcon.png';
import price from '../../asset/subscribeIcon.png';

export default function PaidInformation() {
    const navigate = useNavigate();
    const location = useLocation();

    const userType = useRecoilValue(UserType);
    const [isStopModalOpen, setIsStopModalOpen] = useState(false); //구독 중지 모달 제어
    const [isCheckModalOpen, setIsCheckModalOpen] = useState(false); //구독 중지 후 계속 이용하기 모달 제어
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false); //환불 모달 제어
    const [paidInfo, setPaidInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 초기에 로딩 상태를 설정

    useEffect(() => {
        setIsLoading(true); // API 요청이 시작될 때 로딩 상태 설정

        PaidInfoApi()
            .then((response) => {
                setPaidInfo(response);
                setIsLoading(false); // API 응답 후 로딩 상태 해제
                console.log(response);
            })
            .catch((error) => {
                setIsLoading(false); // 에러 발생 시도 로딩 상태 해제
                console.log(error);
            });
    }, []);

    const onClickMyInfo = () => {
        navigate('/mypage');
    }

    const onClickGroupInfo = () => {
        if(userType === 'SUBSCRIBED') {
            navigate('/mypage/groupinfo');
        }
        else {
            alert('요금제 구매 후 이용 가능합니다.');
        }
    }


    const onClickPricePlan = () => {
        navigate('/mypage/paid_info');
    }

    const onClickStop = () => {
        setIsStopModalOpen(true);
    }

    const onClickRefund = () => {
        setIsRefundModalOpen(true);
    }

    //paidInfo의 history에서 duration의 ~ 뒷부분만 가져오기
    const lastDate = paidInfo.history && paidInfo.history.map((item, index) => {
        return(
            item.duration.split(' ~ ')[1]
        )
    }
    )

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
                                <Blue>{paidInfo.plan}&nbsp;</Blue> 구독중
                                <Icon
                                    src={price}
                                    style={{
                                        width: '31px',
                                        height: '30.14px',
                                        marginLeft: '8px'
                                    }}
                                />
                            </Title>
                            <Descriptions>
                                {paidInfo.plan} {paidInfo.firstPaidDate}부터 시작
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
                                                매월 <Blue>&nbsp;{paidInfo.payPeriod}</Blue>일
                                            </Value>
                                        </Text>
                                    </Line>
                                    <Line>
                                        <Text>
                                            <Name>
                                                결제 방법
                                            </Name>
                                            <Value>
                                                {paidInfo.payMethod}
                                            </Value>
                                        </Text>
                                    </Line>
                                    <Line>
                                        <Text>
                                            <Name>
                                                다음 결제일
                                            </Name>
                                            <Value>
                                                {paidInfo.nextPayDate}
                                            </Value>
                                        </Text>
                                    </Line>
                                </TextArea>
                                <ButtonArea>
                                    <Button onClick={onClickStop}>
                                        구독중지
                                    </Button>
                                    <Button onClick={onClickRefund}>
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
                                {paidInfo.history && paidInfo.history.map((item, index) => {
                                    return(
                                        <TableContent>
                                            <TableDate>
                                                {item.paidDate}
                                            </TableDate>
                                            <TableTotalPrice>
                                                {item.amount}원
                                            </TableTotalPrice>
                                            <TableText>
                                                {item.duration}
                                            </TableText>
                                            <TableText>
                                                {item.cardNumber}
                                            </TableText>
                                            <TableText
                                                style={{
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {item.amount-item.surtax}원 (+{item.surtax}원 부가세)
                                            </TableText>
                                            <Border/>
                                        </TableContent>
                                    )
                                })}
                            </Table>
                            <Notice>
                                결제 내역은 최대 1년 동안 보관합니다.
                            </Notice>
                        </ContentArea>
                    </ContentOuter>
                </InnerContent> 
            </Content>
            {isStopModalOpen ? (
                <StopModal
                    setIsStopModalOpen={setIsStopModalOpen}
                    setIsCheckModalOpen={setIsCheckModalOpen}
                    plan={paidInfo.plan}
                    nextPayDate={paidInfo.nextPayDate}
                    lastDate={lastDate}
                />
            ) : null}
            {isStopModalOpen ? (
                <Backdrop
                    setIsStopModalOpen={setIsStopModalOpen}
                />
            ) : null}
            {isRefundModalOpen ? (
                <RefundModal
                    setIsRefundModalOpen={setIsRefundModalOpen}
                />
            ) : null}
            {isRefundModalOpen ? (
                <Backdrop
                    setIsRefundModalOpen={setIsRefundModalOpen}
                />
            ) : null}
            {isCheckModalOpen ? (
                <StopCheckModal
                    setIsCheckModalOpen={setIsCheckModalOpen}
                    cardNumber={paidInfo.history.cardNumber}
                    lastDate={lastDate}
                />
            ) : null}
            {isCheckModalOpen ? (
                <Backdrop
                    setIsCheckModalOpen={setIsCheckModalOpen}
                />
            ) : null}
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Button = styled.div`
    font-size: 13px;
    font-weight: 400;
    color: rgba(103, 178, 255, 1);
    cursor: pointer;
    margin-bottom: 16px;
`;

const Table = styled.div`
    width: 100%;
    max-height: 611px;
    background-color: #FFFFFF;
    border-radius: 8px;
    overflow-y: scroll;
`;

const TableContent = styled.div`
    width: calc(100% - 52px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    padding: 0 26px;
    margin-top: 20px;
`;

const TableDate = styled.div`
    font-size: 13px;
    font-weight: 500;
    line-height: 13px;
    color: rgba(72, 162, 255, 1);
    margin-bottom: 14px;
`;

const TableTotalPrice = styled.div`
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: rgba(17, 17, 17, 1);
    margin-bottom: 14px;
`;

const TableText = styled.div`
    font-size: 13px;
    font-weight: 400;
    line-height: 20.8px;
    color: rgba(111, 112, 113, 1);
`;

const Border = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(242, 243, 245, 1);
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