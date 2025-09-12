import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import SecondLine from './form_components/SecondLine';
import { useEffect } from 'react';
import TablaProductos from './form_components/TablaProductos';

function GenerateComprobante() {

    return (
        <Grid container direction={'column'} spacing={{ xs:1, sm:2, md:3}} width={'100%'}>
            
            {/* RUC o DNI, NOMBRE Y DIRECCIÓN */}
            <SecondLine/>
            
            {/* RUC o DNI, NOMBRE Y DIRECCIÓN */}
            <TablaProductos/>
            
        </Grid>
    );
}

export default GenerateComprobante;
