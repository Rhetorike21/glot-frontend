import { useState } from 'react';
import styled from 'styled-components';

export const Toggle = ({active}) => {
    const [isOn, setisOn] = useState(active);

    const toggleHandler = () => {
    // TODO : isOn의 상태를 변경하는 메소드를 구현합니다.
        isOn ? setisOn(false) : setisOn(true)
    };

    return (
        <ToggleContainer
        // TODO : 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행되어야 합니다.
        onClick ={toggleHandler}
        >
        {/* TODO : 아래에 div 엘리먼트 2개가 있습니다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정하세요. */}
        {/* TIP : Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가합니다. 조건부 스타일링을 활용하세요. */}
        <div className={`toggle-container ${isOn ? "toggle--checked" : ""}`} />
        <div className={`toggle-circle ${isOn ? "toggle--checked" : ""}`}/>
        </ToggleContainer>
    );
};

const ToggleContainer = styled.div`
  position: relative;
  left: 47%;
  cursor: pointer;
  width: 40px;

  > .toggle-container {
    width: 40px;
    height: 20px;
    border-radius: 30px;
    background-color: #8b8b8b;
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
    &.toggle--checked{
      background-color: rgba(50, 144, 255, 1);
    }
    transition: background-color 0.5s ease-in-out;
  }

  > .toggle-circle {
    position: absolute;
    top: 4px;
    left: 6px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ffffff;
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
    &.toggle--checked{
    left: 22.5px;
    }
    transition: left 0.5s ease-in-out;
  }
`;