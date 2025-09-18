// components/ModalProducto.jsx
import React from 'react';
import {
  Modal, Box, Typography, Select, MenuItem,
  TextField, Button
} from '@mui/material';

import { useState } from 'react';

const unidadesDeMedida = [
    'Unidad', 'Kilogramo', 'Litro', 'Metro', 'Caja', 'Paquete', 'Docena', 'Servicio', 'Otro',
];

const ModalProducto = ({ open, onClose}) => {

    const productoVacio = {
        nombre: 'Bien',
        unidad: 'Unidad',
        cantidad: '1',
        descripcion: '',
        valorUnitario: '',
        igv: '',
        importeVenta: '',
    };

    const [producto, setProducto] = useState({ ...productoVacio });
    // Guardar producto nuevo
    const handleGuardarProducto = async () => {
        const calculado = calcularValores(producto);
        try {
            await addDoc(productosRef, calculado);
            setOpenModal(false);
            setProducto({ ...productoVacio });
            fetchProductos();
        } catch (err) {
            console.error('Error al guardar:', err);
        }
        };

    // Calcular IGV e importe de venta
    const calcularValores = (producto) => {
      const cantidad = parseInt(producto.cantidad) || 1;
      const valorUnitario = parseFloat(producto.valorUnitario) || 0;
      const igv = +(valorUnitario * 0.18 * cantidad).toFixed(2);
      const importeVenta = +(valorUnitario * cantidad).toFixed(2);
  
      return {
        ...producto,
        cantidad: cantidad.toString(),
        igv: igv.toString(),
        importeVenta: importeVenta.toString(),
      };
    };
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: '90%',
          maxWidth: 500,
        }}
      >
        <Typography variant="h6" gutterBottom>Nuevo Producto</Typography>

        <Select
          fullWidth
          value={producto.nombre}
          onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
          sx={{ mb: 2 }}
        >
          <MenuItem value="Bien">Bien</MenuItem>
          <MenuItem value="Servicio">Servicio</MenuItem>
        </Select>

        <Select
          fullWidth
          value={producto.unidad}
          onChange={(e) => setProducto({ ...producto, unidad: e.target.value })}
          sx={{ mb: 2 }}
        >
          {unidadesDeMedida.map((unidad) => (
            <MenuItem key={unidad} value={unidad}>{unidad}</MenuItem>
          ))}
        </Select>

        <TextField
          fullWidth
          label="Cantidad"
          type="number"
          value={producto.cantidad}
          onChange={(e) => setProducto({ ...producto, cantidad: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Descripción"
          value={producto.descripcion}
          onChange={(e) => setProducto({ ...producto, descripcion: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Valor Unitario (sin IGV)"
          type="number"
          value={producto.valorUnitario}
          onChange={(e) => setProducto({ ...producto, valorUnitario: e.target.value })}
          sx={{ mb: 2 }}
        />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleGuardarProducto}>Guardar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalProducto;
