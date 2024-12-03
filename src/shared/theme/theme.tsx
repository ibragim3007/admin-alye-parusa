import { Experimental_CssVarsProvider as CssVarsProvider, extendTheme } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

type ThemeProps = PropsWithChildren;

const Theme: React.FC<ThemeProps> = ({ children }) => {
  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: { main: '#6200ee' },
          secondary: { main: '#03a9f4' },
          background: {
            default: '#ffffff',
            paper: '#f5f5f5',
          },
          text: {
            primary: '#000000',
            secondary: '#555555',
          },
        },
      },
      dark: {
        palette: {
          primary: { main: '#bb86fc' },
          secondary: { main: '#03dac6' },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#aaaaaa',
          },
        },
      },
    },
  });

  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
};

export default Theme;
