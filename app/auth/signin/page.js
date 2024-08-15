'use client';

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Typography, Container, Box, Snackbar, Alert, useTheme, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';
import imageKitLoader from '@/libs/imagekitloader';
import HomeButton from '@/components/HomeButton';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const { data: session, status } = useSession();
  const router = useRouter();
  const theme = useTheme(); // Get current theme

  useEffect(() => {
    // Enable button only when email and password are filled
    setIsButtonDisabled(!(email && password));
  }, [email, password]);

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.emailVerified) {
        router.push('/'); // Redirect to homepage or desired route after sign-in
      } else {
        setError('Please verify your email before signing in.');
      }
    }
  }, [status, session, router]);

  const handleSignIn = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
  
    if (result.error) {
      if (result.error.includes('User does not exist')) {
        setError('User does not exist. Redirecting to sign-up page...');
        setShowSnackbar(true);
        setTimeout(() => {
          router.push('/auth/signup');
        }, 3000); // Redirect after 3 seconds to allow Snackbar message to be seen
      } else if (result.error.includes('Invalid password')) {
        setError('Invalid email or password.');
        setShowSnackbar(true);
      } else if (result.error.includes('Email not verified')) {
        setError('Please verify your email before signing in.');
        setShowSnackbar(true);
      } else {
        setError('An unknown error occurred.');
        setShowSnackbar(true);
      }
    } else {
      router.push('/'); // Redirect to homepage or desired route after successful sign-in
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
            theme.palette.mode === 'light'
            ? '#F7B471'
            : '#0A66C2', // Use theme background color
    }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper, // Use theme paper color
            padding: { xs: theme.spacing(2), sm: theme.spacing(3) },
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            width: '100%',
            position: 'relative', // Required for positioning Snackbar
          }}
        >
          <Box sx={{ width: 150, height: 150, borderRadius: '50%', overflow: 'hidden', position: 'relative', my: 1 }}>
            <Image loader={imageKitLoader} src={theme.palette.mode === 'light' ? '/logos/logolight' : '/logos/logodark'} alt='TechKshetra logo' layout='fill' objectFit='cover' />
          </Box>

          <Typography component="h1" variant="h2">
            Sign in
          </Typography>

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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'} // Toggle password visibility
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignIn}
            disabled={isButtonDisabled}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>

          {showSnackbar && (
            <Snackbar
              open={showSnackbar}
              autoHideDuration={3000} // Duration for Snackbar to stay visible
              onClose={() => setShowSnackbar(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert onClose={() => setShowSnackbar(false)} severity="error">
                {error}
              </Alert>
            </Snackbar>
          )}
        </Box>
        <HomeButton />
      </Container>
    </Box>
  );
};

export default SignIn;
