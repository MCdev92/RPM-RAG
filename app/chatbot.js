'use client';
import { Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import AssistantIcon from '@mui/icons-material/Assistant';
import { useRouter } from 'next/router';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin'); // Redirect to sign-in if not authenticated
    }
  }, [status, router]);

  // Set the initial assistant message
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
      },
    ]);
  }, []);

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

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  return session ? (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `url("/assets/images/banner.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
      }}
    >
      <Stack
        direction="column"
        width={{ xs: '90%', sm: '500px' }}
        height="700px"
        borderRadius={3}
        boxShadow={3}
        bgcolor="rgba(255, 255, 255, 0.85)" // Slight opacity for better contrast
        p={2}
        spacing={3}
        sx={{ overflow: 'hidden' }}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          sx={{
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c3cfe2',
              borderRadius: '8px',
            },
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              {message.role === 'assistant' && (
                <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                  <AssistantIcon />
                </Avatar>
              )}
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
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {message.content}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Type your message..."
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress} // Handle Enter key press
            variant="outlined"
            sx={{
              bgcolor: 'background.default',
              borderRadius: 2,
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={!message.trim()}
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  ) : null;
}
