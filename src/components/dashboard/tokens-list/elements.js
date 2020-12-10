import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  margin-top: 20px;
  text-align: center;
  flex-direction: column;
  align-items: center;
`;

const TableContainer = styled.div`
  display: block;
  overflow-x: auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));  
`;

export { MessageContainer, TableContainer, GridContainer };
