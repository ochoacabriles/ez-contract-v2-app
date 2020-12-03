import styled from 'styled-components';

const Container = styled.div`
  overflow-y: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const CardContainer = styled.div`
  width: 70%;
  max-width: 500px;
  height: auto;
  margin-left: auto;
  margin-right: auto;

  ${(props) => props.theme.media.tablet`
    width: 90%;
    padding: 15px;
  `}
`;

export { Container, LogoContainer, CardContainer };
