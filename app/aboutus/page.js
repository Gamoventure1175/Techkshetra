'use client';

import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Button, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';
import Image from 'next/image';
import imageKitLoader from '@/libs/imagekitloader';
import teamMembers from '@/data/teamMembers';
import { useRouter } from 'next/navigation';
 
const AboutUs = () => {
  const [showAll, setShowAll] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const visibleMembers = showAll ? teamMembers : teamMembers.slice(0, 3); // Display the first 3 members initially

  return (
    <Container sx={{
        width: '100%',
        my: { xs: 15, sm: 19, md: 24 },
        textAlign: 'center'
    }}>
      <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        sx={{
            textAlign: 'center', 
            my: { xs: 12, sm: 19 }
        }}
      >
        <Box my={4}>
          <Typography variant="body1" align="center" color="textSecondary">
            Powered By
          </Typography>
          <Box sx={{
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            flexDirection: {xs: 'column', sm: 'row'}
          }}>
            <Box 
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%', // This makes the avatar circular
                overflow: 'hidden',
                position: 'relative', // Necessary for the Image to fit correctly
                border: `2px solid ${theme.palette.primary.main}`, // Optional: Add a border for better visibility
              }}
            >
              <Image
                loader={imageKitLoader}
                src="/logos/collegelogo"
                alt="B. K. Birla College Logo"
                layout="fill"
                objectFit="cover"
              />
            </Box>
            <Typography variant="h4" align="center" color="textSecondary" >
              B. K. Birla College of Arts, Science and Commerce
            </Typography>
          </Box>
        </Box>
        <Typography variant='h1'>
          TechKshetra
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Welcome to B. K. Birla College, Kalyan's first CS and IT club of technology, innovation and more...
        </Typography>
      </Box>

      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {visibleMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box component={motion.div} whileHover={{ scale: 1.05 }}>
                <Image
                  loader={imageKitLoader}
                  src={member.imagePath}
                  alt={member.name}
                  width={128}
                  height={128}
                  style={{ borderRadius: '50%', margin: 'auto' }}
                />
                <Typography variant="h6" align="center" mt={2}>
                  {member.name}
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary">
                  {member.role}
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary">
                  {member.email}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box mt={4} textAlign="center">
          {!showAll ? (
            <Button
              variant="contained"
              color="primary"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowAll(true)}
            >
              View All Members
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowAll(false)}
            >
              Show Less
            </Button>
          )}
        </Box>
      </Box>

      <Box mt={6} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          component={motion.a}
          whileHover={{ scale: 1.05 }}
          href="mailto:techkshetra.cs.it.club@gmail.com"
          startIcon={<EmailIcon />}
        >
          Contact Us
        </Button>
      </Box>
    </Container>
  );
};

export default AboutUs;
