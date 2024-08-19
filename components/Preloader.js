'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const PreloaderContainer = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  width: 'calc(100% - 32px)', // Adjust width to account for padding
  height: 'calc(100vh - 32px)', // Adjust height to account for padding
  top: '16px', // Adjust top position to account for padding
  left: '16px', // Adjust left position to account for padding
  background: 'white',
  zIndex: 9999,
  overflow: 'hidden',
  borderRadius: '18px',
  boxSizing: 'border-box', // Ensure padding does not affect dimensions
}));

const FillAnimation = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  bottom: 0,
  background: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.secondary.light,
  zIndex: 1,
  borderRadius: '18px',
}));

const TextContainer = styled(motion.div)({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  padding: 2,
});

const Text = styled(motion.div)(({ theme }) => ({
  ...theme.typography.h2,
  marginBottom: '20px',
  position: 'relative',
  display: 'inline-block',
  color: 'white'
}));

const LoadingLine = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  bottom: '-10px', // Adjust this value based on your design
  left: 0,
  height: '3px',
  background: 'white',
  width: '100%',
}));

const Preloader = () => {
  return (
    <PreloaderContainer>
      <FillAnimation
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <TextContainer>
        <Text
          initial={{ opacity: 0, scale: .8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: .4}}
        >
          TechKshetra
          <LoadingLine
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 2 }}
          />
        </Text>
      </TextContainer>
    </PreloaderContainer>
  );
};

export default Preloader;
