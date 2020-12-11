import styled from 'styled-components';
import Typography from 'blockdemy-ui/typography';

const GeneralContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: ${props => props.theme.colors.secondarySoft300}
`;

const NavBarContainer = styled.div`
  top: 0;
  display: flex;
  width: 100vw;
  height: 70px;
  justify-content: space-between;
  align-items: center;
`;

const FooterContainer = styled.div`
  z-index: 100;
  height: 60px;
  margin: 30px auto 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleTypography = styled(Typography)`
  font-width: 2px;
  color: ${props => props.theme.colors.primary};

  ${props => props.theme.media.tablet`
    font-size: 0.7rem;
  `};
`;

export { GeneralContainer, NavBarContainer, FooterContainer, TitleTypography };
