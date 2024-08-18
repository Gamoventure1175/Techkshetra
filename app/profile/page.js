'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import HomeButton from '@/components/HomeButton';
import Link from 'next/link';
import { useTheme } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/');
    }
  }, [session, status, router]);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
    console.log(session.user);
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setUploadError('Please select an image file to upload');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', imageFile);
  
    try {
      const response = await fetch('/api/auth/upload-profile-image', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload profile picture');
      }
  
      const data = await response.json();
      setMessage('Profile picture updated successfully');
      setUploadError('');
      router.reload();  // Reload to update the profile picture immediately
    } catch (error) {
      console.error('Image upload error:', error);
      setUploadError(error.message || 'Failed to upload profile picture');
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      handleImageUpload(); 
    }
  };
  

  if (!session) {
    return <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</Container>;
  }

  return (
    <Container component="main" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        <Box sx={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }} onClick={handleAvatarClick}>
          <Avatar src={session.user.image} sx={{ width: 100, height: 100 }} />
          <IconButton sx={{ position: 'absolute', bottom: 0, right: 0 }}>
            <CameraAltIcon fontSize="small" />
          </IconButton>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </Box>
        <Typography variant="h3">{session.user.name}</Typography>
        <Typography variant="subtitle1">{session.user.email}</Typography>
        {session.user.userType === 'student' && session.user.studentId && (
          <Typography variant="subtitle2">{session.user.studentId}</Typography>
        )}
        <Typography variant="subtitle2">
          <Link href="/profile/change-password" style={{ color: theme.palette.text.secondary }}>
            Change Password
          </Link>
        </Typography>
        {uploadError && <Typography color="error" variant="body2">{uploadError}</Typography>}
        {message && <Typography color="primary" variant="body2">{message}</Typography>}
        <Button variant="contained" color="primary" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Box>
      <HomeButton />
    </Container>
  );
};

export default Profile;
