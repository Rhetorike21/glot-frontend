import React,{ useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";

import Header from "../../components/Header";
import PricingModal from "../../components/Modal/PricingMenuModal";
import OrderCheck from "../../components/Modal/OrderCheckModal";
import OrderSuccess from "../../components/Modal/OrderSuccessModal";
import WarningModal from "../../components/Modal/WarningModal";
import Backdrop from "../../components/Modal/Backdrop";

import MyInfoApi from "../../services/MyInfo";

import open from "../../asset/openIcon.png";
import close from "../../asset/closeIcon.png";

export default function EnterprisePricePlan() {
    const isTablet = useMediaQuery({
        query: "(max-width: 960px)",
    });

    const modalRef = useRef();

    const Price = 18000;

    const [userNumber, setUserNumber] = useState(10);
    const [openMenu, setOpenMenu] = useState(false); // 결제 방식 선택 모달 제어
    const [openCheck, setOpenCheck] = useState(false); // 결제 확인 모달 제어
    const [openSuccess, setOpenSuccess] = useState(false); // 결제 성공 모달 제어
    const [openWarning, setOpenWarning] = useState(false); // 결제 실패 모달 제어
    const [warningMessage, setWarningMessage] = useState(''); // 결제 실패 시 메시지
    const [pricingType, setPricingType] = useState('perYear');
    const [isCheck, setIsCheck] = useState(false); //약관 동의
    const [payment, setPayment] = useState({});
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0); // 스크롤 위치
    const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 }); // 클릭 좌표

    // 사용자 수에 따른 결제 정보 계산
    const monthlyPrice = new Intl.NumberFormat().format(Price * 0.8 * userNumber);
    const yearlyPrice = new Intl.NumberFormat().format(
        (Price * 12 * 0.7 * 0.8) / 12 * userNumber
    );
    const Vat = new Intl.NumberFormat().format(
        (Price * 12 * 0.7 * 0.8) / 12 * userNumber * 12 * 0.1
    );
    const totalPrice = new Intl.NumberFormat().format(
        (Price * 12 * 0.7 * 0.8) / 12 * userNumber * 12
    );
    const finalPrice = new Intl.NumberFormat().format(
        Math.floor(((Price * 12 * 0.7 * 0.8) / 12 * userNumber * 12 * 1.1) / 10) * 10
    );

    const monthlyVat = new Intl.NumberFormat().format(
        (Price * 0.8 * userNumber) * 0.1
    );
    const monthlyTotal = new Intl.NumberFormat().format(
        (Price * 0.8 * userNumber)
    );
    const monthlyFinal = new Intl.NumberFormat().format(
        (Price * 0.8 * userNumber) * 1.1
    );

    const savePrice = new Intl.NumberFormat().format(
        ((Price * 0.8 * userNumber) * 12) - ((Price * 12 * 0.7 * 0.8) / 12 * userNumber * 12)
    );

    const { data }  = useQuery('myInfo', () => MyInfoApi(),{
        onError: (error) => {
            console.log(error);
        },
    });

    const userName = data?.name || '';
    const userEmail = data?.email || '';
    const userPhone = data?.phone || '';

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = (e) => {
        // 클릭한 좌표 저장
        setClickCoordinates({ x: e.clientX + 90, y: e.clientY + 30 + scrollPosition });
        
        // 모달 열기
        setOpenMenu(true);
    };

    const onClickOrder = async () => {
        setOpenCheck(true);
    }

    return (
        <Container>
            <Header />
            <Content>
                <InnerContent>
                    <InnerContainer>
                        <TextArea>
                            <Title>
                                정기 결제 신청
                            </Title>
                            <Description>
                                처음 결제한 날짜를 정기 결제일로 자동 설정하며, 요금은{'\n'}
                                사용인원에 따라 결제금액이 변경될 수 있습니다.
                            </Description>
                        </TextArea>
                        <Box>
                            <LeftBox>
                                <BoxContainer>
                                    <BoxTitle>
                                        GLOT 엔터프라이즈
                                    </BoxTitle>
                                    <BoxContent>
                                        <Name>
                                            사용자 수
                                        </Name>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <UserInput
                                                value={userNumber}
                                                onChange={(e) => setUserNumber(e.target.value)}
                                            >                    
                                            </UserInput>
                                            <Name>
                                                명
                                            </Name>
                                        </div>
                                    </BoxContent>
                                    <Line />
                                    <BoxContent>
                                        <Name>
                                            월간 결제(Monthly)
                                        </Name>
                                        <Value>
                                            매월 <Big>{monthlyPrice}</Big>원 납부
                                        </Value>
                                    </BoxContent>
                                    <Line />
                                    <BoxContent>
                                        <Name>
                                            연간 결제(Yearly)
                                        </Name>
                                        <Value>
                                            매월 <Blue>{yearlyPrice}</Blue>원 납부
                                        </Value>
                                    </BoxContent>
                                    <Notice>
                                    ※ 월간 결제, 연간 결제 모두 vat 별도 금액입니다.
                                    </Notice>
                                    <Line />
                                    <BoxContent
                                        style={{
                                            justifyContent: 'flex-start',
                                            height: '56px',
                                        }}
                                    >
                                        <Name
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            onClick={(e) => {
                                                handleClick(e);
                                                setOpenMenu(!openMenu);
                                            }}
                                            ref={modalRef} // ref 추가
                                        >
                                            {pricingType === 'perYear' ? '연간결제' : '월간결제'}
                                            <Icon src={open} />
                                        </Name>
                                        <Message
                                            style={{
                                                display: pricingType === 'perYear' ? 'block' : 'none',
                                            }}
                                        >
                                            축하합니다! {savePrice}원을 절약할 수 있습니다
                                        </Message>                   
                                    </BoxContent>
                                    <BoxContent
                                        style={{
                                            height: '32px',
                                        }}
                                    >
                                        <Name
                                            style={{
                                                fontSize: '15px',
                                                fontWeight: '500',
                                                lineHeight: '21px',
                                            }}
                                        >
                                            총 결제 예정 금액
                                        </Name>
                                        <Value>
                                            {pricingType === 'perYear' ? (
                                                <><Big>{finalPrice} </Big>/연</>
                                            ) : (
                                                <><Big>{monthlyFinal} </Big>/월</>
                                            )}
                                        </Value>
                                    </BoxContent>
                                    <BoxContent
                                        style={{
                                            height: '32px',
                                            marginTop: '8px',
                                        }}
                                    >
                                        <Name>
                                            공급가 액
                                        </Name>
                                        <Value>
                                            {pricingType === 'perYear' ? (
                                                <>{totalPrice}원</>
                                            ) : (
                                                <>{monthlyTotal}원</>
                                            )}
                                        </Value>
                                    </BoxContent>
                                    <BoxContent
                                        style={{
                                            height: '32px',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <Name>
                                            세액
                                        </Name>
                                        <Value>
                                            {pricingType === 'perYear' ? (
                                                <>{Vat}원</>
                                            ) : (
                                                <>{monthlyVat}원</>
                                            )}
                                        </Value>
                                    </BoxContent>
                                </BoxContainer>
                                <div style={{
                                    display: isTablet ? 'none' : 'contents',
                                }}>
                                    <CheckBox>
                                        <input 
                                            type="checkbox" 
                                            id="checkbox" 
                                            checked={isCheck}
                                            onChange={() => setIsCheck(!isCheck)}
                                        />
                                        <Link
                                            href="https://rhetorike.notion.site/7fdf82818471443aa6746139a446ee43?pvs=4"
                                            target="_blank"
                                        >
                                            정기과금, 이용약관
                                        </Link>
                                        의 내용을 확인하였고 동의합니다.
                                    </CheckBox>
                                    <Button
                                        style={{
                                            backgroundColor : isCheck ? 'rgba(50, 144, 255, 1)' : 'rgba(183, 184, 186, 1)',
                                        }}
                                        disabled={!isCheck}
                                        onClick={onClickOrder}
                                    >
                                        결제 신청
                                    </Button>
                                    <Notice>
                                        *결제 정보는 SSL 암호화로 안전하게 전송되며 카드정보를 서버에 저장하지 않습니다.
                                    </Notice>
                                </div>
                            </LeftBox>
                            <RightBox>
                                <BoxContainer
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none'
                                    }}
                                >
                                    <InputName>
                                        이름
                                    </InputName>
                                    <Input
                                        disabled={true}
                                        value={userName}
                                        style={{
                                            color: 'rgba(151, 152, 154, 1)'
                                        }}
                                    />
                                    <InputName>
                                        이메일
                                    </InputName>
                                    <Input
                                        disabled={true}
                                        value={userEmail}
                                        style={{
                                            color: 'rgba(151, 152, 154, 1)'
                                        }}
                                    />
                                    <InputName>
                                        전화번호
                                    </InputName>
                                    <Input
                                        disabled={true}
                                        value={userPhone}
                                        style={{
                                            color: 'rgba(151, 152, 154, 1)'
                                        }}
                                    />
                                    <InputName>
                                        카드번호
                                    </InputName>
                                    <Input
                                        placeholder="카드번호를 입력하세요(15~16자리)"
                                        value={payment.cardNumber}
                                        onChange={(e) => setPayment({
                                            ...payment,
                                            cardNumber: e.target.value,
                                        })}
                                    />
                                    <InputName>
                                        유효기간
                                    </InputName>
                                    <SelectBox>
                                        <Select
                                            value={expiryMonth}
                                            onChange={(e) => setExpiryMonth(e.target.value)}
                                        >
                                            <Option>MM</Option>
                                            <Option>1월</Option>
                                            <Option>2월</Option>
                                            <Option>3월</Option>
                                            <Option>4월</Option>
                                            <Option>5월</Option>
                                            <Option>6월</Option>
                                            <Option>7월</Option>
                                            <Option>8월</Option>
                                            <Option>9월</Option>
                                            <Option>10월</Option>
                                            <Option>11월</Option>
                                            <Option>12</Option>
                                        </Select>
                                        <Select
                                            value={expiryYear}
                                            onChange={(e) => setExpiryYear(e.target.value)}
                                        >
                                            <Option>YY</Option>
                                            <Option>2023년</Option>
                                            <Option>2024년</Option>
                                            <Option>2025년</Option>
                                            <Option>2026</Option>
                                            <Option>2027년</Option>
                                            <Option>2028년</Option>
                                            <Option>2029년</Option>
                                            <Option>2030년</Option>
                                            <Option>2031년</Option>
                                            <Option>2032년</Option>
                                            <Option>2033년</Option>
                                        </Select>
                                    </SelectBox>
                                    <InputName>
                                        비밀번호 앞 두자리
                                    </InputName>
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '100%',
                                        }}
                                    >
                                        <Input
                                            placeholder="●●"
                                            type="password"
                                            style={{
                                                width: '71px',
                                                height: '44px',
                                            }}
                                            value={payment.password}
                                            onChange={(e) => setPayment({
                                                ...payment,
                                                password: e.target.value,
                                            })}
                                        />
                                        <PwInput>
                                            ●●
                                        </PwInput>
                                    </div>
                                    <InputName>
                                        사업자번호 10자리(법인) | 생년월일 6자리(개인)
                                    </InputName>
                                    <Input
                                        placeholder="- 빼고 입력"
                                        value={payment.birthDate}
                                        onChange={(e) => setPayment({
                                            ...payment,
                                            birthDate: e.target.value,
                                        })}
                                    />
                                </BoxContainer>
                            </RightBox>
                            <ButtonOuter 
                                style={{
                                    display: isTablet ? 'contents' : 'none',
                                }}
                            >
                                    <CheckBox
                                        style={{
                                            width: '70%',
                                        }}
                                    >
                                        <input 
                                            type="checkbox" 
                                            id="checkbox" 
                                            checked={isCheck}
                                            onChange={() => setIsCheck(!isCheck)}
                                        />
                                        <Link
                                            href="https://rhetorike.notion.site/7fdf82818471443aa6746139a446ee43?pvs=4"
                                            target="_blank"
                                        >
                                            정기과금, 이용약관
                                        </Link>
                                        의 내용을 확인하였고 동의합니다.
                                    </CheckBox>
                                    <Button
                                        style={{
                                            backgroundColor : isCheck ? 'rgba(50, 144, 255, 1)' : 'rgba(183, 184, 186, 1)',
                                            width: '70%',
                                        }}
                                        disabled={!isCheck}
                                        onClick={onClickOrder}
                                    >
                                        결제 신청
                                    </Button>
                                    <Notice
                                        style={{
                                            width: '70%',
                                        }}
                                    >
                                        *결제 정보는 SSL 암호화로 안전하게 전송되며 카드정보를 서버에 저장하지 않습니다.
                                    </Notice>
                                </ButtonOuter>
                        </Box>
                    </InnerContainer>
                </InnerContent>
            </Content>
            {openMenu && <PricingModal setOpenMenu={setOpenMenu} pricingType={pricingType} setPricingType={setPricingType} clickCoordinates={clickCoordinates} modalRef={modalRef}/>}
            {openCheck && <OrderCheck setOpenCheck={setOpenCheck} pricingType={pricingType} userNumber={userNumber} payment={payment} expiryMonth={expiryMonth} expiryYear={expiryYear} setOpenSuccess={setOpenSuccess} setOpenWarning={setOpenWarning} setWarningMessage={setWarningMessage}/>}
            {openSuccess && <OrderSuccess setOpenSuccess={setOpenSuccess} />}
            {openCheck && <Backdrop setOpenCheck={setOpenCheck}/>}
            {openSuccess && <Backdrop setOpenSuccess={setOpenSuccess}/>}
            {openWarning && <WarningModal setOpenWarning={setOpenWarning} warningMessage={warningMessage}/>}
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
`;

const Big = styled.span`
    font-size: 22px;
    font-weight: 600;
