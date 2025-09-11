import React from 'react';
import { Grid, Typography } from '@mui/material';
import FirstLine from './form_components/FirstLine';
import SecondLine from './form_components/SecondLine';

function GenerateComprobante() {

    const text_min='11px' //px
    const text_med= '2vw' //vw
    const text_max='16px' //px

    return (
        <Grid container direction={'column'} spacing={{ xs:1, sm:2, md:3}} width={'100%'}>
            
            {/* ID, FECHA EMISION Y MONEDA */}
            <FirstLine/>
            
            {/* RUC o DNI, NOMBRE Y DIRECCIÓN */}
            <SecondLine/>
            
        </Grid>
    );
}

export default GenerateComprobante;
