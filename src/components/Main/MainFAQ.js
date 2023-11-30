import React, {useState} from 'react';
import styled from 'styled-components';

import icon from '../../asset/FAQ.png';
import open from '../../asset/FAQopen.png';
import close from '../../asset/FAQclose.png';

export default function FAQ() {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleItem = (itemId) => {
      setExpandedItems((prevItems) => ({
        ...prevItems,
        [itemId]: !prevItems[itemId],
      }));
    };

    return(
        <MainFAQ>
            <MainDescriptionTitle>
                FAQ
            </MainDescriptionTitle>
            <MainDescriptionContent
                style={{
                    height: '100%',
                    margin: '0 auto',
                    marginBottom: '64px',
                    flexDirection: 'column',
                }}
            >
              {faqData.map((item, index) => (
                <FAQComponent
                    key={index}
                    style={{ height: expandedItems[index] ? '100%' : '72px' }}
                >
                    <FAQTitle>
                        <Container>
                            <FAQIcon src={icon} alt='icon' />
                            {item.question}
                        </Container>
                        <FAQButton
                            src={expandedItems[index] ? close : open}
                            alt='open'
                            onClick={() => toggleItem(index)}
                        ></FAQButton>
                    </FAQTitle>
                    {expandedItems[index] && (
                        <FAQContent>
                            <Bold>
                                {item.answerATitle}
                            </Bold>
                            {item.answerA}
                            <Bold>
                            {item.answerBTitle}
                            </Bold>
                            {item.answerB}
                            {item.answer}
                        </FAQContent>
                    )}
                </FAQComponent>
                ))}
            </MainDescriptionContent>
        </MainFAQ>
    )
}

const faqData = [
    {
        question: 'GLOT과 GLOT AI는 어떻게 다른가요? 그리고 GLOT과 GLOT AI는 어떤 역할을 하나요?',
        answerATitle: 'GLOT\n',
        answerA: '첫째, GLOT(General Logic Of Text)은 문장과 문장, 문단과 문단 간의 논리적인 관계를 정리한 로직(logic)을 의미합니다. [GLOT은 ※텍스트(Text, 글)의 논리적인 원리를 정리한 로직(logic)]\n 둘째, GLOT(General Logic Of Text)은 문장과 문장, 문단과 문단 간의 논리적인 관계를 발전형 · 반대형 · 결론형 등의 몇 가지 유형들로 정확하게 분류합니다. [문장과 문장, 문단과 문단과의 관계 파악]\n\n',
        answerBTitle: 'GLOT AI\n',
        answerB: 'GLOT(General Logic Of Text) 인공 지능(AI)은 GLOT(General Logic Of Text)이 텍스트(Text, 글)에서 할 수 있는 역할을 모두 해낼 수 있습니다. 현재 출시된 GLOT(General Logic Of Text) 인공 지능(AI)은 사용자가 ‘한국어로 구성된 작문의 기본 단계’를 수행할 수 있게 도와줍니다.\n 그러나 이후에 출시되는 GLOT(General Logic Of Text) 인공 지능(AI) 시리즈(series)는 전 세계 모든 사람들이 ‘전 세계 모든 언어들로 구성된 텍스트(Text, 글)의 독해 · 주제 도출 · 요약 · 작문 · 작문 평가’를 수행할 수 있게 도와줍니다.'
    },
    {
        question: '발전형 · 반대형 · 결론형은 어떻게 다른가요?',
        answer: '1. 발전형 · 반대형 · 결론형은 어떻게 다른가요?\n 첫째, 발전형은 제시된 문장의 내용을 이어 가면서 좀 더 진행되는 문장을 만드는 유형을 말합니다.\n 즉 발전형은 제시된 문장의 내용을 다음 문장의 내용으로 이어 가고, 다음 문장의 내용을 그다음 문장의 내용으로 이어 가는 것으로, 글쓴이가 의도하였던 방향을 단계적으로 진행시키는 문장을 만드는 유형을 말합니다.\n\n 둘째, 반대형은 제시된 문장의 내용을 이어 가면서 반대되는 문장의 내용을 만드는 유형을 말합니다.\n 즉 반대형은 제시된 문장의 내용에 반대되는 문장의 내용으로 이어 가는 것으로, 진행되었던 글의 내용을 반대 방향으로 바꾸는 문장을 만드는 유형을 말합니다.\n\n 셋째, 결론형은 제시된 문장의 내용을 이어 가면서 잠정적인 결론 문장의 내용을 만드는 유형을 말합니다.\n 즉 결론형은 제시된 문장의 내용에 대한 잠정적인 결론이 되는 문장의 내용으로, 진행되었던 글의 내용을 임시적으로 종합하여 정리하는 문장을 만드는 유형을 말합니다.\n\n 2. 발전형 · 반대형 · 결론형 이외에도 다른 유형들이 있나요?\n 발전형 · 반대형 · 결론형 이외에도 다른 유형들이 있습니다. 다만 발전형 · 반대형 · 결론형 이외에도 다른 유형들은, 이후에 출시되는 ‘GLOT(General Logic Of Text) 인공 지능(AI) 시리즈(series)’에서 보실 수 있습니다.'
    },
    {
        question: '작문을 도와주는 인공 지능(AI) 한국어 기본 단계’ 이외에도 다른 제품과 서비스가 있나요?',
        answer: '\'텍스트(Text, 글)의 작문을 도와주는 인공 지능(AI) 한국어 기본 단계\' 이외에도 다른 제품과 서비스가 있습니다.\n예를 들어 이후에 출시될 제품과 서비스로,\n(1) 텍스트(Text)의 작문 :\n① \'텍스트(Text)의 작문을 도와주는 인공 지능(AI)(한국어) 기본 단계(현재 출시됨)\'\n② \'텍스트(Text)의 작문을 도와주는 인공 지능(AI)(영어 · 스페인어 · 중국어 · 일본어 · 프랑스어 · 독일어 · 이탈리아어 · 힌디어 · 벵골어 · 태국어 · 필리핀어 · 베트남어 등 전 세계 모든 언어들) 기본 단계(출시 예정)\'\n③ \'텍스트(Text)의 작문을 도와주는 인공 지능(AI)(한국어) 고급 단계(출시 예정)\'\n④ \'텍스트(Text)의 작문을 도와주는 인공 지능(AI)(영어 · 스페인어 · 중국어 · 일본어 · 프랑스어 · 독일어 · 이탈리아어 · 힌디어 · 벵골어 · 태국어 · 필리핀어 · 베트남어 등 전 세계 모든 언어들) 고급 단계(출시 예정)\'\n(2) 텍스트(Text)의 독해 · 주제 도출 · 요약 :\n① \'텍스트(Text)의 독해 · 주제 도출 · 요약을 도와주는 인공 지능(AI)(한국어) 기본 단계(출시 예정)\'\n② \'텍스트(Text)의 독해 · 주제 도출 · 요약을 도와주는 인공 지능(AI)(영어 · 스페인어 · 중국어 · 일본어 · 프랑스어 · 독일어 · 이탈리아어 · 힌디어 · 벵골어 · 태국어 · 필리핀어 · 베트남어 등 전 세계 모든 언어들) 기본 단계(출시 예정)\'\n③ \'텍스트(Text)의 독해 · 주제 도출 · 요약을 도와주는 인공 지능(AI)(한국어) 고급 단계(출시 예정)\'\n④ \'텍스트(Text)의 독해 · 주제 도출 · 요약을 도와주는 인공 지능(AI)(영어 · 스페인어 · 중국어 · 일본어 · 프랑스어 · 독일어 · 이탈리아어 · 힌디어 · 벵골어 · 태국어 · 필리핀어 · 베트남어 등 전 세계 모든 언어들) 고급 단계(출시 예정)\'\n(3) 텍스트(Text)의 작문 평가 :\n① \’텍스트(Text)의 작문 평가를 도와주는 인공 지능(AI)(한국어) 기본 단계(출시 예정)\'\n② \'텍스트(Text)의 작문 평가를 도와주는 인공 지능(AI)(영어 · 스페인어 · 중국어 · 일본어 · 프랑스어 · 독일어 · 이탈리아어 · 힌디어 · 벵골어 · 태국어 · 필리핀어 · 베트남어 등'
    }
]

