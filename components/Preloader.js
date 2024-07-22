// app/components/Preloader.js
import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const PreloaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  width: '100%',
  height: '100vh',
  top: 0,
  left: 0,
  background: `linear-gradient(180deg, rgba(247,180,113,1) 26%, rgba(10,102,194,1) 86%)`, // Gradient background
  zIndex: 9999,
}));

const Text = styled(motion.div)(({ theme }) => ({
  ...theme.typography.h1,
  color: 'white',
}));

const Preloader = () => {
  return (
    <PreloaderContainer>
      <Text
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        TechKshetra
      </Text>
    </PreloaderContainer>
  );
};

export default Preloader;