`;

const InnerContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 934px;
    flex: 1;
    margin-top: 3px
    border: 1px solid black;
    @media (max-width: 960px) {
        min-width: 0px;
    }
`;

const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: centet;
    align-items: center;
    background: linear-gradient(to right, white 50%, rgba(248, 249, 251, 1) 50%);
    @media (max-width: 960px) {
        background: white;
    }
`;

const TextArea = styled.div`
    width: 934px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    margin-top: 56px;
    @media (max-width: 960px) {
        width: 100%;
    }
`;

const Title = styled.div`
    font-size: 32px;
    font-weight: 600;
    line-height: 32x;
    letter-spacing: -0.03em;
    color: rgba(17, 17, 17, 1);
    text-align: left;
    margin-bottom: 16px;
    @media (max-width: 960px) {
        text-align: center;
        font-size: 28px;
        font-weight: 600;
    }
`;

const Description = styled.div`
    font-size: 15px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.03em;
    color: rgba(151, 152, 154, 1);
    text-align: left;
    white-space: pre-line;
    @media (max-width: 960px) {
        text-align: center;
        font-size: 14px;
        font-weight: 400;
    }
`;

const Box = styled.div`
    width: 934px;
    height: 811px;
    margin-top: 56px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 960px) {
        width: 100%;
        flex-direction: column;
        height: 100%;
        align-items: center;
    }
