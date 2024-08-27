'use client';
import { AppBar, Toolbar, Typography, Button, Box, Stack, TextField, Link } from '@mui/material';
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  // Set the initial assistant message
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
      },
    ]);
  }, []);

  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (!message.trim()) return; // Avoid sending empty messages

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' }, // Placeholder for assistant response
    ]);

    setMessage(''); // Clear the input field

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let completeMessage = '';

      reader.read().then(function processText({ done, value }) {
        if (done) {
          // Update the final message once reading is done
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1].content = completeMessage;
            return updatedMessages;
          });
          return;
        }

        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        completeMessage += text;

        // Update the message content as the stream is read
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].content = completeMessage;
          return updatedMessages;
        });

        // Continue reading the stream
        return reader.read().then(processText);
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors in fetching or reading the response
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of Enter key
      sendMessage();
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/sign-in');
  };

  return (
    <Box>
      <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            <span
              style={{
                background: 'linear-gradient(90deg, #ff4081, #00bcd4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shiny-text 3s ease-in-out infinite',
                backgroundSize: '200% auto',
              }}
            >
              ProfRanker AI
            </span>
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
              <Stack direction="row" spacing={1} alignItems="center">
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    padding: '6px 16px',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <UserButton /> {/* User icon aligned to the right */}
              </Stack>
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundImage: `url('/assets/images/banner.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Stack
          direction="column"
          width={{ xs: '90%', sm: '500px' }}
          height="700px"
          borderRadius={3}
          boxShadow={2}
          bgcolor="background.paper"
          p={2}
          spacing={3}
        >
          <Stack
            direction="column"
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === 'assistant' ? 'flex-start' : 'flex-end'
                }
              >
                <Box
                  bgcolor={
                    message.role === 'assistant'
                      ? 'primary.main'
                      : 'secondary.main'
                  }
                  color="white"
                  borderRadius={2}
                  p={2}
                  maxWidth="75%"
                >
                  <Typography>{message.content}</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress} // Handle Enter key press
              variant="outlined"
            />
            <Button variant="contained" onClick={sendMessage} disabled={!message.trim()}>
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
      {/* Shiny effect style */}
      <style jsx global>{`
        @keyframes shiny-text {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </Box>
  );
}
