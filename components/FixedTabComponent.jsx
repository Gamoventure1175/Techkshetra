// TabComponent.js
import React from 'react';
import { Box, IconButton, Button, useMediaQuery, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';  // Updated import

const sections = ['Ganesh Chaturthi', 'IT Club', 'Seminars', 'Blockchain Event'];

const TabComponent = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();  // Updated hook

  const handleScrollToSection = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    router.push('/');  // Updated to use next/navigation
  };

  return (
    <Box 
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.5rem',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        zIndex: 1000, // Ensure it's above other content
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '700px',  // Adjust max-width as needed
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        {sections.map((section) => (
          <Button
            key={section}
            onClick={() => handleScrollToSection(section)}
            sx={{
              flex: 1,
              padding: '0.5rem 1rem',
              margin: '0.25rem',
              textTransform: 'none',
              borderRadius: '8px',
              border: `1px solid ${theme.palette.divider}`,
              fontSize: '0.875rem', // Adjust font size for better fit
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {section}
          </Button>
        ))}
        <IconButton
          onClick={handleHomeClick}
          sx={{
            marginLeft: '0.5rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: theme.palette.action.hover,
            '&:hover': {
              backgroundColor: theme.palette.action.selected,
            },
          }}
        >
          <HomeIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TabComponent;
