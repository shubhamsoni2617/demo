import { createTheme } from '@mui/material/styles';

const themeConfig = {
  typography: {
    fontSizes: {
      mainHeaderText: {
        fontSize: '1.5rem',
        lineHeight: '2rem',
      },
      sectionHeaderText: {
        fontSize: '1.25rem',
        lineHeight: '2rem',
      },
      unitText: {
        fontSize: '1rem',
        lineHeight: '1.5rem',
      },
      normalText: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      },
      selectText: {
        fontSize: '0.75rem',
        lineHeight: '1rem',
      },
      subText: {
        fontSize: '0.625rem',
        lineHeight: '1rem',
      },
      badgeText: {
        fontSize: '0.688rem',
        lineHeight: '1.063rem',
      },
      breadCrumbText: {
        fontSize: '0.813rem',
        lineHeight: '0.688rem',
      },
      linkText: {
        fontSize: '0.938rem',
        lineHeight: '1.313rem',
      },
    },
    fontWeight: {
      thin: 100,
      extraLight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    textAlign: {
      right: 'right',
      left: 'left',
      center: 'center',
    },
    textTransform: {
      inherit: 'inherit',
      capitalize: 'capitalize',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
    },
  },
  palette: {
    bgPrimary: '#F8F9FF',
    bgHighlight: '#0F2236',
    bgSwitch: '#44677B',
    bgTableHeader: '#E7EDF3',
    bgTableHeaderDark: '#BAC8D3',
    bgTableFinalized: '#F7F7F7',
    bgTransparent: '#0916241F',
    bgBlock: '#D9EBF5',
    bgWarning: '#FCB362',
    bgWarningTransparent: '#FCB36229',
    bgSuccess: '#34BFA3',
    bgSuccessTransparent: '#34BFA329',
    bgDanger: '#EF5D5D',
    bgDangerTransparent: '#EF5D5D29',
    bgBadge: '#F05656',
    bgBadgeLight: '#E4EBF2',
    bgBadgeDark: '#3A4D62',
    bgBreadCrumbIcon: '#56616C',
    bgChartSuccess: '#83BE8C',
    textPrimary: '#41A6F7',
    textSecondary: '#7A8C9F',
    textDark: '#1F2D3D',
    textTableHeader: '#213040',
    textTableBody: '#43566A',
    textRange: '#0E60A2',
    textWhite: '#FFF',
    textBlack: '#000',
    textWarning: '#C9BB14',
    textSuccess: '#33BEA3',
    textDanger: '#BF3433',
    mainHeadingColor: '#091624',
    stroke: '#96A8B9',
    strokeDark: '#6F7F8F',
    strokeTable: '#CCD8E3',
    strokeTab: '#BEDBEB',
    strokeLightBlue: '#BAD5E5',
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  content: {
    flexStyles: {
      flexRow: {
        display: 'flex',
      },
      flexCol: {
        display: 'flex',
        flexDirection: 'column',
      },
      flexAlignBetweenStart: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      flexAlignBetweenCenter: {
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      flexAlignCenter: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      flexAlignStartCenter: {
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      flexAlignStartEnd: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
      },
      flexAlignEndCenter: {
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      flexAlignStart: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      flexAlignEnd: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      },
      flexAlignCenterStart: {
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      flexWrap: {
        wrap: 'wrap',
      },
    },
    card: {
      background: '#fff',
      boxShadow: `0px 3px 10px #0000000F`,
      borderRadius: 8,
    },
    display: {
      none: 'none',
      block: 'block',
      inlineBlock: 'inline-block',
    },
    boxSizing: {
      borderBox: 'border-box',
      contentBox: 'content-box',
    },
    overflow: {
      visible: 'visible',
      hidden: 'hidden',
      auto: 'auto',
      scroll: 'scroll',
    },
    positions: {
      relative: 'relative',
      absolute: 'absolute',
      sticky: 'sticky',
    },
    cursor: {
      pointer: 'pointer',
      notAllowed: 'not-allowed',
    },
  },
};

export const theme = createTheme(themeConfig);
