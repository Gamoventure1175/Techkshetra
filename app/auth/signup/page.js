'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Typography, Container, Box, Snackbar, Alert, Link, useTheme } from '@mui/material';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const theme = useTheme(); // Get current theme

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess('Account created successfully! Redirecting to sign in...');
      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
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
            Sign Up
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
              Sign Up
            </Button>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Already have an account?{' '}
                <Link href="/auth/signin" variant="body2">
                  Sign In
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
          {success && (
            <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
              <Alert onClose={() => setSuccess('')} severity="success">
                {success}
              </Alert>
            </Snackbar>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
