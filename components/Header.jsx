'use client'

import { Box, Typography, Stack, Container, Button } from "@mui/material";
import {useRouter} from "next/navigation";
import { motion } from 'framer-motion';

export default function Header() {

    const router = useRouter();

    return(
        <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        id='home' 
        sx={{
            width: "100%", 
            height: "100vh", 
            display:'flex', 
            alignItems: 'center', 
            justifyContent:'center'
            }}
        >
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Stack spacing={2} useFlexGap sx={{textAlign: 'center'}}>
                    <Box>
                        <Typography variant='h4'>
                        B. K. Birla College of Arts, Science & Commerce
                        </Typography>
                        <Typography variant='subtitle2'>
                        presents
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='h1' my={{xs: 3, sm: 4}}>
                            TechKshetra
                        </Typography> 
                    </Box>  
                    <Box>
                        <Button variant="contained" onClick={() => router.push('/aboutus')} >
                            Know More
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}