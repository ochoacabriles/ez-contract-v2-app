import styled from 'styled-components';
import Button from 'blockdemy-ui/button';

const StyledButton = styled(Button)`
  border-radius: 5px;
  height: 10px;
  padding-left: 3px;
  padding-right: 3px;
  font-size: 0.7rem;
`;

const AddressContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
`;

export { StyledButton, AddressContainer };
