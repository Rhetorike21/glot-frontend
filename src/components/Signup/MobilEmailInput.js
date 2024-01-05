import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function MobileEmailInput(props) {

    return (
        <InputOuter style={{ width: props.width, marginTop: props.margin }}>
            <Input
                placeholder="이메일"
                type="text"
                value = {props.userEmail}
                onChange={(e) => {
                    const email = e.target.value;
                    props.setUserEmail(email);
                }}
                style={{ marginTop: props.margin }}
            />
        </InputOuter>
    );
}

const InputOuter = styled.div`
    width: 327px;
    height: 48px;
    margin-bottom: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    border-radius: 10px;
`;

const Input = styled.input`
    width: 100%;
    height: 48px;
    border: 1px solid #eaebec;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 400;
    padding-left: 15px;
`;