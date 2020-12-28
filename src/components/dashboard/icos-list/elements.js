import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));  
`;

export { GridContainer };
