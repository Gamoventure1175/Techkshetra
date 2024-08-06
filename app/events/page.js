'use client'

import React from 'react';
import { useMediaQuery, useTheme, Box } from '@mui/material';
import EventCalendar from '@/components/EventCalendar';
import DatePickerComponent from '@/components/DatePickerComponent';

const MainComponent = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{textAlign: 'center', py: {xs: 12, sm: 16}}}>
      {isXs ? <DatePickerComponent /> : <EventCalendar />}
    </Box>
  );
};

export default MainComponent;