`;

const LeftBox = styled.div`
    width: 422px;
    height: 100%;
    border-radius: 14px;
    border: none;
    @media (max-width: 960px) {
        width: 70%;
        height: 100%;
        margin-bottom: 56px;
    }
`;

const BoxContainer = styled.div`
    width: 100%;
    border: 1px solid rgba(242, 243, 245, 1);
    border-radius: 14px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const BoxTitle = styled.div`
    width: calc(100% - 16px);
    height: 64px;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: rgba(17, 17, 17, 1);
    background-color: rgba(242, 243, 245, 1);
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 16px;
`;

const BoxContent = styled.div`
    width: calc(100% - 38px);
    height: 76px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 19px;
    padding-right: 19px;
`;

const Name = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6ßpx;
    letter-spacing: -0.03em;
    text-align: left;
    color: rgba(17, 17, 17, 1);
`;

const Value = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 22.4px;
    letter-spacing: -0.03em;
    text-align: right;
    color: rgba(17, 17, 17, 1);
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
`;

const Icon = styled.img`
    width: 10px;
    height: 5px;
    margin-left: 7px;
    cursor: pointer;
    margin-bottom: 2px;
`;

const Blue = styled.span`
    color: rgba(50, 144, 255, 1);
    font-size: 22px;
    font-weight: 600;
`;

