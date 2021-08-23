import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Router from './pages/app';
import ReduxStore from './services/containers/ReduxStore';
import ProgressiveWebApp from './services/containers/ProgressiveWebApp';
import WebSocket from './services/containers/WebSocket';

import './index.css';
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
    <ProgressiveWebApp>
      <ReduxStore>
        <WebSocket>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </WebSocket>
      </ReduxStore>
    </ProgressiveWebApp>
  </ThemeProvider>,
  document.getElementById('root'),
);

reportWebVitals();
