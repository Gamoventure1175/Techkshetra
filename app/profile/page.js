'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, TextField } from '@mui/material';
import HomeButton from '@/components/HomeButton';
import Link from 'next/link';
import { useTheme } from '@mui/material';

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();

  // Log session data to debug
  console.log('Session Data:', session);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/');
    }
  }, [session, status, router]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setError(data.message || 'Failed to change password');
    }
  };

  if (!session) {
    return <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</Container>;
  }

  return (
    <Container component="main" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        <Typography variant="h3">{session.user.name}</Typography>
        <Typography variant="subtitle1">{session.user.email}</Typography>
        {session.user.userType === 'student' && session.user.studentId && (
          <Typography variant="subtitle2">{session.user.studentId}</Typography>
        )}
        <Typography variant="subtitle2">
          <Link href="/profile/change-password" style={{color: theme.palette.text.secondary}}>
            Change Password
          </Link>
        </Typography>
        <Button variant="contained" color="primary" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Box>
      <HomeButton />
    </Container>
  );
};

export default Profile;
