import React from 'react';
import EventCalendar from '@/components/EventCalendar';
import { Typography, Box } from '@mui/material';

const App = () => {
  return (
    <Box sx={{textAlign: 'center', py: {xs: 12, sm: 16}}}>
      <Typography variant='h1' component='div' gutterBottom>
        TechKshetra Events
      </Typography>
      <EventCalendar />
    </Box>
  );
};

export default App;
