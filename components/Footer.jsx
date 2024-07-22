import imageKitLoader from '@/imagekitloader'
import { Button, Icon, Link, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import Image from 'next/image'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';

const logoStyle = {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

function Footer() {

  return (
    <Box
    id='events'
    sx={(theme) => ({
        width: '100%',
        px: {xs: 2, sm: 8, md: 12},
        backgroundColor: 
            theme.palette.mode == 'light'
            ? '#F7B471'
            : '#0A66C2',
        py: {xs: 2, sm: 4, md: 6},
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      
    })}
    >
        <Stack direction={'row'} spacing={{xs: 1, md: 2}} sx={{ alignItems: 'center'}}>
            <Box 
                sx={{
                    width: {xs: '40px', sm: '60px', md: '80px'},
                    height: {xs: '40px', sm: '60px', md: '80px'},
                    borderRadius: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image 
                    loader={imageKitLoader}
                    src='logo.png'
                    width={50}
                    height={50}
                    style={logoStyle}
                    />
            </Box>
            <Typography variant='h3'>
                TechKshetra
            </Typography>
        </Stack>
    </Box>
  )
}

export default Footer