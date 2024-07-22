'use client'

import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

function Highlights() {
  return (
    <Box
      id='highlights'
      sx={(theme) => ({
        width: '100%',
        px: {xs: 2, sm: 8, md: 12},
        height:'100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      })}
      >
        <Stack sx={{textAlign: 'center'}} spacing={3}>
          <Typography variant='h1'>
            Highlights
          </Typography>
          <Typography variant='h4'>
            Stay tuned...
          </Typography>
        </Stack>
      </Box>
  )
}

export default Highlights