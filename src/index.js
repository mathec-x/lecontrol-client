import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import App from './pages/app';
import reportWebVitals from './reportWebVitals';
import './services/prototypes';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[900],
    },
    secondary: {
      main: purple[500],
    },
  },
  overrides: {
    MuiListSubheader: {
      root: {
        backgroundColor: '#fff',
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);

reportWebVitals();
