'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { useSession, signOut } from 'next-auth/react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import Image from 'next/image';
import logo from '@/public/images/logot.png';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';

const logoStyle = {
  width: '50px',
  height: 'auto',
  cursor: 'pointer',
};

function AppAppBar() {
  const { mode, toggleColorMode } = useTheme(); // Access theme from context
  const { data: session, status } = useSession(); // Access session data
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = -100;

    if (sectionElement) {
      let targetScroll;

      if (sectionId === 'events') {
        const offset = 0; // Custom offset for the 'events' section
        targetScroll = sectionElement.offsetTop - offset;
      } else {
        const elementHeight = sectionElement.offsetHeight;
        const viewportHeight = window.innerHeight;
        targetScroll = sectionElement.offsetTop - (viewportHeight / 2) + (elementHeight / 2);
      }

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });

      console.log(sectionElement.id);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '18px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? '0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)'
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Image
                src={logo}
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  onClick={() => router.push('/')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Home
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('events')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Events
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => router.push('/highlights')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Highlights
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => router.push('/courses')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Courses
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => router.push('/aboutus')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    About Us
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {status === 'authenticated' ? (
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    href="/profile" // Adjust the link to your profile page
                    target="_self"
                  >
                    Profile
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    href="/auth/signin"
                    target="_self"
                  >
                    Sign in
                  </Button>
                </>
              )}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => scrollToSection('home')}>
                    Home
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('events')}>
                    Events
                  </MenuItem>
                  <MenuItem onClick={() => router.push('/highlights')}>
                    Highlights
                  </MenuItem>
                  <MenuItem onClick={() => router.push('/highlights')}>
                    Courses
                  </MenuItem>
                  <MenuItem onClick={() => router.push('/aboutus')}>About Us</MenuItem>
                  <Divider />
                  {status === 'authenticated' ? (
                    <>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="text"
                          component="a"
                          href="/profile" // Adjust the link to your profile page
                          target="_self"
                          sx={{ width: '100%' }}
                        >
                          Profile
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => signOut()}
                          sx={{ width: '100%' }}
                        >
                          Sign out
                        </Button>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="text"
                          component="a"
                          href="/auth/signin"
                          sx={{ width: '100%' }}
                        >
                          Sign in
                        </Button>
                      </MenuItem>
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
