import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
      primary: {
        light: '#008394',
        main: '#00bcd4',
        dark: '#33c9dc',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#00a152',
        main: '#00e676',
        dark: '#33eb91',
        contrastText: '#000',
      },
    },
    spacing: 4,
  });
export default theme;