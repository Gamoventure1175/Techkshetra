'use client';

import React, { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, Box, Typography, Button } from '@mui/material';

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait until session loading is complete
    if (!session) {
      router.push('/'); // Redirect to homepage if not signed in
    }
  }, [session, status, router]);

  if (!session) {
    return     <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</Container>;
  }

  return (
    <Container component="main" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4">Profile</Typography>
        <Typography variant="body1">Name: {session.user.name}</Typography>
        <Typography variant="body1">Email: {session.user.email}</Typography>
        <Typography variant="body1">Email Verified: {session.user.emailVerified ? 'Yes' : 'No'}</Typography>
        {session.user.userType === 'student' && (
          <Typography variant="body1">Student ID: {session.user.studentId}</Typography>
        )}
        <Button variant="contained" color="primary" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
