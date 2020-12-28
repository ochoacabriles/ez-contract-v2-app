import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  min-height: 75vh;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const MessageContainer = styled.div`
  display: flex;
  margin-top: 20px;
  text-align: center;
  flex-direction: column;
  align-items: center;
`;

export { Container, MessageContainer };