const UserInput = styled.input`
    width: 72px;
    height: 30px;
    border: 1px solid #EAEAEA;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: -0.03em;
    text-align: right;
    color: rgba(17, 17, 17, 1);
    margin-right: 8px;
    padding-right: 8px;
    ::placeholder {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color:rgba(183, 184, 186, 1);
    }
`;

const Line = styled.div`
    width: calc(100% - 32px);
    height: 1px;
    background-color: rgba(242, 243, 245, 1);
`;

const Notice = styled.div`
    width: calc(100% - 19px);
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    letter-spacing: -0.03em;
    text-align: right;
    color: rgba(183, 184, 186, 1);
    padding-right: 19px;
    margin-bottom: 22px;
`;

const Message = styled.div`
    font-size: 13px;
    font-weight: 400;
    line-height: 18.2px;
    letter-spacing: -0.03em;
    text-align: left;
    color: rgba(50, 144, 255, 1);
    margin-left: 16px;
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
`;

const CheckBox = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    letter-spacing: -0.03em;
    text-align: left;
    color: rgba(111, 112, 113, 1);
    margin-top: 11px;
`;

const Link = styled.a`
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    letter-spacing: -0.03em;
    text-align: left;
    color: rgba(50, 144, 255, 1);
    margin-left: 8px;
    cursor: pointer;
    text-decoration: underline;
