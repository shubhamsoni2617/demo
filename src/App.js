/* eslint-disable no-undef */
import React, { createContext, useEffect } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { theme } from './theme';
import Carter from './clients/Carter';
import Wawa from './clients/Wawa';
import Prospective from './clients/Prospective';

export const UserContext = createContext();

const clients = {
  0: <Carter />,
  1: <Carter />,
  2: <Wawa />,
  3: <Prospective />,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query = new URLSearchParams(window.location.search);
  const code = query?.get('code');

  useEffect(() => {
    const code = query?.get('code');

    if (!code) {
      window.location.href = `${window.location.href}?code=0`;
    }
  }, [query]);

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <div
          style={{ minHeight: '100vh', background: theme.palette.bgPrimary }}
        >
          <QueryClientProvider client={queryClient}>
            <div>{clients[code]} </div>
          </QueryClientProvider>
        </div>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}
