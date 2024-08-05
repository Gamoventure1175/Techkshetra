'use client'

import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const PreloaderContainer = styled(motion.div)(({ theme }) => ({
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
  position: 'relative',
  zIndex: 2,
}));

const Preloader = () => {
  return (
    <PreloaderContainer
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, top: '-100%' }}
      transition={{duration: 1.5, delay: 1.5}}
    >
      <Text
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        TechKshetra
      </Text>
    </PreloaderContainer>
  );
};

export default Preloader;
