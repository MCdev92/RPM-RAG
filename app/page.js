
'use client';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid } from '@mui/material';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignIn() {
  return (
    <Box>
      {/* Hero Section */}
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
              ProfRanker AI
            </Typography>
            <Box>
              <SignedOut>
                <Link href="/sign-in" passHref>
                  <Button sx={{ color: '#fff' }}>Login</Button>
                </Link>
                <Link href="/sign-up" passHref>
                  <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }}>
                    Sign Up
                  </Button>
                </Link>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
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
              width: { xs: '200px', sm: '250px' },
              height: { xs: '200px', sm: '250px' },
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: 4,
            }}
          >
            <Image
              src="/assets/images/rpm-ai.png" // Corrected path
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
            Welcome to ProfRanker AI
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
          <Link href="/rate" passHref>
            <Button variant="contained" color="primary" size="large">
              Get Started
            </Button>
          </Link>
        </Container>
      </Box>

<Container sx={{ py: 8 }}>
  <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
    Why Choose Us?
  </Typography>
  <Grid container spacing={6}>
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          textAlign: 'center',
          px: 4,
          py: 3,
          borderRadius: 3,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'translateY(-10px)',
          },
        }}
      >
        <Image
          src="/assets/images/another image.jpeg"
          alt="Accurate Ratings"
          width={250}
          height={150}
          style={{ borderRadius: '8px' }}
        />
        <Typography variant="h6" sx={{ mt: 3, fontWeight: 'bold', fontSize: '1.2rem' }}>
          Accurate Ratings
        </Typography>
        <Typography sx={{ mt: 2, color: 'white' }}>
          We use advanced AI algorithms to provide the most accurate and unbiased ratings for professors.
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          textAlign: 'center',
          px: 4,
          py: 3,
          borderRadius: 3,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'translateY(-10px)',
          },
        }}
      >
        <Image
          src="/assets/images/accurate.jpeg"
          alt="Comprehensive Reviews"
          width={250}
          height={150}
          style={{ borderRadius: '8px' }}
        />
        <Typography variant="h6" sx={{ mt: 3, fontWeight: 'bold', fontSize: '1.2rem' }}>
          Comprehensive Reviews
        </Typography>
        <Typography sx={{ mt: 2, color: 'white' }}>
          Read detailed reviews and feedback from students about their learning experiences.
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          textAlign: 'center',
          px: 4,
          py: 3,
          borderRadius: 3,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'translateY(-10px)',
          },
        }}
      >
        <Image
          src="/assets/images/review.png"
          alt="Easy to Use"
          width={250}
          height={150}
          style={{ borderRadius: '8px' }}
        />
        <Typography variant="h6" sx={{ mt: 3, fontWeight: 'bold', fontSize: '1.2rem' }}>
          Easy to Use
        </Typography>
        <Typography sx={{ mt: 2, color: 'white' }}>
          Our platform is user-friendly and intuitive, making it easy for you to find the information you need.
        </Typography>
      </Box>
    </Grid>
  </Grid>
</Container>


      
    </Box>
  );
}
