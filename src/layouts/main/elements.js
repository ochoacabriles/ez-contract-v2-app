import styled from 'styled-components';

const GeneralContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
`;

const NavBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  padding-left: 50px;
  padding-right: 50px;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors.primary}
`;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { GeneralContainer, NavBarContainer, FooterContainer };
