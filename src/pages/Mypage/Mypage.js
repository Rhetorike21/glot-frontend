import React,{ useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { UserType } from "../../recoil/Atom";

import Header from "../../components/Header";

import MyInfoApi from "../../services/MyInfo";
import MyInfoEditApi from "../../services/MyInfoEdit";

export default function Mypage() {
    const navigate = useNavigate();
    const location = useLocation();

    const userType = useRecoilValue(UserType);
    const [myInfo, setMyInfo] = useState({});
    const [nameEditing, setNameEditing] = useState(false);
    const [phoneEditing, setPhoneEditing] = useState(false);
    const [mobileEditing, setMobileEditing] = useState(false);
    const [emailEditing, setEmailEditing] = useState(false);
    const [pwEditing, setPwEditing] = useState(false);

    const onClickGroupInfo = () => {
        if(userType === 'SUBSCRIBED') {
            navigate('/mypage/groupinfo');
        }
        else {
            alert('요금제 구매 후 이용 가능합니다.');
        }
    }

    const onClickPricePlan = () => {
        if (userType !== 'FREE') {
            navigate('/mypage/paid_info');
        }
        else {
            navigate('/mypage/free_info');
        }
    }

    useEffect(() => {
        const getMyInfo = async () => {
            try {
                const response = await MyInfoApi();
                setMyInfo(response);
            }
            catch (error) {
                console.log(error);
            }
        }
        getMyInfo();
    }
    , []);

    const onClickEdit = async () => {
        try {
            // 사용자가 수정한 정보만 가져오기
            const editedInfo = {
                name: nameEditing ? myInfo.name : null,
                mobile: mobileEditing ? myInfo.mobile : null,
                email: emailEditing ? myInfo.email : null,
                password: pwEditing ? myInfo.password : null,
            };
    
            // API 호출
            const response = await MyInfoEditApi(
                editedInfo.name,
                editedInfo.mobile,
                editedInfo.email,
                editedInfo.password
            );
        }
        catch (error) {
            console.log(error);
        }
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
                    <InnerContainer>
                        <Title>내 정보</Title>
                        <InputArea>
                            <InputName>이용 중인 플랜</InputName>
                            <DataBox
                                value={myInfo.subscription}
                                readOnly
                                style={{
                                    backgroundColor: '#F2F3F5',
                                    outline: 'none',
                                }}
                            />
                            <ButtonArea/>
                        </InputArea>
                        <InputArea>
                            <InputName>고객 유형</InputName>
                            <DataBox
                                value={myInfo.userType}
                                readOnly
                                style={{
                                    backgroundColor: '#F2F3F5',
                                    outline: 'none',
                                }}
                            />
                            <ButtonArea/>
                        </InputArea>
                        <InputArea>
                            <InputName>이름</InputName>
                            <DataBox
                                value={myInfo.name}
                                onChange={(e) => setMyInfo({...myInfo, name: e.target.value})}
                                disabled={!nameEditing}
                            />
                            {nameEditing? (
                                <ButtonArea>
                                    <EditButton style={{color: 'rgba(183, 184, 186, 1)'}} onClick={() => {setNameEditing(false)}}>취소</EditButton>
                                    <EditButton onClick={() => {setNameEditing(false) 
                                        onClickEdit()}}>저장</EditButton>
                                </ButtonArea>
                            ):(
                                <ButtonArea
                                    style={{
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <EditButton onClick={() => {setNameEditing(true)}}>수정</EditButton>
                                </ButtonArea>
                            )}
                        </InputArea>
                        <InputArea>
                            <InputName>전화번호</InputName>
                            <DataBox
                                value={myInfo.phone}
                                onChange={(e) => setMyInfo({...myInfo, phone: e.target.value})}
                                disabled={!phoneEditing}
                            />
                            {phoneEditing? (
                                <ButtonArea>
                                    <EditButton style={{color: 'rgba(183, 184, 186, 1)'}} onClick={() => {setPhoneEditing(false)}}>취소</EditButton>
                                    <EditButton onClick={() => {setPhoneEditing(false)}}>저장</EditButton>
                                </ButtonArea>
                            ):(
                                <ButtonArea
                                    style={{
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <EditButton onClick={() => {setPhoneEditing(true)}}>수정</EditButton>
                                </ButtonArea>
                            )}
                        </InputArea>
                        <InputArea>
                            <InputName>휴대전화번호</InputName>
                            <DataBox
                                value={myInfo.mobile}
                                onChange={(e) => setMyInfo({...myInfo, mobile: e.target.value})}
                                disabled={!mobileEditing}
                            />
                            {mobileEditing? (
                                <ButtonArea>
                                    <EditButton style={{color: 'rgba(183, 184, 186, 1)'}} onClick={() => {setMobileEditing(false)}}>취소</EditButton>
                                    <EditButton onClick={() => {setMobileEditing(false)}}>저장</EditButton>
                                </ButtonArea>
                            ):(
                                <ButtonArea
                                    style={{
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <EditButton onClick={() => {setMobileEditing(true)}}>수정</EditButton>
                                </ButtonArea>
                            )}
                        </InputArea>
                        <InputArea>
                            <InputName>이메일</InputName>
                            <DataBox
                                value={myInfo.email}
                                onChange={(e) => setMyInfo({...myInfo, email: e.target.value})}
                                disabled={!emailEditing}
                            />
                            {emailEditing? (
                                <ButtonArea>
                                    <EditButton style={{color: 'rgba(183, 184, 186, 1)'}} onClick={() => {setEmailEditing(false)}}>취소</EditButton>
                                    <EditButton onClick={() => {setEmailEditing(false)}}>저장</EditButton>
                                </ButtonArea>
                            ):(
                                <ButtonArea
                                    style={{
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <EditButton onClick={() => {setEmailEditing(true)}}>수정</EditButton>
                                </ButtonArea>
                            )}
                        </InputArea>
                        <InputArea>
                            <InputName>아이디</InputName>
                            <DataBox
                                value={myInfo.accountId}
                                readOnly
                                style={{
                                    backgroundColor: '#F2F3F5',
                                    outline: 'none',
                                }}
                            />
                            <ButtonArea/>
                        </InputArea>
                        <InputArea>
                            <InputName>비밀번호</InputName>
                            <DataBox
                                placeholder="●●●●●●●"
                                value={myInfo.pw}
                                onChange={(e) => setMyInfo({...myInfo, password: e.target.value})}
                                type="password"
                                disabled={!pwEditing}
                            />
                            {pwEditing? (
                                <ButtonArea>
                                    <EditButton style={{color: 'rgba(183, 184, 186, 1)'}} onClick={() => {setPwEditing(false)}}>취소</EditButton>
                                    <EditButton onClick={() => {setPwEditing(false)}}>저장</EditButton>
                                </ButtonArea>
                            ):(
                                <ButtonArea
                                    style={{
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <EditButton onClick={() => {setPwEditing(true)}}>수정</EditButton>
                                </ButtonArea>
                            )}
                        </InputArea>
                    </InnerContainer>
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

const InnerContent = styled.div`
    width: calc(100% - 176px);
    height: 100%;
    padding: 48px;
    display: flex;
    justify-content: center;
    overflow: auto;
    flex: 1;
`;

const InnerContainer = styled.div`
    width: 400px;
    height: 100%;
    background-color: #FFFFFF;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 98px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 500;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
`;

const InputArea = styled.div`
    width: 100%;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const InputName = styled.div`
    width: 200px;
    font-size: 14px;
    font-weight: 500;
    color: #6F7071;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const DataBox = styled.input`
    width: 384px;
    height: 48px;
    border: 1px solid #EAEBED;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    color: #6F7071;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
    padding-left: 16px;
    &:disabled {
        background-color: #FFF;
    }
`;

const ButtonArea = styled.div`
    position: relative;
    bottom: 31px;
    left: 300px;
    width: 100px;
    height: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const EditButton = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: rgba(50, 144, 255, 1);
    cursor: pointer;
    margin-right: 16px;
`;
