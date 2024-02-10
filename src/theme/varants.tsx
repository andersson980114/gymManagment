import { colors } from './'
const variants = {
    solid: {
        primary: {
            bg: colors.primary,
            text: colors.white,
            borderColor: 'transparent'
        },
        secondary: {
            bg: colors.secondary,
            text: colors.white,
            borderColor: 'transparent'
        },
        success: {
            bg: colors.success,
            text: colors.white,
            borderColor: 'transparent'
        },
        danger:{
            bg: colors.danger,
            text: colors.white,
            borderColor: 'transparent'
        },
        white:{
            bg: colors.white,
            text: colors.dark,
            borderColor: 'transparent'
        },
        dark:{
            bg: colors.dark,
            text: colors.white,
            borderColor: 'transparent'
        },
    },
    ghost: {
      white: {
        bg: colors.white,
        text: colors.dark,
        borderColor: 'transparent'
      },
      primary: {
        bg: 'transparent',
        text: colors.primary,
        borderColor: 'transparent'
      }, 
      danger: {
        bg: 'transparent',
        text: colors.danger,
        borderColor: 'transparent'
      }
    },
    outline: {
      primary: {
        bg: 'transparent',
        text: colors.primary,
        borderColor: colors.primary
      },
      secondary: {
        bg: 'transparent',
        text: colors.secondary,
        borderColor: colors.secondary
      },
      success: {
        bg: 'transparent',
        text: colors.success,
        borderColor: colors.success
      },
      danger: {
        bg: 'transparent',
        text: colors.danger,
        borderColor: colors.danger
      },
      white: {
        bg: 'transparent',
        text: colors.white,
        borderColor: colors.white
      },
      dark: {
        bg: 'transparent',
        text: colors.dark,
        borderColor: colors.dark
      }
    }
  }