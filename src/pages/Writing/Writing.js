import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useReactToPrint } from 'react-to-print';
import getCaretCoordinates from 'textarea-caret';
import dayjs from 'dayjs';

import { useRecoilState } from 'recoil';
import { LoginState, WritingTitle, WritingContent, WritingId, Sentence, SentenceList, SentenceType, UserType } from '../../data/Atom';

import Header from '../../components/Header';
import SideBar from '../../components/Writing/SideBar';
import Backdrop from '../../components/Modal/Backdrop';
import OptionModal from '../../components/Modal/WritingOptionModal';
import ExampleModal from '../../components/Modal/WritingExampleModal';
import VersionNotice from '../../components/Modal/VersionNoticeModal';
import WarningModal from '../../components/Modal/WritingSaveNoticeModal';
import WritingDeleteModal from '../../components/Modal/WritingDeleteModal';

import WritingSaveApi from '../../services/WritingSave';
import WritingDetailApi from '../../services/WritingDetail';
import WritingListApi from '../../services/WritingList';

import open from '../../asset/open.png';

export default function Writing() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true); // 사이드바 제어
    const [sidebarHeight, setSidebarHeight] = useState(0); // 사이드바 높이
    const [contentInputHeight, setContentInputHeight] = useState(0); // 작문 내용 높이
    const [writingList, setWritingList] = useState([]) // 작문 리스트
    const [writingListUpdate, setWritingListUpdate] = useState(false) // 사이드바 작문 리스트 업데이트
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 }); // '/' 문자의 위치

    const [showSaveNoticeModal, setShowSaveNoticeModal] = useState(false); // 작문 저장 여부(모달창 제어)
    const [isSlashTyped, setIsSlashTyped] = useState(false); // '/' 문자 입력 여부(모달창 제어)
    const [isVersionNotified, setIsVersionNotified] = useState(false); // 버전 업데이트 알림 여부(모달창 제어)
    const [isOptionSelected, setIsOptionSelected] = useState(false); // 작문 옵션 선택 여부(모달창 제어)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 작문 삭제 여부(모달창 제어)

    const [selectOption, setSelectOption] = useRecoilState(SentenceType); // 선택한 작문 옵션
    const [selectOptionExample, setSelectOptionExample] = useRecoilState(SentenceList); // 선택한 작문 옵션의 예시 문장 배열
    const [selectSentence, setSelectSentence] = useRecoilState(Sentence); // 선택한 작문 옵션의 예시 문장
    const [writingTitle, setWritingTitle] = useRecoilState(WritingTitle); // 작문 제목
    const [writingContent, setWritingContent] = useRecoilState(WritingContent); // 작문 내용
    const [writingId, setWritingId] = useRecoilState(WritingId); // 작문 고유 id
    const [userType, setUserType] = useRecoilState(UserType); // 유저 타입

    const writingAreaRef = useRef(null);

    const openSideBar = () => {
        setIsSideBarOpen(true);
    };

    //작문보드 전체 조회(리스트)
    useEffect(() => {
        if (userType === 'FREE') {
            setWritingList([]);
            return;
        }
        WritingListApi()
            .then((response) => {
                setWritingList(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [writingListUpdate]);
    
    // 화면 크기가 변경될 때 사이드바 상태 업데이트
    useEffect(() => {
        if(userType !== 'FREE') {
            setShowSaveNoticeModal(true);
        }

        // 화면 크기가 변경될 때 사이드바 상태 업데이트
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setIsSideBarOpen(false);
            }
            else {
                setIsSideBarOpen(true);
            }
        };

        // 초기 로드 시 한 번 실행
        handleResize();

        // resize 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //작문보드 단건 조회(제목,내용)
    useEffect(() => {
        if (writingId) {
            WritingDetailApi(writingId)
                .then((response) => {
                    setWritingTitle(response.title);
                    setWritingContent(response.content);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [writingId]);

    useEffect(() => {
        setSidebarHeight(contentInputHeight + 213);
    }, [contentInputHeight]);

    // ContentInput애서 caret의 위치를 알아내는 함수
    const handleContentChange = (e) => {
        setWritingContent(e.target.value);
        if (e.target.value === '/') {
            setIsSlashTyped(false);
        }
        else if (e.target.value.endsWith('/')) {
            setIsSlashTyped(true);
             // Get caret coordinates on content change
            const textarea = document.getElementById('writing').querySelector('textarea');
            const caretPos = getCaretCoordinates(textarea, textarea.selectionEnd);

            // Get the coordinates of the writing area
            const writingAreaCoordinates = writingAreaRef.current.getBoundingClientRect();

            setCoordinates({
                x: caretPos.left + writingAreaCoordinates.left + 40,
                y: caretPos.top + writingAreaCoordinates.top + 130,
            });
        }
        else {
            setIsSlashTyped(false);
        }
    };

    // ContentInput의 높이를 자동으로 조절하는 함수
    const handleTextAreaResize = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setContentInputHeight(textarea.scrollHeight);
    };

    // 작문 옵션 선택 시 작문 내용에 추가
    useEffect(() => {
        if(selectOption === '') {
            return;
        }
        // 작문 내용에서 마지막의 '/' 문자를 제거
        const updatedContent = writingContent.endsWith('/') ? writingContent.slice(0, -1) : writingContent;
        // 선택한 옵션 문장을 추가
        const newContent = updatedContent + ' ' + selectSentence;
        setWritingContent(newContent);
        setSelectOption('');
        setSelectOptionExample('');
        setSelectSentence('');
    }, [selectSentence]);


    // 작문 내용이 500자 이상일 때 버전 업데이트 알림
    useEffect(() => {
        if (userType === 'FREE') { 
            const newContent = writingContent;
            const byteCount = new TextEncoder().encode(newContent).length;
            if(byteCount > 500) {
                setIsVersionNotified(true);
            }
        }

        if (writingContent.trim() !== '' || writingTitle.trim() !== '') {
            const preventClose = (e) => {
                e.preventDefault();
                e.returnValue = '';
            };
    
            window.addEventListener('beforeunload', preventClose);
    
            return () => {
                window.removeEventListener('beforeunload', preventClose);
            };
        }
    }, [writingContent]);

    //jpg로 저장
    const onClickSaveAsJpg = () => {
        domtoimage
        .toBlob(document.querySelector('#writing'))
        .then((blob) => {
            saveAs(blob, `${writingTitle}.jpg`);
        });
    };

    //txt로 저장
    const onClickSaveAsTxt = () => {
        const blob = new Blob([writingContent], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, `${writingTitle}.txt`);
    }

    //인쇄
    const onClickPrint = useReactToPrint({
        content: () => writingAreaRef.current,
        documentTitle: `${writingTitle}`,
        pageStyle: `
            @page {
                size: A4;
                margin: 20;
            }
            @media print {
                body {
                    margin: 0;
                }
            }
        `,
    });

    // 작문 저장
    const onClickSave = () => {
        if(writingTitle || writingContent) {
            if (!writingId) {
                 //작문을 처음 저장하는 경우 writingId가 없으므로 빈 문자열을 전달
                if(writingTitle === '') {
                    const temptTitle = dayjs().format('YYYYMMDD HHmmss');
                    WritingSaveApi(writingId, temptTitle, writingContent)
                    .then((response) => {
                        setWritingId(response.data);  // 저장하면 작문 고유 id를 받아옴
                        setWritingListUpdate(!writingListUpdate); // 사이드바 작문 리스트 업데이트
                        alert('작문이 저장되었습니다.');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
                else {
                    WritingSaveApi(writingId, writingTitle, writingContent)
                        .then((response) => {
                            setWritingId(response.data);  // 저장하면 작문 고유 id를 받아옴
                            setWritingListUpdate(!writingListUpdate); // 사이드바 작문 리스트 업데이트
                            alert('작문이 저장되었습니다.');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
            else {
                // 작문을 수정하는 경우
                WritingSaveApi(writingId, writingTitle, writingContent)
                    .then((response) => {
                        setWritingListUpdate(!writingListUpdate); // 사이드바 작문 리스트 업데이트
                        alert('수정이 완료되었습니다.')
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };

    return (
        <Container>
            <Header />
            {isSideBarOpen ? (
                <Content>
                    <SideBar
                        isSideBarOpen={isSideBarOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        setIsSideBarOpen={setIsSideBarOpen}
                        sidebarHeight={sidebarHeight}
                        writingList={writingList}
                        setWritingList={setWritingList}
                        writingListUpdate={writingListUpdate}
                        setWritingListUpdate={setWritingListUpdate}
                        onClickPrint={onClickPrint}
                        onClickSaveAsJpg={onClickSaveAsJpg}
                        onClickSaveAsTxt={onClickSaveAsTxt}
                    />
                    <InnerContainer isSideBarOpen={isSideBarOpen}>
                        <WritingArea isSideBarOpen={isSideBarOpen} ref={writingAreaRef} userType={userType} id='writing'>
                            <TitleArea>
                                <TitleInput
                                    type="text"
                                    placeholder="제목을 입력하세요."
                                    value={writingTitle}
                                    onChange={(e) => setWritingTitle(e.target.value)}
                                />
                            </TitleArea>
                            <ContentArea>
                                <ContentInput
                                    placeholder="
                                    🖍️&nbsp;여기에서부터 작문을 시작하세요.&#13;&#10;
                                    1. 원하는 문장을 입력하세요.&#13;&#10;
                                    2. 원하는 문장 뒤에 '/'[키보드에서 '/' key]를 누르세요.&#13;&#10;
                                    3. GLOT Writing이 전개 유형들을 추천하면, 하나의 전개 유형을 선택해 주세요.&#13;&#10;
                                    4. GLOT Writing이 사용자가 선택한 전개 유형에 해당하는 문장들을 추천하면, 하나의 문장을 &nbsp;&nbsp;&nbsp;선택해 주시거나 전개 유형에 해당하는 문장을 직접 입력해 주세요.&#13;&#10;
                                    5. 2번부터 4번까지의 과정을 반복하면서, 문장을 선택하고 변형하여, 원하는 작문을 완성하세요.
                                    "
                                    value={writingContent}
                                    onChange={handleContentChange}
                                    onInput={handleTextAreaResize}
                                    disabled={isVersionNotified || isSlashTyped}
                                />
                            </ContentArea>
                        </WritingArea>
                        <ButtonArea
                            userType={userType}
                        >
                            <SaveButton onClick={onClickSave}>저장</SaveButton> 
                        </ButtonArea>
                    </InnerContainer>
                </Content>
            ) : (
                <Content>
                    <InnerContainer isSideBarOpen={isSideBarOpen}>
                        <Button onClick={openSideBar}>
                            <img 
                                src={open} 
                                alt='open' 
                                style={{
                                    width: '14px',
                                    height: '14px',
                                }}
                            />
                        </Button>
                        <WritingArea isSideBarOpen={isSideBarOpen} userType={userType} id='writing'>
                            <TitleArea>
                                <TitleInput
                                    type="text"
                                    placeholder="제목을 입력해주세요"
                                    value={writingTitle}
                                    onChange={(e) => setWritingTitle(e.target.value)}
                                />
                            </TitleArea>
                            <ContentArea ref={writingAreaRef}>
                                <ContentInput
                                    placeholder="
                                    🖍️&nbsp;여기에서부터 작문을 시작하세요.&#13;&#10;
                                    1. 원하는 문장을 입력하세요.&#13;&#10;
                                    2. 원하는 문장 뒤에 '/'[키보드에서 '/' key]를 누르세요.&#13;&#10;
                                    3. GLOT Writing이 전개 유형들을 추천하면, 하나의 전개 유형을 선택해 주세요.&#13;&#10;
                                    4. GLOT Writing이 사용자가 선택한 전개 유형에 해당하는 문장들을 추천하면, 하나의 문장을 &nbsp;&nbsp;&nbsp;선택해 주시거나 전개 유형에 해당하는 문장을 직접 입력해 주세요.&#13;&#10;
                                    5. 2번부터 4번까지의 과정을 반복하면서, 문장을 선택하고 변형하여, 원하는 작문을 완성하세요.
                                    "
                                    value={writingContent}
                                    onChange={handleContentChange}
                                    onInput={handleTextAreaResize}
                                    disabled={isVersionNotified || isSlashTyped}
                                />
                            </ContentArea>
                        </WritingArea>
                        <ButtonArea
                            userType={userType}
                        >
                            <SaveButton onClick={onClickSave}>저장</SaveButton> 
                        </ButtonArea>
                    </InnerContainer>
                </Content>
            )}
            {isSlashTyped && (<OptionModal setIsSlashTyped={setIsSlashTyped} setIsOptionSelected={setIsOptionSelected} coordinates={coordinates}/>)}
            {isOptionSelected && (<ExampleModal setIsSlashTyped={setIsSlashTyped} setIsOptionSelected={setIsOptionSelected} writingContent={writingContent} setWritingContent={setWritingContent} coordinates={coordinates}/>)}
            {isDeleteModalOpen && (<WritingDeleteModal setIsDeleteModalOpen={setIsDeleteModalOpen} writingListUpdate={writingListUpdate} setWritingListUpdate={setWritingListUpdate}/>)}
            {isDeleteModalOpen && (<Backdrop />)}
            {isVersionNotified && (<VersionNotice setIsVersionNotified={setIsVersionNotified}/>)}
            {isVersionNotified && (<Backdrop />)}
            {showSaveNoticeModal && (<WarningModal setShowSaveNoticeModal={setShowSaveNoticeModal}/>)}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #F2F3F5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        display: block;
    }
`;

const Content = styled.div`
    width: 100%;
    height: calc(100% - 80px); /* 80은 헤더의 높이 */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const InnerContainer = styled.div`
    width: ${props => (props.isSideBarOpen ? 'calc(100% - 230px)' : '100%')};
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f2f3f5;
`;

const Button = styled.button`
    width: 30px;
    height: 30px;
    position: absolute;
    left: 10px;
    top: 74px;
    border-radius: 50%;
    border: none;
    font-size: 20px;
    cursor: pointer;
    margin-top: 20px;
    background-color: #F2F4F5;
    &:hover {
        background-color: #E5E7E9;
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

const WritingArea = styled.div`
    width: 598px;
    height: 100%;
    min-height: ${props => (props.userType) === 'FREE' ? 'calc(100vh - 167px)' : 'calc(100vh - 217px)'};
    flex: 1;
    background-color: #FFFFFF;
    border: none;
    display: flex;
    flex-direction: column;
    padding: 48px;
    padding-bottom: 0px;
    margin-top: 24px;
    overflow: auto;
    animation: 0.3s ease-in-out;
    @media (max-width: 768px) {
        width: calc(100% - 24px);
        height: 100%;
        min-height: calc(100vh - 167px);
        margin-top: 0px;
        padding: 12px;
        padding-bottom: 0px;
    }
`;

const TitleArea = styled.div`
    width: 100%;
    height: 50px;
    outline: none;
    margin-bottom: 20px;
`;

const TitleInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 30px;
    font-weight: 600;
    &::placeholder {
        color: #b8b8b8;
    }
    @media (max-width: 768px) {
        font-size: 20px;
        width: calc(100% - 20px);
    }
`;

const ContentArea = styled.div`
    width: 100%;
`; 

const ContentInput = styled.textarea`  
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 297px);
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 28.8px;
    white-space: pre-line;
    resize: none;
    background-color: #FFFFFF;
    &::placeholder {
        color: #b8b8b8;
        line-spacing: -0.03em;
        font-size: 14px;
        font-weight: bold;
    }
    @media (max-width: 768px) {
        min-height: calc(100vh - 247px);
        width: calc(100% - 20px);
    }
`;


const ButtonArea = styled.div`
    width: 694px;
    height: 60px;
    background-color: #FFFFFF;
    border-top: 1px solid rgba(239, 239, 239, 1);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    display: ${props => (props.userType === 'FREE' ? 'none' : 'flex')};
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const SaveButton = styled.button`
    width: 101px;
    height: 40px;
    border: none;
    border-radius: 99999px;
    background-color: rgba(17, 17, 17, 1);
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    @media (max-width: 768px) {
        width: 100%;
    }
`;
