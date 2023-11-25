import React from 'react';
import styled from 'styled-components';

function Backdrop(props) {
  return (
    <Container onClick={props.onCancel} />
  );
}

const Container = styled.div`
    position: fixed;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(3px);
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
`;
  

export default Backdrop;