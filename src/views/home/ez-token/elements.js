import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  margin-top: 20px;
  text-align: center;
  flex-direction: column;
  align-items: center;
`;

const GeneralContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.form`
  display: flex;
  width: 400px;
  flex-direction: column;
`;

export { MessageContainer, FormContainer, GeneralContainer };
