// @flow

const backupFontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`

const font1 = `'Nunito Sans', ${backupFontFamily}`

const baseSpacing = 20

const breakpoints = {
  xs: 0,
  sm: 360,
  md: 600,
  lg: 960,
  xl: 1200,
  xxl: 1441,
}

const spacing = {
  '1': `${baseSpacing * 0.25}px`,
  '2': `${baseSpacing * 0.5}px`,
  '3': `${baseSpacing * 0.75}px`,
  '4': `${baseSpacing * 1}px`,
  '5': `${baseSpacing * 1.5}px`,
  '6': `${baseSpacing * 2}px`,
  '7': `${baseSpacing * 2.5}px`,
  '8': `${baseSpacing * 3}px`,
  '9': `${baseSpacing * 4}px`,
  '10': `${baseSpacing * 5}px`,
}

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

const sidebarLinkForeground = color6

const overviewIconBackground = color4

const bodyBackgroundColor = colorGrayscale5

const filterActionBorderColorActive = color1
const filterActionBackground = 'transparent'
const filterActionBackgroundActive = color1

const liveCallNotificationGradient = `linear-gradient(to left, ${color2}, ${color3})`

export type Breakpoints = {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
  xxl: number,
}

export type Spacing = {
  '1': string,
  '2': string,
  '3': string,
  '4': string,
  '5': string,
  '6': string,
  '7': string,
  '8': string,
  '9': string,
  '10': string,
}

export type SpacingLevel = $Keys<Spacing>

export type Theme = {|
  breakpoints: Breakpoints,

  spacing: Spacing,

  transitionDuration: string,

  backupFontFamily: string,
  font1: string,
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
  sidebarLinkForeground: string,
  overviewForeground: string,
  overviewIconBackground: string,

  filterActionBackground: string,
  filterActionBorderColorActive: string,
  filterActionBackgroundActive: string,

  liveCallNotificationGradient: string,
|}

const variables: Theme = {
  spacing,

  breakpoints,

  backupFontFamily,
  font1,

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
  sidebarLinkForeground,
  overviewForeground,
  overviewIconBackground,

  filterActionBackground,
  filterActionBorderColorActive,
  filterActionBackgroundActive,

  liveCallNotificationGradient,
}

export default variables

