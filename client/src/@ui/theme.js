import { colorVariants } from "./colorVarients";

const colors = {
  primary: "#586FFA",
  secondary: "#8B9AF4",
  light: "#A5B1FC",
  accent: "#E5E9FF",
  offwhite: "#EAEEFF",
  white: "#FBFBFF",
  black: "#3D3C47",
  gray: "#A5ADC6",
  green: "#25B93E",
  greenlight: "#CEFDD7",
  red: "#FF5555",
  redlight: "#FFDADA",
  cardBg: "#F7F8FF"
};

const size = {
  mobileS: "320px",
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  desktopL: "1440px"
};

const theme = {
  variants: {
    ...colorVariants
  },
  font: {
    primary: "Product Sans Regular",
    primaryBold: "Product Sans Bold",
    primaryItalic: "Product Sans Italic",
    primaryMedium: "Product Sans Medium Regular",
    primaryLight: "Product Sans Light Regular"
  },
  colors,
  spacings: {
    top: 40,
    bottom: 40,
    left: 25,
    right: 25,
    my: "20px",
    mx: "20px"
  },
  space: {
    none: 0,
    small: 5,
    medium: 10,
    large: 15,
    xlarge: 30,
    huge: 40
  },
  border: `2px solid ${colors.offwhite}`,
  media: {
    mobileS: `max-width: ${size.mobileS}`,
    mobile: `max-width: ${size.mobile}`,
    tablet: `max-width: ${size.tablet}`,
    minTablet: `min-width: ${size.tablet}`,
    desktop: `max-width: ${size.desktop}`,
    desktopL: `max-width: ${size.desktopL}`
  }
};

export default theme;
