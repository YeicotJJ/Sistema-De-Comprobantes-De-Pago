import { Grid, Typography } from '@mui/material'
import GenerateComprobante from '../../components/boletas_facturas/GenerateComprobante'
import PreviewComprobante from '../../components/boletas_facturas/PreviewComprobante'
import { useEffect, useState } from 'react'

function GenerateBoletas() {
  
  //Acomodar si es móvil y cambios de pantalla
    const [esMovil, setEsMovil] = useState(window.innerWidth <= 768);
  
    useEffect(() => {
      // Función que actualiza el estado según el tamaño de la ventana
      const handleResize = () => {
        setEsMovil(window.innerWidth <= 768);
      };
  
      // Añadir el listener para el evento de resize
      window.addEventListener('resize', handleResize);
      // Limpiar el listener cuando el componente se desmonte
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); // Solo se ejecuta una vez, al montar el componente

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
        {!esMovil&&(
          <Grid item size={{ xs:4, sm: 4, md: 3 }}>
            <PreviewComprobante />
          </Grid>
        )}

      </Grid>
    </>
  )
}

export default GenerateBoletas
