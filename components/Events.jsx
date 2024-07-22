'use client'

import React from 'react';
import { Paper, Card,  CardContent, CardMedia, Container, Typography, Button, Box, Grid, Stack } from '@mui/material';
import Image from 'next/image';
import imageKitLoader from '@/imagekitloader';

const imageStyle = {
  width: '100%',
  height: '250px',

}


function Events() {
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
        py: {xs: 8, sm: 10, md: 14},
      })}
    >
      <Box
        sx={{
          textAlign: 'center',
          py: 5
      }}  
      >
        <Typography 
          variant='h2'
          sx={{pb: 2}}
        >
            Events
          </Typography>
          <Typography variant='subtitle1'>
            Get ready for exicitng seminars, dev meetups and events!
          </Typography>
        </Box>
        <Box>
          <Grid 
          container 
          rowSpacing={{xs: 2, sm: 3}}
          columnSpacing={{xs: 2, sm: 5}}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={10} sx={{borderRadius: 2}}>
                <Card >
                  <Box component={'div'} sx={{width: '100%', p: 0, m:0}}>
                   <Image
                      src='vrandar.png'
                      loader={imageKitLoader}
                      style={imageStyle}
                      sizes='(max-width: 600px) 680px, 1000px'
                      width={50}
                      height={50}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant='h4'>
                      AR/VR games
                    </Typography>
                    <Typography variant='body2'>
                    Step into the immersive realm where reality bends,
                    Join us at our AR/VR event, where innovation transcends.
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={10} sx={{borderRadius: 2}}>
                <Card>
                  <Box component={'div'} sx={{width: '100%', p: 0, m:0}}>
                    <Image
                        src='devmeetups.jpg'
                        loader={imageKitLoader}
                        style={imageStyle}
                        width={50}
                        height={50}
                        sizes='(max-width: 600px) 680px, 1000px'
                      />
                    </Box>
                  <CardContent>
                  <Typography variant='h4'>
                      Dev Meetups
                    </Typography>
                    <Typography variant='body2'>
                    Join us for engaging talks, hands-on workshops, and networking opportunities with industry experts and fellow developers. Enhance your skills and connect with our vibrant tech community!
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={10} sx={{borderRadius: 2}}>
                <Card>
                <Box component={'div'} sx={{width: '100%', p: 0, m:0}}>
                    <Image
                        src='techtalk.jpg'
                        loader={imageKitLoader}
                        style={imageStyle}
                        width={50}
                        height={50}
                        sizes='(max-width: 600px) 680px, 1000px'
                      />
                    </Box>
                  <CardContent>
                    <Typography variant='h4'>
                    Tech Talks
                    </Typography>
                    <Typography variant='body2'>
                    Attend our tech talks to explore cutting-edge technologies and trends, guided by industry leaders. Enhance your knowledge and network with peers and professionals!
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={10} sx={{borderRadius: 2}}>
                <Card>
                <Box component={'div'} sx={{width: '100%', p: 0, m:0}}>
                    <Image
                        src='career.jpg'
                        loader={imageKitLoader}
                        style={imageStyle}
                        width={50}
                        height={50}
                        sizes='(max-width: 600px) 680px, 1000px'
                      />
                    </Box>
                  <CardContent>
                  <Typography variant='h4'>
                      Career Guidance
                    </Typography>
                    <Typography variant='body2'>
                    Gain valuable career insights and advice from industry experts, and connect with professionals to kickstart your career journey. Don't miss these opportunities to shape your future!
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={10} sx={{borderRadius: 2}}>
                <Card>
                <Box component={'div'} sx={{width: '100%', p: 0, m:0}}>
                    <Image
                        src="workshops"
                        loader={imageKitLoader}
                        style={imageStyle}
                        width={50}
                        height={50}
                        sizes='(max-width: 600px) 680px, 1000px'
                      />
                    </Box>
                  <CardContent>
                  <Typography variant='h4'>
                    Workshops
                    </Typography>
                    <Typography variant='body2'>
                    Enhance your skills through hands-on workshops led by industry experts. Learn the latest technologies and techniques in an interactive and engaging environment!
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={10} sx={{borderRadius: 2}}>
                <Card>
                <Box component={'div'} sx={{width: '100%', p: 0, m:0}}>
                    <Image
                        src='robotics.jpg'
                        loader={imageKitLoader}
                        style={imageStyle}
                        width={50}
                        height={50}
                        sizes='(max-width: 600px) 680px, 1000px'
                      />
                    </Box>
                  <CardContent>
                  <Typography variant='h4'>
                  Robotics Competitions
                    </Typography>
                    <Typography variant='body2'>
                    Showcase your engineering skills and creativity by designing and battling robots in our exciting competitions. Collaborate with peers and experience the thrill of innovation!
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </Box>
    </Box>
  )
}

export default Events