import React, { forwardRef } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, } from '@mui/material';
import { motion } from 'framer-motion';

const EventCard = forwardRef(({ event }, ref) => {
  return (
    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none',}}>
      <motion.div
        key={event.id}
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05, boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' }}
        whileTap={{ scale: 0.95 }}
        style={{borderRadius: '12px'}}
      >
        <Card sx={(theme) => ({
          display: 'flex', 
          flexDirection: 'column', 
          borderRadius: 2, 
          overflow: 'hidden',
          backgroundColor: theme.palette.mode === 'light'
                              ? theme.palette.grey[50]
                              : theme.palette.secondary.light
        })}>
          <CardMedia
            component="img"
            sx={{
              display: 'block',
              height: 140, 
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            image={event.image}
            alt={event.title}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                {event.title}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                {event.for}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                {event.description}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </motion.div>
    </a>
  );
});

export default EventCard;
