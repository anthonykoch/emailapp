// @flow

const backupFontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`

const font1 = `'Nunito Sans', ${backupFontFamily}`

const spacing = `20px`
const transitionDuration = '300ms'

const color1 = '#008fff' //  blue
const color2 = '#ff9f00' //  orange
const color3 = '#fe568e' //  pink
const color4 = '#f1f9ff' //  very light blue
const color5 = '#f5f5f5' //  grayscale
const color6 = '#303c48' //  dark desaturated blue
const color7 = '#ff3a71' //  hot pink
const color8 = '#00bd5e' //  saturated green

const colorGrayscale1 = '#d8d8d8'
const colorGrayscale2 = '#f5f5f5'
const colorGrayscale3 = '#aaaaaa'
const colorGrayscale4 = '#e4e4e4'
const colorGrayscale5 = '#fafafa'

const colorTextForeground = color6

const logoForeground = '#000000'
const wideSearchInputBackgroundColor = colorGrayscale2
const wideSearchActionBackgroundColor = colorGrayscale4
const sidebarIconBackgroundColor = colorGrayscale3
const emailKebabBackgroundColor = colorGrayscale1
const emailTagBackgroundColor = colorGrayscale2
const overviewForeground = color6
const overviewIconBackground = color4
const bodyBackgroundColor = colorGrayscale5

export type Theme = {|
  backupFontFamily: string,
  font1: string,
  spacing: string,
  transitionDuration: string,
  color1: string,
  color2: string,
  color3: string,
  color4: string,
  color5: string,
  color6: string,
  color7: string,
  color8: string,
  colorGrayscale1: string,
  colorGrayscale2: string,
  colorGrayscale3: string,
  colorGrayscale4: string,
  colorTextForeground: string,
  bodyBackgroundColor: string,
  logoForeground: string,
  wideSearchInputBackgroundColor: string,
  wideSearchActionBackgroundColor: string,
  sidebarIconBackgroundColor: string,
  emailKebabBackgroundColor: string,
  emailTagBackgroundColor: string,
  overviewForeground: string,
  overviewIconBackground: string,
|}

const variables: Theme = {
  backupFontFamily,
  font1,
  spacing,
  transitionDuration,
  color1,
  color2,
  color3,
  color4,
  color5,
  color6,
  color7,
  color8,
  colorGrayscale1,
  colorGrayscale2,
  colorGrayscale3,
  colorGrayscale4,
  colorTextForeground,

  bodyBackgroundColor,
  logoForeground,
  wideSearchInputBackgroundColor,
  wideSearchActionBackgroundColor,
  sidebarIconBackgroundColor,
  emailKebabBackgroundColor,
  emailTagBackgroundColor,
  overviewForeground,
  overviewIconBackground,
}

export default variables

