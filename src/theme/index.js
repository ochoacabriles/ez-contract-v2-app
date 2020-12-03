import { lighten, darken, transparentize, opacify } from 'polished';
import media from './media';

const brand = {
  primary: '#CC6600',
  secondary: '#FFFBD0',
  info: '#30CEE7',
  default: '#1F262D',
  success: '#00E18D',
  warning: '#FFAB00',
  danger: '#F54B5E',
  white: '#FFFFFF',
  globalAdmin: '#267699',
  step: '#3BB36F',
  transparent: 'rgba(255, 255, 255, 0)',
};

Object.keys(brand).forEach((color) => {
  brand[`${color}900`] = darken(0.28, brand[color]);
  brand[`${color}800`] = darken(0.21, brand[color]);
  brand[`${color}700`] = darken(0.14, brand[color]);
  brand[`${color}600`] = darken(0.07, brand[color]);
  brand[`${color}500`] = brand[color];
  brand[`${color}400`] = lighten(0.07, brand[color]);
  brand[`${color}300`] = lighten(0.14, brand[color]);
  brand[`${color}200`] = lighten(0.21, brand[color]);
  brand[`${color}100`] = lighten(0.28, brand[color]);

  brand[`${color}Soft`] = transparentize(0.8, brand[color]);
  brand[`${color}Soft900`] = transparentize(0.1, brand[color]);
  brand[`${color}Soft800`] = transparentize(0.2, brand[color]);
  brand[`${color}Soft700`] = transparentize(0.3, brand[color]);
  brand[`${color}Soft600`] = transparentize(0.4, brand[color]);
  brand[`${color}Soft500`] = transparentize(0.5, brand[color]);
  brand[`${color}Soft400`] = transparentize(0.6, brand[color]);
  brand[`${color}Soft300`] = transparentize(0.7, brand[color]);
  brand[`${color}Soft200`] = transparentize(0.8, brand[color]);
  brand[`${color}Soft100`] = transparentize(0.9, brand[color]);

  brand[`${color}Opac`] = opacify(0.5, brand[color]);
});

const grey = {
  darker: '#000000',
  dark: '#495065',
  semiDark: '#6B7082',
  lightDark: '#8E91A0',
  lightGrey: '#B2B5BF',
  veryLightGrey: '#D8D9DE',
  light: '#F2F2F2',
  veryLight: '#ECECEF',
  lighter: '#FFFFFF',
};

const sizes = [0, 500, 1000, 200];

const colors = {
  ...brand,
  ...grey,
  gradient: `linear-gradient(135deg, ${brand.info}, ${brand.secondary});`,
};

const theme = {
  sizes,
  media,
  font: 'Montserrat, Roboto, system-ui',
  shadow: '0 8px 20px 0 rgba(22, 50, 92, 0.1)',
  shadowCard: '0 8px 20px 0 rgba(22, 50, 92, 0.1)',
  shadowMenu: '0 8px 20px 0 rgba(22, 50, 92, 0.02)',
  cardRadius: '22.5px',
  radius: '.3rem',
  maxWidth: '1170px',
  colors,
  space: [],
  fontSize: {
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1rem',
    d1: '3.3rem',
    d2: '2.75rem',
    d3: '2.1875rem',
    d4: '1.6275rem',
    heading: '1rem',
    headingTitle: '1.375rem',
    headingSection: '1.45rem',
    paragraph: '1rem',
    leadText: '1.25rem',
    muted: '0.85rem',
    f7: '0.42rem',
    f12: '0.73rem',
    f14: '0.85rem',
    f18: '1.125rem',
    f30: '1.865rem',
    tablet: '0.5rem',
  },
};

export default theme;
