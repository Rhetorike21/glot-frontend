import React , { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { UserType } from '../../data/Atom';

import Header from '../../components/Header';
import { Toggle } from '../../components/Toggle';

import AccountListApi from '../../services/AccountList';

export default function GroupInfo() {
    const navigate = useNavigate();
    const location = useLocation();

    const userType = useRecoilValue(UserType);
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        const getAccountList = async () => {
            try {
                const response = await AccountListApi();
                setMemberList(response.members);
            } catch (error) {
                console.log(error);
            }
        }
        getAccountList();
    }, []);

    const handleNameEdit = (index, newName) => {
        // 복사된 배열을 생성하고 수정된 이름으로 업데이트
        const updatedMemberList = [...memberList];
        updatedMemberList[index].name = newName;
        setMemberList(updatedMemberList);
    }

    const onClickPricePlan = () => {
        if (userType !== 'FREE') {
            navigate('/mypage/paid_info');
        }
        else {
            navigate('/mypage/free_info');
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
                        <Title>구매 계정 정보</Title>
                        <Table>
                            <thead>
                                <tr>
                                    <th style={{ width: '10%', paddingLeft: '10px' }}>번호</th>
                                    <th style={{ width: '20%' }}>아이디</th>
                                    <th style={{ width: '8%' }}>이름</th>
                                    <th style={{ width: '22%' }}></th>
                                    <th style={{ width: '20%' }}>마지막 접속 기록</th>
                                    <th style={{ width: '20%' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {memberList.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td style={{ paddingLeft: '20px' }}>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.editing ? (
                                                <NameInput
                                                    type="text"
                                                    value={item.name}
                                                    onChange={(e) => {
                                                        handleNameEdit(index, e.target.value);
                                                    }}
                                                    style={{
                                                        marginTop: '2px',
                                                    }}
                                                    autoFocus={true}
                                                />
                                            ) : (
                                                item.name
                                            )    
                                            }
                                            </td>
                                            <td>
                                                {item.editing ? (
                                                    <>
                                                    <ResetButton
                                                        onClick={() => {
                                                            // 수정 모드로 전환
                                                            const updatedMemberList = [...memberList];
                                                            updatedMemberList[index].editing = false;
                                                            setMemberList(updatedMemberList);
                                                        }}
                                                    >
                                                        확인
                                                    </ResetButton>
                                                    <ResetButton
                                                        onClick={() => {
                                                            // 수정 모드로 전환
                                                            const updatedMemberList = [...memberList];
                                                            updatedMemberList[index].editing = false;
                                                            setMemberList(updatedMemberList);
                                                        }}
                                                        style={{
                                                            color: 'rgba(183, 184, 186, 1)'
                                                        }}
                                                    >
                                                        취소
                                                    </ResetButton>
                                                    </>
                                                ) : (
                                                    <>
                                                    <ResetButton
                                                        onClick={() => {
                                                            // 수정 모드로 전환
                                                            const updatedMemberList = [...memberList];
                                                            updatedMemberList[index].editing = true;
                                                            setMemberList(updatedMemberList);
                                                        }}
                                                    >
                                                        [수정]
                                                    </ResetButton>
                                                    </>
                                                )
                                                }
                                            </td>
                                            <td>{item.lastLogin}</td>
                                            <td> <Toggle active={item.active}/></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </InnerContainer>
                </InnerContent>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
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
    min-height: 100vh;
    padding: 48px;
    display: flex;
    justify-content: center;
    margin-bottom: 66px;
    flex: 1;
`;

const InnerContainer = styled.div`
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 500;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
`;

const Table = styled.table`
    width: 900px;
    border-collapse: collapse;
    text-align: left;
    border-collapse: separate;
    border-spacing: 0 4px;
    & th {
        height: 42px;
        font-size: 16px;
        font-weight: 600;
        color: rgba(183, 184, 186, 1);
    }
    & td {
        height: 46px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(60, 61, 63, 1);
        background-color: rgba(248, 249, 251, 1);
        overflow: hidden; // 넘칠 내용 숨김 처리
    }
`;

const ResetButton = styled.button`
    border: none;
    background-color: rgba(248, 249, 251, 1);
    font-size: 16px;
    font-weight: 400;
    color: rgba(50, 144, 255, 1);
    cursor: pointer;
`;

const NameInput = styled.input`
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    color: rgba(60, 61, 63, 1);
    background-color: rgba(248, 249, 251, 1);
    border: none;
    padding: 0;
    &:focus {
        outline: none;
    }
`;