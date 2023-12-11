import React, {useState, useEffect, useRef} from 'react';
import styled, {keyframes} from 'styled-components';
import dayjs from 'dayjs';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { WritingId, WritingContent, WritingTitle } from '../../data/Atom';

import { useRecoilState } from 'recoil';

import WritingDownload from '../Modal/WritingDownload';

import WritingMoveApi from '../../services/WritingMove';
import WritingSaveApi from '../../services/WritingSave';

import close from '../../asset/close.png';
import more from '../../asset/more.png';
import plus from '../../asset/plus.png';

export default function SideBar(props) {
    const modalRef = useRef();

    const [writingId, setWritingId] = useRecoilState(WritingId); // 작문 고유 id
    const [writingTitle, setWritingTitle] = useRecoilState(WritingTitle); // 작문 제목
    const [writingContent, setWritingContent] = useRecoilState(WritingContent); // 작문 내용
    const [isOpenDownload, setIsOpenDownload] = useState(false); // 다운로드 모달창 제어
    const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 }); // 클릭 좌표

    const writingList = props.writingList;

    // 모달 창 외부 클릭 시 모달 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if(isOpenDownload && (!modalRef.current.contains(e.target)))
                setIsOpenDownload(false);
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpenDownload]);

    // 사이드바 닫기
    const onClickClose = () => {
        props.setIsSideBarOpen(false);
    }

    const onClickStart = () => {
        if(writingId) {
            WritingSaveApi(writingId, writingTitle, writingContent)
                .then((response) => {
                    setWritingId('');
                    setWritingTitle('');
                    setWritingContent('');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        // const initialId = '';
        // const initialTitle = '';
        // const initialContent = '';
        // WritingSaveApi(initialId, initialTitle, initialContent)
        //     .then((response) => {
        //         setWritingId(response.data);
        //         props.setWritingListUpdate(!props.writingListUpdate);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    const handleClick = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        setClickCoordinates({ x, y });
    };

    const onClickDown = (writingId) => {
        setWritingId(writingId);
        setIsOpenDownload(true); // 모달 창을 여는 동작은 좌표 업데이트 이후에 실행
    }

    //작성일 기준 내림차순 정렬
    const sortedList = writingList.sort((a, b) => {
        const dateA = new Date(a.yearMonth);
        const dateB = new Date(b.yearMonth);
        
        return dateB - dateA;
    });
      
    // 작성일 기준으로 그룹화
    const groupedHistory = sortedList.reduce((result, item) => {
        const yearMonth = item.yearMonth;
        
        if (!result[yearMonth]) {
            result[yearMonth] = [];
        }
        
        result[yearMonth].push(item);
        return result;
    }, {});

    // 드래그 앤 드롭
    const onDragEnd = (result) => {
        if (!result.destination) {
          return; // 항목을 올바른 위치로 이동하지 않았을 때 종료
        }
      
        const sourceGroup = groupedHistory[result.source.droppableId]; // 이동할 작문 아이템이 속한 그룹
        const destinationGroup = groupedHistory[result.destination.droppableId]; // 이동한 위치의 그룹

        const sourceId = result.source.droppableId; // 이동할 작문 아이템이 속한 그룹의 ID
        const destinationId = result.destination.droppableId; // 이동한 위치의 그룹의 ID

        const sourceIndex = result.source.index; // 이동할 작문 아이템의 인덱스
        const destinationIndex = result.destination.index; // 이동한 위치의 인덱스

        if (sourceId === destinationId) {
            const sourceItem = groupedHistory[sourceId][sourceIndex];
            const destinationItem = groupedHistory[destinationId][destinationIndex];

            if (sourceItem.yearMonth === destinationItem.yearMonth) {
                WritingMoveApi(sourceItem.id, destinationItem.id)
                    .then((response) => {
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
      
        // 같은 달 내에서만 이동 가능하도록 체크
        if (result.source.droppableId === result.destination.droppableId) {
          // 이동한 작문 아이템 가져오기
          const movedItem = sourceGroup.splice(result.source.index, 1)[0];
      
          // 대상 그룹으로 이동
          destinationGroup.splice(result.destination.index, 0, movedItem);
      
          // 작문 아이템을 다시 그룹화
          const newGroupedHistory = { ...groupedHistory };
          newGroupedHistory[result.source.droppableId] = sourceGroup;
          newGroupedHistory[result.destination.droppableId] = destinationGroup;
      
          // 상태 업데이트
          // 이곳에서 API 호출 또는 상태 업데이트를 수행할 수 있습니다.
        } else {
          // 다른 달로 이동 제한
          alert('같은 달 내에서만 이동 가능합니다.');
        }
        // 드래그 앤 드롭 완료
        setIsOpenDownload(false);
    };

    const category = (yearMonth) => {
        //올해이면 월만 표시
        if(dayjs().format('YYYY') === dayjs(yearMonth).format('YYYY')) {
            return dayjs(yearMonth).format('MM');
        }
        //올해가 아니면 년도와 월 표시
        else {
            return dayjs(yearMonth).format('YYYY-MM');
        }
    }


    return (
        <Container isSideBarOpen={props.isSideBarOpen} sidebarHeight={props.sidebarHeight}>
            <TopArea>
                <Title>
                    GLOT <Bold>Writing</Bold>
                </Title>
                <Button onClick={onClickClose}>
                    <img 
                        src={close}
                        alt="close" 
                        style={{
                            width: '14px',
                            height: '14px',
                        }}
                    />
                </Button>
            </TopArea>
            <ButtonArea>
                <StartButtonOuter>
                    <StartButton
                        onClick={onClickStart}
                    >
                        <Icon>
                            <img
                                src={plus}
                                alt="plus"
                                style={{
                                    width: '10px',
                                    height: '10px',
                                }}
                            />
                        </Icon>
                        <Text>새로운 작문 시작</Text>
                    </StartButton>
                </StartButtonOuter>
            </ButtonArea>
            <WritingListArea>
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.keys(groupedHistory).map((yearMonth) => (
                <div key={yearMonth}>
                    <MonthTitle>{category(yearMonth)}월</MonthTitle>
                    <Droppable droppableId={yearMonth} type="WRITING">
                    {(provided, snapshot) => (
                        <WritingListArea
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        onClick={handleClick}
                        >
                        {groupedHistory[yearMonth].map((item, index) => (
                            <Draggable
                            key={item.id}
                            draggableId={item.id.toString()}
                            index={index}
                            >
                            {(provided, snapshot) => (
                                <WritingOuter
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => setWritingId(item.id)}
                                >
                                <WritingItem>{item.title}</WritingItem>
                                <MoreButton 
                                    onClick={() => onClickDown(item.id)}
                                    ref={modalRef}
                                >
                                    <img src={more} alt="more" />
                                </MoreButton>
                                </WritingOuter>
                            )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        </WritingListArea>
                    )}
                    </Droppable>
                </div>
                ))}
            </DragDropContext>
            </WritingListArea>
            {isOpenDownload && 
                <WritingDownload 
                    setIsOpenDownload={setIsOpenDownload} 
                    setIsDeleteModalOpen={props.setIsDeleteModalOpen}
                    clickCoordinates={clickCoordinates} 
                    writingListUpdate={props.writingListUpdate} 
                    setWritingListUpdate={props.setWritingListUpdate} 
                    modalRef={modalRef}
                    onClickPrint={props.onClickPrint}
                    onClickSaveAsJpg={props.onClickSaveAsJpg}
                    onClickSaveAsTxt={props.onClickSaveAsTxt}
                />}
        </Container>
    )
}

const Container = styled.div`
    width: 214px;
    height: ${props => props.sidebarHeight}px;
    min-height: calc(100vh - 80px);
    padding: 8px;
    background: rgba(252, 252, 252, 1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-right: 1px solid rgba(242, 243, 245, 1);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.04);
`;

const TopArea = styled.div`
    width: 90%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f2f3f5;
    padding-bottom: 5px;
    letter-spacing: -0.03em;

`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: -0.03em;
`;

const Bold = styled.span`
    font-weight: 700;
    margin-left: 5px;
`;

const Button = styled.button`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: -8px;
    background-color: rgba(252, 252, 252, 1);
    &:hover {
        background-color: #f2f3f5;
    }
`;

const ButtonArea = styled.div`
    width: 208px;
    height: 55px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
`;

const StartButtonOuter = styled.div`
    width: 204px;
    height: 40px;
    border-radius: 999px;
    background: linear-gradient(98.97deg, #54C8ED 23.83%, #DFC361 71.97%);
    color: #3c3e3f;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
`;

const StartButton = styled.div`
    width: calc(100% - 2px);
    height: 38px;
    border-radius: 999px;
    background: #ffffff;
    color: #3c3e3f;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
`;

const Icon = styled.div`
    width: 26px;
    height: 26px;
    position: absolute;
    left: 18px;
    background-color: #F2F3F5;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #97989A;
`;

const Text = styled.div`
    font-size: 14px;
    font-weight: 500;
`;

const WritingListArea = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
`;

const MonthTitle = styled.div`
    width: calc(100% - 8px);
    height: 30px;
    padding-left: 8px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: rgba(153, 153, 153, 1);
`;

const WritingOuter = styled.div`
    width: calc(100% - 8px);
    height: 40px;
    border-radius: 8px;
    padding-left: 8px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: rgba(60, 62, 63, 1);
    cursor: pointer;
    &:hover {
        background: rgba(242, 243, 245, 1);
    }
`;

const WritingItem = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 25px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(60, 62, 63, 1);
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const MoreButton = styled.div`
    display: flex;
    margin-right: 5px;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: rgba(60, 62, 63, 1);
    cursor: pointer;
`;
