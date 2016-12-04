import Color from 'color'

const defaultUIColor = '#333'
const defaultUIInactiveColor = '#999'
const defaultUIInverseColor = '#FFF'
const defaultUIActiveColor = '#4F9DFB'
const defaultBorderColor = '#D1D1D1'
const defaultUIBackgroundColor = '#F8F8F8'
const defaultUIFontSize = '12px'
const defaultUIFontFamily = 'Helvetica, Arial, sans-serif'

// Button Color
const defaultUIButtonHoverColor = '#EEE'
const defaultUIButtonActiveColor = '#E1E1E0'

const defaultTheme = {
  // Color
  color: defaultUIColor,
  inactiveColor: defaultUIInactiveColor,
  inverseColor: defaultUIInverseColor,
  activeColor: defaultUIActiveColor,
  borderColor: defaultBorderColor,

  navBackgroundColor: defaultUIBackgroundColor,
  titleBarBackgroundColor: defaultUIBackgroundColor,

  buttonHoverColor: defaultUIButtonHoverColor,
  buttonActiveColor: defaultUIButtonActiveColor,
  border: 'solid 1px ' + defaultBorderColor,
  activeBorderColor: defaultUIActiveColor,
  activeBorder: 'solid 1px ' + defaultUIActiveColor,

  // Typo
  fontSize: defaultUIFontSize,
  fontFamily: defaultUIFontFamily,

  // UI
  input: `
    border: solid 1px
    ${defaultBorderColor};
    outline: none;
    border-radius: 4px;
    background-color: #FCFCFC;
    color: ${defaultUIColor};
    font-size: ${defaultUIFontSize};
    font-family: ${defaultUIFontFamily};
    &:focus {
      border-color: ${defaultUIActiveColor};
    }
  `,
  button: `
    border: solid 1px
    ${defaultBorderColor};
    outline: none;
    border-radius: 4px;
    background-color: #FCFCFC;
    color: ${defaultUIColor};
    font-size: ${defaultUIFontSize};
    font-family: ${defaultUIFontFamily};
    &:active {
      background-color: #DCDCDC;
    }
  `
}

export default {
  default: defaultTheme
}
