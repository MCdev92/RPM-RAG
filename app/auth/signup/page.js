'use client';
import { AppBar, Toolbar, Typography, Button, Box, Container, TextField } from '@mui/material';
import Link from 'next/link';

export default function SignUp() {
  return (
    <Box
      sx={{
        backgroundImage: `url("/assets/images/banner.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        position: 'relative',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            RPM AI
          </Typography>
          <Box>
            <Link href="/" passHref>
              <Button sx={{ color: '#fff' }}>Home</Button>
            </Link>
            <Link href="/auth/signin" passHref>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginLeft: 2 }}
              >
                Sign In
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sign Up Form */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px)',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Sign Up
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          sx={{ mb: 2, width: { xs: '90%', sm: '400px' }, backgroundColor: '#fff', borderRadius: 1 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          sx={{ mb: 3, width: { xs: '90%', sm: '400px' }, backgroundColor: '#fff', borderRadius: 1 }}
        />
        <Button variant="contained" color="primary" sx={{ width: { xs: '90%', sm: '400px' }, mb: 2 }}>
          Sign Up
        </Button>
        <Link href="/auth/signin" passHref>
          <Button sx={{ color: '#fff' }}>Already have an account? Sign In</Button>
        </Link>
      </Container>
    </Box>
  );
}
