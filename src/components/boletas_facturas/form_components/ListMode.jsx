import { Grid, IconButton, Typography } from '@mui/material'
import { Delete as DeleteIcon} from '@mui/icons-material';

function ListMode({productos}) {
    
    return (
        <Grid container direction="column" gap={2} sx={{width:'100%'}}>
            {productos.map((producto, index) => (
                <Grid
                key={index}
                p={2}
                border="1px solid #ccc"
                borderRadius={2}
                boxShadow={1}
                width={'100%'}
                >
                    <Typography><strong>Tipo:</strong> {producto.nombre}</Typography>
                    <Typography><strong>Unidad:</strong> {producto.unidad}</Typography>
                    <Typography><strong>Cantidad:</strong> {producto.cantidad}</Typography>
                    <Typography><strong>Descripción:</strong> {producto.descripcion}</Typography>
                    <Typography><strong>Valor Unitario:</strong> S/ {producto.valorUnitario}</Typography>
                    <Typography><strong>IGV:</strong> S/ {producto.igv}</Typography>
                    <Typography><strong>Importe Venta:</strong> S/ {producto.importeVenta}</Typography>
                    <Grid mt={1} width={'100%'}>
                        <IconButton onClick={() => handleDeleteRow(producto.id)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}

export default ListMode
