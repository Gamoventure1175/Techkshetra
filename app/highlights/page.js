'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'; 
import imageKitLoader from '@/libs/imagekitloader'; 
import { Container, Typography, Box } from '@mui/material';
import { useTheme } from '@/context/ThemeContext';
import FixedTabComponent from '@/components/FixedTabComponent'; // Import the FixedTabComponent
import './highlights.css'; // Import the CSS file for custom styles

// Highlights data
const highlights = [
  {
    title: 'Ganesh Chaturthi',
    images: [
      '/ganeshchaturthi/ganesha1',
      '/ganeshchaturthi/ganesha2',
      '/ganeshchaturthi/ganesha3',
      '/ganeshchaturthi/ganesha4',
      '/ganeshchaturthi/ganesha5',
      '/ganeshchaturthi/ganesha6',
      '/ganeshchaturthi/ganesha7',
      '/ganeshchaturthi/ganesha8',
      '/ganeshchaturthi/ganesha9',
    ],
  },
  {
    title: 'IT Club',
    images: [
      '/itclub/itclub1',
      '/itclub/itclub2',
      '/itclub/itclub3',
      '/itclub/itclub4',
      '/itclub/itclub5',
      '/itclub/itclub6',
      '/itclub/itclub7',
      '/itclub/itclub8',
      '/itclub/itclub9',
    ],
  },
  {
    title: 'Seminars',
    images: [
      '/seminars/seminar1',
      '/seminars/seminar2',
      '/seminars/seminar3',
      '/seminars/seminar4',
    ],
  },
  {
    title: 'Blockchain Event',
    images: [
      '/blockchainevent/blockchain1',
      '/blockchainevent/blockchain2',
      '/blockchainevent/blockchain3',
      '/blockchainevent/blockchain4',
      '/blockchainevent/blockchain5',
    ],
  },
];

const HighlightsPage = () => {
  const { mode, toggleColorMode } = useTheme(); 

  // Collect all images into a single array
  const allImages = highlights.flatMap(highlight => highlight.images);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [allImages.length]);

  const variants = {
    enter: {
      opacity: 0,
      x: 1000,
    },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      x: -1000,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <Container
      sx={{
        textAlign: "center",
        pb: 10, // Add padding-bottom to make space for the tab component
      }}
    >
      <Typography variant="h1" gutterBottom sx={{ my: { xs: 4, sm: 8 } }}>
        Highlights
      </Typography>

      {/* Slideshow */}
      <Box
        my={{ xs: 4, sm: 8 }}
        sx={{
          position: 'relative',
          width: '100%',
          height: '600px',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentImageIndex}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#000',
              overflow: 'hidden',
            }}
          >
            <Image
              loader={imageKitLoader}
              src={allImages[currentImageIndex]}
              alt="Slideshow"
              layout="fill"
              objectFit="cover"
              priority
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzdHlsZT4udHdpc3RlZCB7IGZpbGw6I0Y3QjQ3MTsgc3Ryb2tlOm5vbmU7IHN0cm9rZS13aWR0aDoycHg7IHN0cm9rZS1saW5lY2FwOiJyb3VuZCI7IHN0cm9rZS1kYXRhOiJ1cmwoIzAwMDAsIj4iLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAiLz48cmVjdCB4PSI0MCIgeT0iNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJsaWdodGJsdWU7Ii8+PHJlY3QgeD0iNDAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJsaWdodGJsZXU7Ii8+PC9zdHlsZT4KPC9zdmc+Cg=="
            />
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Highlights Gallery */}
      {highlights.map((highlight, index) => (
        <Box key={index} my={{ xs: 6, sm: 10 }} id={highlight.title}>
          <Typography variant="h4" gutterBottom>
            {highlight.title}
          </Typography>
          <div className="gallery-grid">
            {highlight.images.map((image, imgIndex) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="gallery-item"
                key={imgIndex}
              >
                <Image
                  loader={imageKitLoader}
                  src={image}
                  alt={`${highlight.title} Image ${imgIndex + 1}`}
                  width={600}
                  height={400}
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </motion.div>
            ))}
          </div>
        </Box>
      ))}

      {/* Fixed Tab Component */}
      <FixedTabComponent />
    </Container>
  );
};

export default HighlightsPage;
