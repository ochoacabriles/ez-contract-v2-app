import React from 'react';
import { ThemeProvider } from 'styled-components';
import Toast from 'blockdemy-ui/toast';
import GlobalStyle from '../theme/css';
import theme from '../theme';

const { toast } = new Toast();

class BlockdemyUI {
  constructor(theme) {
    this.theme = { ...theme };
  }

  getTheme = () => this.theme;

  BlockdemyUIProvider = (props) => (
    <ThemeProvider theme={this.theme} {...props}>
      <GlobalStyle />
      <div id="toast" />
      <div id="tooltips" />
      <div id="modal" />
      {props.children}
    </ThemeProvider>
  );
}

const { BlockdemyUIProvider, getTheme } = new BlockdemyUI(theme);

export { BlockdemyUI, theme, BlockdemyUIProvider, getTheme, toast };
