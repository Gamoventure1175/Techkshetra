'use client';

import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Button, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';
import Image from 'next/image';
import imageKitLoader from '@/libs/imagekitloader';
import teamMembers from '@/data/teamMembers';
import { useRouter } from 'next/navigation';
import TeamMemberCard from '@/components/TeamMemberCard'; // Import the new component

const AboutUs = () => {
  const [showAll, setShowAll] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const visibleMembers = showAll ? teamMembers : teamMembers.slice(0, 3); // Display the first 3 members initially

  return (
    <Container sx={{ width: '100%', my: { xs: 8, sm: 10, md: 12 }, textAlign: 'center' }}>
      <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box my={4}>
          <Typography variant="body1" align="center" color="textSecondary">Powered By</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box sx={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', position: 'relative', border: `2px solid ${theme.palette.primary.main}`, }}>
              <Image loader={imageKitLoader} src="/logos/collegelogo" alt="B. K. Birla College Logo" layout="fill" objectFit="cover" />
            </Box>
            <Typography variant="h4" align="center" color="textSecondary">B. K. Birla College of Arts, Science and Commerce</Typography>
          </Box>
        </Box>
        <Box sx={{ width: 250, height: 250, borderRadius: '50%', overflow: 'hidden', position: 'relative', my: 2 }}>
          <Image loader={imageKitLoader} src={"/logos/clublogo"} alt='TechKshetra logo' layout='fill' objectFit='cover' />
        </Box>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Welcome to B. K. Birla College, Kalyan's first CS and IT club of technology, innovation and more...
        </Typography>
      </Box>

      <Box mt={6}>
        <Typography variant="h4" gutterBottom>Meet Our Team Members</Typography>
        <Grid container spacing={4}>
          {visibleMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TeamMemberCard member={member} /> {/* Use the new component */}
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
