import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import check from '../../asset/blueCheck.png';
import uncheck from '../../asset/grayCheck.png';

function Dropdown() {
    const navigate = useNavigate();
    const [isWritingActive, setIsWritingActive] = useState(false);

    useEffect(() => {
        // 현재 URL에서 /writing이 포함되어 있는지 확인
        setIsWritingActive(window.location.pathname.includes('/writing'));
    }, []);

    return (
        <Container>
                <DropdownItem
                    onClick={() => {
                        navigate('/writing');
                    }}
                >
                        <DropdownText>GLOT <Bold>Writing</Bold></DropdownText>
                        <img
                            src={isWritingActive ? check : uncheck}
                            alt='check'
                            style={{
                                width: '16px',
                                height: '16px',
                                marginRight: '8px',
                            }}
                        />
                </DropdownItem>
                <DropdownItem
                    onClick={() => {
                        window.open("http://www.heyglot.com/", "_blank");
                    }}
                >
                        <DropdownText>RHETORIKE <Bold>HOME</Bold></DropdownText>
                        <img
                            src={uncheck}
                            alt='check'
                            style={{
                                width: '16px',
                                height: '16px',
                                marginRight: '8px',
                            }}
                        />
                </DropdownItem>
        </Container>
    );
  }
  
  export default Dropdown;

const Container = styled.div`
    width: 175px;
    height: 82px;
    padding: 8px;
    background-color: #FFFFFF;
    border: 1px solid #F2F3F5;
    border-radius: 10px;
    box-shadow: 0px 2px 8px 0px #868C461C;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    margin-top: 150px;
    margin-left: 40px;
`;

const Bold = styled.span`
    font-weight: 700;
    margin-left: 5px;
`;

const DropdownItem = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    &:hover {
        background-color: rgba(242, 243, 245, 1);
    }
`;

const DropdownText = styled.div`
    width: 100%;
    height: 100%;
    padding: 8px;
    display: flex;
    color: #5B5C5E;
    font-size: 16px;
    font-weight: 500;
    justify-content: flex-start;
    align-items: center;
    letter-spacing: -0.04em;
`;
