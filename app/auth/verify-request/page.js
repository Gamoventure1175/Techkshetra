'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Typography, Box, Container, useTheme } from '@mui/material';
import Image from 'next/image';
import { verifyEmail } from './actions'; // Import server action
import imageKitLoader from '@/libs/imagekitloader';
import HomeButton from '@/components/HomeButton';

const VerifyRequest = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleVerifyRequest = async () => {
    const result = await verifyEmail(); // Assumes that the verification token is handled server-side

    if (result.success) {
      router.push('/');
    } else {
      setMessage(result.error || 'Verification failed');
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

          <Typography component="h1" variant="h4">
            Please verify your email address
          </Typography>

          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            We have sent an email to your email address. Please click on the verification link to proceed.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleVerifyRequest}
            sx={{ mt: 3, mb: 2 }}
          >
            Resend Verification Email
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

export default VerifyRequest;
