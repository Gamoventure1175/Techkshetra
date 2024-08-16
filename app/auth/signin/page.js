'use client';

import { useState } from 'react';
import { TextField, Button, Typography, Box, Container, useTheme } from '@mui/material';
import Image from 'next/image';
import { signIn } from './actions'; // Import server action
import imageKitLoader from '@/libs/imagekitloader';
import HomeButton from '@/components/HomeButton';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleSignIn = async () => {
    const result = await signIn({ email, password });

    if (result.success) {
      // Redirect to home or any desired page
    } else {
      setMessage(result.error || 'Failed to sign in');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      backgroundColor: theme.palette.mode === 'light' ? '#F7B471' : '#0A66C2',
    }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper,
            padding: { xs: theme.spacing(2), sm: theme.spacing(3) },
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            width: '100%',
            position: 'relative',
          }}
        >
          <Box sx={{ width: 150, height: 150, borderRadius: '50%', overflow: 'hidden', position: 'relative', my: 1 }}>
            <Image loader={imageKitLoader} src={theme.palette.mode === 'light' ? '/logos/logolight' : '/logos/logodark'} alt='TechKshetra logo' layout='fill' objectFit='cover' />
          </Box>

          <Typography component="h1" variant="h2">
            Sign In
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignIn}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          {message && (
            <Typography color="error" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
        <HomeButton />
      </Container>
    </Box>
  );
};

export default SignIn;
