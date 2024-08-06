'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Box, Typography, useTheme, TextField } from '@mui/material';
import EventCard from '@/components/EventCard';
import { events } from '@/data/events';
import { DateTime } from 'luxon';

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const theme = useTheme();
  const eventRefs = useRef({});

  useEffect(() => {
    eventRefs.current = events.reduce((acc, event) => {
      acc[event.id] = React.createRef();
      return acc;
    }, {});
  }, []);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    if (newDate) {
      const formattedDate = newDate.toISODate();
      const filteredEvents = events.filter(
        event => DateTime.fromJSDate(event.date).toISODate() === formattedDate
      );
      setSelectedEvents(filteredEvents);

      if (filteredEvents.length > 0) {
        const firstEventId = filteredEvents[0].id;
        const ref = eventRefs.current[firstEventId];
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      setSelectedEvents([]);
    }
  };

  const eventDates = new Set(events.map(event => DateTime.fromJSDate(event.date).toISODate()));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 2 }}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          renderDay={(day, _value, DayComponentProps) => {
            const formattedDate = day.toISODate();
            const isEventDay = eventDates.has(formattedDate);

            return (
              <Box
                component="div"
                sx={{
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  bgcolor: isEventDay
                    ? theme.palette.secondary.main
                    : 'transparent',
                  color: isEventDay ? 'white' : theme.palette.text.primary,
                  cursor: isEventDay ? 'pointer' : 'default',
                  ...DayComponentProps.sx,
                }}
              >
                <Typography variant="body2" sx={{ lineHeight: '36px' }}>
                  {day.day}
                </Typography>
              </Box>
            );
          }}
        />
      </LocalizationProvider>
      <Box sx={{ mt: 2, width: '100%' }}>
        {selectedEvents.length > 0 ? (
          selectedEvents.map(event => (
            <div key={event.id} ref={eventRefs.current[event.id]}>
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <Typography variant="h6" component="div">
            No events for the selected date.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DatePickerComponent;
