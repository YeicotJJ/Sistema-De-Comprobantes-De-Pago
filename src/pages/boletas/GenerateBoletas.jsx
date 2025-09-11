import { Grid, Typography,Box } from '@mui/material'
import React from 'react'
import GenerateComprobante from '../../components/boletas_facturas/GenerateComprobante'
import PreviewComprobante from '../../components/boletas_facturas/PreviewComprobante'

function GenerateBoletas() {
  return (
    < >
      <Grid container width={'100vw'} justifyContent={'center'} mb={3} mt={1}>
        <Typography variant='h5' component={'h1'}>Generar Boleta de Venta</Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        width={'100vw'}
        sx={{ px: '5vw', mb: 2 }}
        spacing={{ xs: 2, md: 3 }}
      >
        <Grid item size={{ xs:8 , sm: 8, md: 7 }}>
          <GenerateComprobante />
        </Grid>
        <Grid item size={{ xs:4, sm: 4, md: 3 }}>
            <PreviewComprobante />
        </Grid>

      </Grid>
    </>
  )
}

export default GenerateBoletas
