'use client';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
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
            <Link href="/auth/signin" passHref>
              <Button sx={{ color: '#fff' }}>Sign In</Button>
            </Link>
            <Link href="/auth/signup" passHref>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginLeft: 2 }}
              >
                Sign Up
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px)', // Account for navbar height
        }}
      >
        <Box
          sx={{
            width: { xs: '200px', sm: '250px' }, // Adjusted size for better readability
            height: { xs: '200px', sm: '250px' },
            borderRadius: '50%',
            overflow: 'hidden',
            marginBottom: 4,
          }}
        >
          <Image
            src="/assets/images/rpm-ai.png"
            alt="RMP AI Logo"
            layout="responsive"
            width={250}
            height={250}
            objectFit="cover"
          />
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: '1.5px',
          }}
        >
          Welcome to Rate My Professor AI
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: '600px',
            mb: 5,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Get insights about your professors before choosing your next class!
        </Typography>
      </Container>
    </Box>
  );
}
