import React from 'react'
import TablaBienes from '@/components/bienes_servicios/TablaBienes'
import { Grid } from '@mui/material'

function Bienes() {
  return (
    <Grid container width={'100vw'} justifyContent={'center'} justifySelf={'center'} >
      <TablaBienes/>
    </Grid>
  )
}

export default Bienes
