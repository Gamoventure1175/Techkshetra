import imageKitLoader from '@/libs/imagekitloader';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useTheme } from '@mui/material/styles';

const logoStyle = {
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

function Footer() {
  const theme = useTheme();

  return (
    <Box
      id='footer'
      sx={{
        width: '100%',
        px: { xs: 2, sm: 8, md: 12 },
        backgroundColor: 
          theme.palette.mode === 'light'
          ? '#F7B471'
          : '#0A66C2',
        py: { xs: 2, sm: 4, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Stack direction={'row'} spacing={{ xs: 1, md: 2 }} sx={{ alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            width: { xs: '40px', sm: '60px', md: '80px' },
            height: { xs: '40px', sm: '60px', md: '80px' },
            borderRadius: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            loader={imageKitLoader}
            src='logo.png'
            width={50}
            height={50}
            style={logoStyle}
            alt="TechKshetra Logo"
          />
        </Box>
        <Typography variant='h3'>
          TechKshetra
        </Typography>
      </Stack>
      <Stack direction='row' spacing={2} mb={2}>
        <IconButton
          component="a"
          href="https://www.instagram.com/techkshetra.birla?igsh=MWVwNTAyaXB1dzFrZg==" // Replace with your Instagram profile URL
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/yourprofile" // Replace with your LinkedIn profile URL
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.facebook.com/yourprofile" // Replace with your Facebook profile URL
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component="a"
          href="mailto:techkshetra.cs.it.club@gmail.com" // Replace with your email address
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
        >
          <EmailIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default Footer;
