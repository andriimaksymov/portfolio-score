import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#43A046',
      main: '#4CAF4F',
      dark: '#237D31',
      contrastText: '#fff',
    },
    secondary: {
      main: '#2194F3',
      light: '#3ca2f5ff',
      dark: '#1163a7ff',
    },
    text: {
      primary: '#4D4D4D',
      secondary: '#475467',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff'
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
  },
});