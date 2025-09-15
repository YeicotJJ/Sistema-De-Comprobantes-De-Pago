import React from 'react'
import TablaBienes from '@/components/bienes_servicios/TablaBienes'
import { Box, Grid } from '@mui/material'

function Bienes() {
  return (
    <div>
        <Box justifyContent={'center'}>
          <Grid container width={{sm:'80%',md:'60%'}} justifySelf={'center'}>
            <TablaBienes/>
          </Grid>
        </Box>
    </div>
  )
}

export default Bienes
