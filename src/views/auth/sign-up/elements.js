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

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${props => props.theme.media.tablet`
    flex-direction: column;
  `};
`;

const RowItems = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 47%;

  ${props => props.theme.media.tablet`
    flex-basis: 100%;
  `};
`;

export { Container, LogoContainer, CardContainer, RowContainer, RowItems };
