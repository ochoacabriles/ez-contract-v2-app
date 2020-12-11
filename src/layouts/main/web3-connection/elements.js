import styled from 'styled-components';

const WalletContainer = styled.div`
  ${props => props.theme.media.tablet`
    display: none;
  `};
`;

export { WalletContainer };
