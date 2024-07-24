'use client';

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Typography, Container, Box, Snackbar, Alert, useTheme } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const SignIn = () => {
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();
  const theme = useTheme(); // Get current theme

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/'); // Redirect to homepage or desired route after sign-in
    }
  }, [status, router]);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' }); // Specify the callback URL
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
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in with Google
          </Button>
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
