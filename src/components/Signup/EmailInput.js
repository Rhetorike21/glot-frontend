import React,{useState, useEffect} from 'react';
import styled from 'styled-components';

export default function Email(props) {
    const [userEmailId, setUserEmailId] = useState('');
    const [writeEmailDomain, setWriteEmailDomain] = useState(''); //직접입력시 사용하는 state
    const [selectedEmailDomain, setSelectedEmailDomain] = useState(''); //직접입력이 아닌경우 사용하는 state

    useEffect(() => {
        if (writeEmailDomain) {
            props.setUserEmail(userEmailId + '@' + writeEmailDomain);
        } else {
            props.setUserEmail(userEmailId + '@' + selectedEmailDomain);
        }
    }
    , [userEmailId, writeEmailDomain, selectedEmailDomain]);

    return (
        <InputOuter style={{marginTop: props.margin}}>
            <Input
                placeholder="이메일"
                type="text"
                style={{ 
                    height: "90%",
                    marginBottom: '5px',
                }}
                value={userEmailId}
                onChange={(e) => {
                    const id = e.target.value;
                    setUserEmailId(id);
                }}
            />
            <Dot>@</Dot>  
            {selectedEmailDomain === '' ? (
                <Input
                    placeholder="직접입력"
                    type="text"
                    style={{ 
                        height: "90%",
                        marginBottom: '5px',
                    }}
                    value={writeEmailDomain}
                    onChange={(e) => {
                        const domain = e.target.value;
                        setWriteEmailDomain(domain);
                    }}
                />
            ) : (
                <Input
                    style={{ 
                        height: "90%",
                        marginBottom: '5px',
                    }}
                    value={selectedEmailDomain}
                />
            )}
            <SelectEmailDomain
                value={selectedEmailDomain}
                onChange={(e) => {
                    const domain = e.target.value;
                    setSelectedEmailDomain(domain);
                }}
            >
                <option value="" >직접입력</option>
                <option value="naver.com">naver.com</option>
                <option value="nate.com">nate.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="daum.net">daum.net</option>
                <option value="lycos.co.kr">lycos.co.kr</option>
                <option value="korea.com">korea.com</option>
                <option value="empal.com">empal.com</option>
                <option value="dreamwiz.com">dreamwiz.com</option>
                <option value="yahoo.com">yahoo.com</option>
                <option value="hotmail.com">hotmail.com</option>
                <option value="nestgo.com">nestgo.com</option>
            </SelectEmailDomain> 
        </InputOuter>
    )
}

const InputOuter = styled.div`
    width: 402px;
    height: 48px;
    margin-bottom: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eaebec;
    border-radius: 10px;
`;

const SelectEmailDomain = styled.select`
    height: 48px;
    width: 110px;
    border: none;
    outline: none;
    font-size: 13px;
    font-weight: 400;
    border-radius: 10px;
`;

const Input = styled.input`
    width: 105px;
    height: 48px;
    border: none;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 400;
    padding-left: 15px;
    margin-top: 5px;
`;

const Dot = styled.div`
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
`;