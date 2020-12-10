import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  min-height: 75vh;
  margin-top: 20px;
  text-align: center;
  flex-direction: column;
  align-items: center;
`;

const GeneralContainer = styled.div`
  width: 100vw;
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  width: 400px;
  flex-direction: column;
`;

export { MessageContainer, FormContainer, GeneralContainer };