`;

const Button = styled.button`
    width: 100%;
    height: 56px;
    border: none;
    border-radius: 14px;
    background-color: rgba(50, 144, 255, 1);
    font-size: 16px;
    font-weight: 500;
    line-height: 22.4px;
    letter-spacing: -0.03em;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    margin-top: 16px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const RightBox = styled.div`
    width: 422px;
    @media (max-width: 960px) {
        width: 70%;
    }
`;

const InputName = styled.div`
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    line-height: 19.6px;
    letter-spacing: -0.03em;
    text-align: left;
    color: rgba(111, 112, 113, 1);
`;

const Input = styled.input`
    width: calc(100% - 16px);
    height: 44px;
    border: 1px solid #F2F3F5;
    border-radius: 10px;
    padding-left: 16px;
    margin-bottom: 16px;
    margin-top: 4px;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: -0.03em;
    color: rgba(17, 17, 17, 1);
    &::placeholder {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color:rgba(183, 184, 186, 1);
    }
`;

const PwInput = styled.div`
    width: calc(100% - 97px);
    height: 44px;
    font-size: 15px;
    padding-left: 16px;
    margin-bottom: 16px;
    margin-top: 4px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SelectBox = styled.div`
    width: 100%;
    height: 44px;
    border-radius: 10px;
    margin-bottom: 16px;
    margin-top: 4px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Select = styled.select`
    width: 140px;
    height: 100%;
    border: 1px solid rgba(234, 235, 237, 1);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    letter-spacing: -0.03em;
    text-align: left;
    color: rgba(17,17,17,1);
    padding-left: 16px;
    padding-right: 16px;
    cursor: pointer;
    margin-right: 8px;
    ::placeholder {
        color: rgba(183, 184, 186, 1);
    }
`;

const Option = styled.option`
    width: 100%;
    height: 100%;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    letter-spacing: -0.03em;
    text-align: left;
    color: rgba(111, 112, 113, 1);
`;

const ButtonOuter = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: 50px;
    border: 1px solid black;
`;
