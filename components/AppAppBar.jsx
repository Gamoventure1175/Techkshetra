'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSession, signOut } from 'next-auth/react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import imageKitLoader from '@/libs/imagekitloader';
import { motion } from 'framer-motion';
import { Divider } from '@mui/material';

const logoStyle = {
  width: '55px',
  height: 'auto',
  cursor: 'pointer',
  display: 'block',
};

function AppAppBar() {
  const { mode, toggleColorMode } = useTheme();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div>
      <AppBar

        sx={(theme) => ({
          position: 'fixed',
          left: 0,
          top: 0,
          padding: 0,
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          m: 2,
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          mt: isVisible ? 2 : 0,
          transition: 'transform 0.3s ease-in-out',
          // transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '18px',
        })}
        >
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '18px',
            backdropFilter: 'blur(24px)',
            maxHeight: 60,
            boxShadow: '0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)'
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              px: 0,
            }}
          >
            <Image
              src={mode === 'light' ? '/logos/logolight' : '/logos/logodark'}
              loader={imageKitLoader}
              width={100}
              height={100}
              style={logoStyle}
              alt="logo of sitemark"
            />
            <Box sx={{ display: { xs: 'none', md: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 18 } }}>
              <MenuItem
                onClick={() => router.push('/')}
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant="body2" color="text.primary">
                  Home
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => router.push('/events')}
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
            {status === 'authenticated' ? (
              <>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  href="/profile"
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
                  Sign In
                </Button>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  href="/auth/signup"
                  target="_self"
                >
                  Sign Up
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
            <Drawer
              anchor="right"
              open={open}
              onClose={toggleDrawer(false)}
              component={motion.div}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  minWidth: '60dvw',
                  p: 2,
                  backgroundColor: 'background.paper',
                  flexGrow: 1,
                }}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    flexGrow: 1,
                  }}
                >
                </Box>
                <MenuItem onClick={() => router.push('/')}>Home</MenuItem>
                <MenuItem onClick={() => router.push('events')}>Events</MenuItem>
                <MenuItem onClick={() => router.push('/highlights')}>
                  Highlights
                </MenuItem>
                <MenuItem onClick={() => router.push('/courses')}>Courses</MenuItem>
                <MenuItem onClick={() => router.push('/aboutus')}>
                  About Us
                </MenuItem>
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
                        Sign In
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="text"
                        component="a"
                        href="/auth/signup"
                        sx={{ width: '100%' }}
                      >
                        Sign Up
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  window: PropTypes.func,
};

export default AppAppBar;