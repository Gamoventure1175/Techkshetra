'use client'

import { Box, Typography, Stack, Container, Button } from "@mui/material";
import {useRouter} from "next/navigation";

export default function Header() {

    const router = useRouter();

    return(
        <Box 
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
                        <Typography variant='h1' fontSize={{xs: 58, sm: 72, md: 102 }}>
                            TechKshetra
                        </Typography> 
                    </Box>  
                    <Box>
                        <Typography variant='subtitle1' fontSize={{xs:16, sm:24, md: 32}}>
                        B. K. Birla College of Arts, Science & Commerce
                        </Typography>
                    </Box>
                    <Box>
                        <Button variant="contained" onClick={() => router.push('/highlights')} >
                            Know More
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}