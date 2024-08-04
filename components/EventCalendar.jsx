'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Typography, useTheme } from '@mui/material';
import { events } from '@/data/events';
import EventCard from '@/components/EventCard';
import '@/style/EventCalendar.css';

const EventCalendar = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const cardRefs = useRef({});
  const theme = useTheme(); // Access the current theme

  useEffect(() => {
    if (selectedEvents.length > 0) {
      const firstCard = cardRefs.current[selectedEvents[0].id];
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [selectedEvents]);

  const calendarEvents = useMemo(
    () =>
      events.map(event => ({
        id: event.id,
        title: event.title,
        date: event.date.toISOString().split('T')[0],
        extendedProps: {
          description: event.description,
          image: event.image,
          for: event.for,
          registrationLink: event.registrationLink,
        },
      })),
    []
  );

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    const filteredEvents = events.filter(
      event => new Date(event.date).toDateString() === new Date(info.dateStr).toDateString()
    );
    setSelectedEvents(filteredEvents);
  };

  const handleEventClick = (info) => {
    const clickedEvent = events.find(event => event.id === parseInt(info.event.id));
    setSelectedEvents([clickedEvent]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', margin: '0 auto', padding: 2 }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventColor="transparent"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        contentHeight="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: null,
        }}
        eventContent={({ event }) => (
          <Box sx={(theme) => ({
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main,
            width: '100%',
            height: '100%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: 1,
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          })}>
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {event.title}
            </Typography>
          </Box>
        )}
      />
      <Box sx={{ mt: 2 }}>
        {selectedEvents.length > 0 ? (
          selectedEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              ref={(el) => (cardRefs.current[event.id] = el)}
            />
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

export default EventCalendar;
