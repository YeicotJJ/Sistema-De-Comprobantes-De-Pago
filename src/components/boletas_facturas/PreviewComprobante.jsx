import React from 'react';
import { Grid, Typography } from '@mui/material';

function PreviewComprobante() {

  const text_min='11px' //px
  const text_med= '2vw' //vw
  const text_max='18px' //px

  return (
    <Grid container 
    sx={{
      width:'100%', 
      minHeight:'50vh', 
      backgroundColor:'var(--color-surface)', 
      color:'var(--color-on-surface)', 
      boxSizing:'border-box', 
      padding:'2em', 
      borderRadius: '8px',
      borderWidth:'4px',
      borderStyle:'outset',
      borderColor:'var(--color-primary)',
    }}>
      <Typography fontSize={`clamp(${text_min}, ${text_med}, ${text_max})`}>Hola</Typography>
    </Grid>
  );
}

export default PreviewComprobante;