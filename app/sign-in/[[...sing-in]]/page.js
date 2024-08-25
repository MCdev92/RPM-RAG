'use client';

import React from 'react';
import { SignIn } from "@clerk/nextjs";
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  ThemeProvider, 
  createTheme,
  useMediaQuery,
  CssBaseline,
  Grid,
  Stack,
  IconButton
} from '@mui/material';

import { useRouter } from "next/navigation";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
      },
    },
  },
});

export default function SignInPage() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const back = () => {
    router.push('/');
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(45deg, #121212 30%, #212121 90%)',
        }}
      >
   
        <Container component="main" maxWidth="sm">
          
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Paper 
              elevation={3} 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                p: 4, 
                width: '100%', 
                background: 'rgba(255, 255, 255, 0.05)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          
                <Typography component="h1" variant="h4" sx={{
                  background: 'linear-gradient(45deg, #80d8e4, #e6a1b8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                ProfRanker AI
                </Typography>
              </Box>
              <SignIn
                appearance={{
                  elements: {
                    formButtonPrimary: 
                      'bg-cyan-600 hover:bg-cyan-700 text-sm normal-case',
                    card: 'shadow-none bg-transparent',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    socialButtonsBlockButton: 
                      'border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-900',
                    formFieldInput: 
                      'border-2 border-cyan-300 focus:border-cyan-500 focus:ring-cyan-500 bg-gray-800 text-white',
                    footerActionLink: 'text-cyan-400 hover:text-cyan-300',
                    formFieldLabel: 'text-cyan-300',
                    dividerLine: 'bg-cyan-700',
                    dividerText: 'text-cyan-300',
                  },
                  layout: {
                    socialButtonsPlacement: isMobile ? 'bottom' : 'top',
                    socialButtonsVariant: 'iconButton',
                  },
                }}
              />
            </Paper>
          </Box>
        </Container>
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 4,
            px: 2,
            mt: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderTop: '1px solid rgba(0, 188, 212, 0.3)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '120px', // Adjust this value as needed
          }}>
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}