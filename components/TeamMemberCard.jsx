'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import imageKitLoader from '@/libs/imagekitloader';

const TeamMemberCard = ({ member }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card component={motion.div} whileHover={{ scale: 1.05 }} onClick={handleExpandClick} sx={{borderRadius: 3 }}>
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Image
          loader={imageKitLoader}
          src={member.imagePath}
          alt={member.name}
          width={128}
          height={128}
          style={{ borderRadius: '50%', margin: 'auto' }}
        />
        <Typography variant="h6" mt={2}>
          {member.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {member.role}
        </Typography>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent>
              <Typography paragraph>{member.description}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <IconButton href={`mailto:${member.email}`} color="primary">
                  <EmailIcon />
                </IconButton>
                <IconButton href={member.instagram} target="_blank" color="primary">
                  <InstagramIcon />
                </IconButton>
                <IconButton href={member.linkedin} target="_blank" color="primary">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default TeamMemberCard;
