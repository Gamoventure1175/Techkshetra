// pages/profile.js
'use client'
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Container, Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  return (
    <Container component="main" sx={{
        width: "100%", 
        height: "100vh", 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
        }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt={session.user.name}
          src={session.user.image}
          sx={{ width: 150, height: 150, mb: 2 }}
        />
        <Typography component="h1" variant="h5">
          {session.user.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {session.user.email}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 4 }}
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
        >
          Sign Out
        </Button>
        <IconButton
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => router.push('/')}
        >
          <HomeIcon fontSize="large" />
        </IconButton>
      </Box>
    </Container>
  );
};

export default Profile;
