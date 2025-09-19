import React, { useState, useEffect } from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,TextField, IconButton, Button,Box,Fab, Stack, Select, MenuItem,Typography, Grid,
  Tooltip
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, CleaningServices as CleanIcon } from '@mui/icons-material';
import ListMode from './ListMode';

function TablaProductos() {

  const productoVacio = {
    nombre: 'Bien',
    unidad: 'Unidad',
    cantidad: '1',
    descripcion: '',
    valorUnitario: '',
    igv: '',
    importeVenta: '',
  };
  
  const unidadesDeMedida = [
  'Unidad',
  'Kilogramo',
  'Litro',
  'Metro',
  'Caja',
  'Paquete',
  'Docena',
  'Servicio',
  'Otro',
];

  //Font Size
const text_min = '1rem';      // 16px
const text_med = '2vw';       // preferido
const text_max = '1.4375rem'; // 23px

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
  
  const [productos, setProductos] = useState([productoVacio]);

  const handleChange = (index, field, value) => {
  const newProductos = [...productos];
  newProductos[index][field] = value;

  const cantidad = parseInt(newProductos[index].cantidad) || 1; // Cantidad mínima 1
  let valorUnitario = parseFloat(newProductos[index].valorUnitario) || 0;
  let igv = parseFloat(newProductos[index].igv) || 0;
  let importeVenta = parseFloat(newProductos[index].importeVenta) || 0;

  if (field === 'importeVenta') {
    importeVenta = parseFloat(value) || 0;

    if (cantidad === 0) {
      valorUnitario = 0;
      igv = 0;
    } else {
      // Se descompone importeVenta en base 82% valorUnitario + 18% IGV
        valorUnitario = importeVenta / cantidad
        igv = valorUnitario * 0.18
    }

    newProductos[index].valorUnitario = valorUnitario.toString();
    newProductos[index].igv = igv.toString();

  } else if (field === 'valorUnitario' || field === 'cantidad') {
      const cantidadNew = parseInt(newProductos[index].cantidad) < 1 ? 1 : parseInt(newProductos[index].cantidad);
      const valorUnitarioConIGV = parseFloat(newProductos[index].valorUnitario) || 0;
    
      const igv = +(valorUnitarioConIGV * 0.18 * cantidadNew).toFixed(2); // IGV total
      const importeVenta = +(valorUnitarioConIGV * cantidadNew).toFixed(2); // Total
    
      newProductos[index].cantidad = cantidadNew.toString();
      newProductos[index].igv = igv.toString();
      newProductos[index].importeVenta = importeVenta.toString();
    } else if (field === 'cantidad') {
  const cantidadNew = parseInt(value) < 1 ? 1 : parseInt(value);
  const valorUnitarioConIGV = parseFloat(newProductos[index].valorUnitario) || 0;

  const igv = +(valorUnitarioConIGV * 0.18 * cantidadNew).toFixed(2); // IGV total
  const importeVenta = +(valorUnitarioConIGV * cantidadNew).toFixed(2); // Total

  newProductos[index].cantidad = cantidadNew.toString();
  newProductos[index].igv = igv.toString();
  newProductos[index].importeVenta = importeVenta.toString();
}


  setProductos(newProductos);
};

  const handleAddRow = () => {
    setProductos([...productos, { ...productoVacio }]);
  };

  const handleDeleteRow = (index) => {
    const newProductos = productos.filter((_, i) => i !== index);
    setProductos(newProductos.length > 0 ? newProductos : [{ ...productoVacio }]);
  };

  const handleClearAll = () => {
    setProductos([{ ...productoVacio }]);
  };
  
  // Calcular los totales
  const totalImporteVenta = productos.reduce((acc, producto) => acc + (parseFloat(producto.importeVenta) || 0), 0);
  const totalIGV = productos.reduce((acc, producto) => acc + (parseFloat(producto.igv) || 0), 0);
  const operacionGravada = totalImporteVenta * 0.82;

  return (
    <div className="p-4 bg-background text-on-background min-h-screen">
      <Grid container justifyContent={{xs:'center', sm:'space-between'}} sx={{mb:2}}>
        <Typography component={'h2'} variant='h5' fontWeight={'bold'} fontSize={`clamp(${text_min}, ${text_med}, ${text_max})`} >Lista de Bienes / Servicios</Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="center"
          justifyContent={'center'}
        >
          <Button
            variant="contained"
            startIcon={<CleanIcon />}
            sx={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              '&:hover': {
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-on-secondary)',
              },
            }}
            onClick={handleClearAll}
          >
            Limpiar
          </Button>
        
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              '&:hover': {
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-on-secondary)',
              },
            }}
            onClick={handleAddRow}
          >
            Añadir De Catálogo
          </Button>
        </Stack>
      </Grid>

      <div className="overflow-x-auto">
        <div className="relative pb-12" style={{
            borderRadius: '10px',
            borderWidth:'4px',
            borderStyle:'outset',
            borderColor:'var(--color-primary)',
            overflow:'hidden',
            }}>
        {!esMovil && (
        <Table className="min-w-full" sx={{
            backgroundColor:'var(--color-surface)',
            color:'(var--color-on-surface)',
        }}>
          <TableHead className="bg-surface">
            <TableRow>
              {[
                'Bien / Servicio', 'Unidad Medida', 'Cantidad',
                'Descripción', 'Valor Unitario (IGV)', 'IGV', 'Importe de Venta', 'Acciones'
              ].map((header) => (
                <TableCell key={header} className="text-on-surface font-bold text-responsive">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {productos.map((producto, index) => (
              <TableRow key={index} className="bg-surface text-responsive">
                <TableCell className=' text-responsive'>
                    <Select
                      variant="standard"
                      value={producto.nombre}
                      onChange={(e) => handleChange(index, 'nombre', e.target.value)}
                      displayEmpty
                      className='text-responsive'
                      inputProps={{ className: 'text-on-surface' }}
                      fullWidth
                    >
                      <MenuItem value="Bien">Bien</MenuItem>
                      <MenuItem value="Servicio">Servicio</MenuItem>
                    </Select>
                </TableCell>
                <TableCell>
                  <Select
                      variant="standard"
                      value={producto.unidad}
                      onChange={(e) => handleChange(index, 'unidad', e.target.value)}
                      displayEmpty
                      className='text-responsive'
                      inputProps={{ className: 'text-on-surface' }}
                      fullWidth
                    >
                      {unidadesDeMedida.map((unidad) => (
                        <MenuItem key={unidad} value={unidad}>
                          {unidad}
                        </MenuItem>
                      ))}
                    </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    type="number"
                    className='text-responsive'
                    value={producto.cantidad}
                    inputProps={{ min: 1 }}
                    onChange={(e) => {
                        let val = e.target.value;
                        if (val === '') val = '1';  // evita vacio
                        if (parseInt(val) < 1) val = '1'; // no menos que 1
                        handleChange(index, 'cantidad', val);
                    }}
                    InputProps={{ className: 'text-on-surface' }}
                    />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    className='text-responsive'
                    value={producto.descripcion}
                    onChange={(e) => handleChange(index, 'descripcion', e.target.value)}
                    InputProps={{ className: 'text-on-surface' }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    className='text-responsive'
                    type="number"
                    value={producto.valorUnitario}
                    onChange={(e) => 
                        {
                        let val = e.target.value;
                        if (parseInt(val) < 0.000001) val = '0.000001'; // no menos que 1
                        handleChange(index, 'valorUnitario', val)}}
                    InputProps={{ className: 'text-on-surface' }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    type="number"
                    value={producto.igv}
                    InputProps={{
                      readOnly: true,
                      className: 'text-on-surface',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    type="number"
                    value={producto.importeVenta}
                    onChange={(e) => 
                        {
                        let val = e.target.value;
                        if (parseInt(val) < 0.000001) val = '0.000001'; // no menos que 1
                        handleChange(index, 'importeVenta', val)}}
                    InputProps={{
                      className: 'text-on-surface',
                    }}
                  />
                </TableCell>
                <TableCell className="flex gap-2 items-center">
                  <IconButton onClick={() => handleDeleteRow(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {/* Filas con los totales calculados */}
      <TableRow>
        <TableCell colSpan={6}></TableCell>
        <TableCell style={{ textAlign: 'right', fontWeight: 'bold' }}>Operación Gravada</TableCell>
        <TableCell style={{ textAlign: 'right' }}>{operacionGravada.toFixed(2)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6}></TableCell>
        <TableCell style={{ textAlign: 'right', fontWeight: 'bold' }}>IGV</TableCell>
        <TableCell style={{ textAlign: 'right' }}>{totalIGV.toFixed(2)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6}></TableCell>
        <TableCell style={{ textAlign: 'right', fontWeight: 'bold' }}>Importe Total</TableCell>
        <TableCell style={{ textAlign: 'right' }}>{totalImporteVenta.toFixed(2)}</TableCell>
      </TableRow>
          </TableBody>
        </Table>
        )}
        { esMovil &&(
          <ListMode productos={productos} handleDeleteRow={handleDeleteRow}/>
        )}
        
        </div>
      </div>
      {/* Botón flotante sobre el borde inferior de la tabla */}
        <Box>
            <Tooltip title='Añadir Producto Manualmente' placement='top' >
              <Fab
                onClick={handleAddRow}
                className="shadow-md"
                sx={{
                  position:'fixed',
                  left:!esMovil?150:'50%',
                  transform: "translateX(-50%)",
                  bottom:20,
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                  '&:hover': {
                      backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-on-secondary)', // blanco o el que hayas definido
                  },
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
        </Box>
    </div>
  );
}

export default TablaProductos;