const MainFAQ = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const MainDescriptionTitle = styled.div`
    width: 100%;
    height: 53px;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 53px;
    font-weight: 700;
    margin-top: 56px;
    margin-bottom: 21px;
`;

const MainDescriptionContent = styled.div`
    height: 51px;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-top: 8px;
    margin-bottom: 64px;
    color: rgba(210, 220, 240, 1);
`;

const FAQComponent = styled.div`
    width: 757px;
    height: 72px;
    border-radius: 13px;
    background-color: rgba(248, 249, 251, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
    transition: height 0.3s;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const FAQTitle = styled.div`
    width: 757px;
    height: 72px;
    font-size: 17px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: -0.05em;
    text-align: left;
    color: rgba(111, 112, 113, 1);
    margin-left: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    @media (max-width: 768px) {
        width: 100%;
        font-size: 12px;
    }
`;

const Bold = styled.span`
    font-weight: 700;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    margin-left: 12px;
    @media (max-width: 768px) {
        margin-left: 0px;
    }
`;

const FAQContent = styled.div`
    width: 657px;
    border-top: 1px solid rgba(234, 235, 237, 1);
    padding: 16px 50px;
    white-space: pre-line;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.8;
    letter-spacing: -0.03em;
    text-align: left;
    color: rgba(111, 112, 113, 1);
    margin-bottom: 16px;
    @media (max-width: 768px) {
        width: 90%;
        font-size: 11px;
    }
`;

const FAQIcon = styled.img`
    width: 32px;
    height: 32px;
    margin-right: 12px;
    @media (max-width: 768px) {
        width: 24px;
        height: 24px;
        margin-right: 8px;
    }
`;

const FAQButton = styled.img`
    margin-right: 28px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    @media (max-width: 768px) {
        margin-left: 4px;
        width: 18px;
        height: 18px;
    }
`;