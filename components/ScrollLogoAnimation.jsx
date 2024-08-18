import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { useTheme } from '@mui/material/styles';

const ScrollLogoAnimation = ({ onAnimationComplete }) => {
  const scrollRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      style={{ height: '100vh', position: 'relative', margin: 20, borderRadius: '18px'}}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '-100%' }}
        transition={{ 
          duration: 1.5, 
          ease: [0.81, .82, .83, 1] 
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.secondary.light,
          zIndex: 9999,
          borderRadius: '18px',
        }}
        onAnimationComplete={onAnimationComplete}
      >
      </motion.div>
    </div>
  );
};

export default ScrollLogoAnimation;
