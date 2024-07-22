'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Typography, Container, Box, Snackbar, Alert, Link, useTheme } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const theme = useTheme(); // Get current theme

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/'); // Adjust as needed
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { redirect: true });
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      backgroundColor: 
            theme.palette.mode == 'light'
            ? '#F7B471'
            : '#0A66C2', // Use theme background color
    }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper, // Use theme paper color
            padding: {xs: theme.spacing(2), sm: theme.spacing(3)},
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h1">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size='small'
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size='small'
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{ mb: 2 }}
            >
              Sign in with Google
            </Button>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" variant="body2">
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
              <Alert onClose={() => setError('')} severity="error">
                {error}
              </Alert>
            </Snackbar>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default SignIn;
