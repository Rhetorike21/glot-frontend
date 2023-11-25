import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery,useMutation } from 'react-query';

import SearchApi from '../../services/SearchSchool';
import SearchGetApi from '../../services/SearchSchoolGet';

//기관검색 결과
export default function Result(props){
    const [inputSchool, setInputSchool] = useState(''); //입력한 기관명
    const [isResult, setIsResult] = useState(false); //검색결과가 있는지 없는지 판단하는 state

    const { data, isLoading, error } = useQuery('searchSchool', () => SearchGetApi(inputSchool),{
        onSuccess: (data) => {
            console.log(data);
        },
        onSettled: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        },
        enabled: isResult, // inputSchool이 비어있지 않을 때만 실행(입력없이 커서만 올려도 실행되는 것 방지)
        refetchInterval: 1000, // 1초마다 재요청
    });

    useEffect(() => {
      let timeoutId;
  
      // 타이머 설정
      const timer = setTimeout(() => {
        if (inputSchool !== '') {
          setIsResult(true);
        }
      }, 3000);
  
      // 타이머 ID 저장
      timeoutId = timer;
  
      return () => {
        // 컴포넌트가 언마운트되거나 새로운 입력이 들어올 때 타이머를 초기화
        clearTimeout(timeoutId);
      };
    }, [inputSchool]);

    const onClickSchool = (e) => {
        const school = e.target.innerText;
        setIsResult(false);
        setInputSchool(school);
    };

    const onClickSelfSchool = () => {
        setInputSchool(inputSchool);
        setIsResult(false);
    }

    useEffect(() => {   
        if (inputSchool !== '') {
            setIsResult(true);
        }
    }, [inputSchool]);

    // useEffect(() => {
    //   props.setUserSchool(inputSchool);
    // }, [inputSchool]);

    return (
      <Container>
        <Input
          placeholder="재직 중인 학교명, 학원명을 입력해주세요"
          type="text"
          value={inputSchool}
          onChange={(e) => {
            const school = e.target.value;
            setInputSchool(school);
          }}
        />
        {isResult ? (
          <ResultArea>
            {data?.map((school, index) => (
              <School key={index} onClick={onClickSchool}>
                {school.includes(inputSchool) ? (
                  <>
                    <Blue>{inputSchool}</Blue>
                    {school.substring(inputSchool.length)}
                  </>
                ) : (
                  school
                )}
              </School>
            ))}
            <ResultInputArea>
              <ResultInput onClick={onClickSelfSchool}>
                {inputSchool.includes(inputSchool) ? (
                  <>
                    <Blue>"{inputSchool}"</Blue>
                    {inputSchool.substring(inputSchool.length)}
                  </>
                ) : (
                  inputSchool
                )}
                (으)로 직접 등록하기
              </ResultInput>
            </ResultInputArea>
          </ResultArea>
        ) : (
          <></>
        )}
    </Container>
  );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 385px;
    height: 48px;
    border: 1px solid #eaebed;
    border-radius: 10px;
    margin-top: 5px;
    margin-left: 5px;
    margin-bottom: 3px;
    font-size: 13px;
    font-weight: 400;
    padding-left: 15px;
`;

const ResultArea = styled.div`
    position: absolute;
    top: 485px;
    width: 382px;
    min-height: 31px;
    max-height: 240px;
    margin-left: 4px;
    margin-top: 3px;
    padding: 8px;
    border: 1px solid rgba(234, 235, 237, 1);
    border-radius: 10px;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 20px 0px rgba(89, 96, 99, 0.16);
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(183, 184, 186, 1);
        border-radius: 6px;
        height: 20%;
    }
`;  

const ResultInputArea = styled.div`
    width: 372px;
    height: 21px;
    border: none;
    border-radius: 6px;
    background-color: #FFFFFF;
    font-size: 16px;
    font-weight: 400;
    padding: 5px;
    cursor: pointer;
`;

const ResultInput = styled.div`
    width: 372px;
    height: 21px;
    border: none;
    color: rgba(151, 152, 154, 1);
    font-size: 16px;
    font-weight: 5s00;
    cursor: pointer;
`;

const Blue = styled.span`
    color: #3290ff;
`;

const School = styled.div`
    width: 372px;
    height: 21px;
    border: none;
    border-radius: 6px;
    background-color: #FFFFFF;
    margin-bottom: 4px;
    font-size: 16px;
    font-weight: 400;
    padding: 5px;
    cursor: pointer;
    &:hover {
        background-color: #eaebed;
    }
`;