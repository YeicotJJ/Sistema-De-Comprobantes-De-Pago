import { Grid, Typography } from '@mui/material'
import React from 'react'
import dayjs from 'dayjs';


function FirstLine() {
    
    const hoy = dayjs().format('DD/MM/YYYY');
    const text_min='11px' //px
    const text_med= '2vw' //vw
    const text_max='16px' //px

    return (
        <Grid container direction={'column'} spacing={1} sx={{width:'100%', minHeight:'8vh', backgroundColor:'var(--color-surface)', color:'var(--color-on-surface)', boxSizing:'border-box', padding:'1em', borderRadius:'10px', boxShadow:'inset 0 3px 8px rgba(0, 0, 0, 0.2)'}}>
        <Typography fontSize={`clamp(${text_min}, ${text_med}, ${text_max})`} textAlign={'start'} fontWeight={'bold'}>
                    Datos del Comprobante de Pago:
                </Typography>
            <Grid className='left'>
                <Typography fontSize={`clamp(${text_min}, ${text_med}, ${text_max})`} textAlign={'start'}>ID:</Typography>
                <Typography fontSize={`clamp(${text_min}, ${text_med}, ${text_max})`} textAlign={'start'} >Fecha de Emisión : {hoy}</Typography>
                <Typography fontSize={`clamp(${text_min}, ${text_med}, ${text_max})`} textAlign={'start'}>Tipo de Moneda : SOLES</Typography>
            </Grid>
        </Grid>
    )        
}

export default FirstLine
