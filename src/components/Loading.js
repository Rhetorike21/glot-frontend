import styled from "styled-components";
import FadeLoader from "react-spinners/FadeLoader";

function Loading() {

  return (
    <Container>
      <FadeLoader color={"rgba(50, 144, 255, 1)"} loading={true} size={150} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 100px 0px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

export default Loading;