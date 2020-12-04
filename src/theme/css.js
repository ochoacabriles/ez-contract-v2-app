import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: ${({ theme }) => theme.colors.lighter};
  }

  html,
  body {
    min-height: 100%;
    min-width: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 32px;
    font-family: 'Montserrat';
    font-weight:  400;
    line-height: 1.5;
    position: relative;
    height: 100%;
    max-height: 100%;
    width: 100%;
  }

  body a {
    display: contents;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  .card {
    &:hover {
    .cardImage:nth-child(n){
        transition: 0.2s all;
        transform: scale(1);
      }
    }
  }

  
  .cardHeaderTitle {
    margin: -0.5rem;
    font-size: 18px;
    display: block;
    items-justify: center;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 1.3em;
    height: calc(1.3em * 3);/* lines for header */
  }

  .cardHeaderSubTitle {
    margin: -0.5rem;
    font-size: 10px;
    display: block;
    items-justify: center;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 1.3em;
    height: calc(1.3em * 1);/* lines for header */
  }

  .inputCardFooter {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.primary};
  }

  .cardImage {
  margin: -1.25rem;
  object-fit: contain;
  transition: 0.6s all;
  transform: scale(0.95);
  }

  .buttonPreview {
    font-family: 'Roboto';
    font-weight:  500;
    font-size: 14px;
    margin-top: 4px;
  }

 .auth {}

  body.auth {
    background: ${({ theme }) => theme.colors.veryLight}; 
  };

  .auth .logo {
    width: 203px;
    height: 48px;
  }

  .auth .headertitle {
    font-family: 'Montserrat';
    font-weight:  500;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.secondary};
  }

  .auth .headersubtitle {
    font-family: 'Montserrat';
    font-weight:  400;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.secondary};
  }

  .auth .input {
    font-family: 'Montserrat';
    font-weight:  400;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .auth .rememberme {
    font-family: 'Montserrat';
    font-weight:  400;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.secondary};
    margin: 20px 10px 20px 10px;
  }

  .auth .button {
    font-family: 'Montserrat';
    font-weight:  500;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .auth .link {
    font-family: 'Montserrat';
    font-weight:  400;
    font-size: 12px;
    text-align: center;
    margin-top: 2px;
  }

  .auth .footer {
    font-family: 'Montserrat';
    font-weight:  400;
    font-size: 16px;
    text-align: center;
    color: ${({ theme }) => theme.colors.lightDark};
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .home.body {
    background: ${({ theme }) => theme.colors.lighter}; 
  };

  .home.admin {
    background: ${({ theme }) => theme.colors.lighter}; 
  };

  .home .menu {
    background: ${({ theme }) => theme.colors.lighter};
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .addProduct {
    background: ${({ theme }) => theme.colors.lighter};
  }

  .addVendor {
    background: ${({ theme }) => theme.colors.lighter};
  }

  body.addProduct {
    background: ${({ theme }) => theme.colors.lighter}; 
  };

  .productInput{
    font-family: 'Roboto';
    font-weight:  400;
  }

  #tooltips {
    position: absolute;
    top: 0;
    left: 0;
    pre {
      font-family: 'Montserrat';
      font-weight:  400;
      font-size: 12px;
    }
  }

  #toast {
    z-index: 3500;
    position: fixed;
    top: 65px;
    right: 0;
    padding: 4px;
    width: 320px;
    box-sizing: border-box;
    animation: all 0.8 ease;
    font-family: 'Montserrat';
    font-weight:  400;
    font-size: 12px;
  }

  @media (max-width: 36em) {
    #toast {
      width: 100%;
    }
  }
`;

export default GlobalStyle;
