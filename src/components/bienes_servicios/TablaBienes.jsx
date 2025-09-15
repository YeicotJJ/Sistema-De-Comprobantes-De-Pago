import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  TextField, IconButton, Button, Box, Fab, Select, MenuItem,
  Modal, Typography,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/db/firebase'; // Ajusta la ruta si es necesario

const unidadesDeMedida = [
  'Unidad', 'Kilogramo', 'Litro', 'Metro', 'Caja', 'Paquete', 'Docena', 'Servicio', 'Otro',
];

const productoVacio = {
  nombre: 'Bien',
  unidad: 'Unidad',
  cantidad: '1',
  descripcion: '',
  valorUnitario: '',
  igv: '',
  importeVenta: '',
};

function TablaProductos() {
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({ ...productoVacio });

  const productosRef = collection(db, 'productos');

  // 🧠 Calcular valores
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

  // 📥 Leer productos de Firestore
  const fetchProductos = async () => {
    try {
      const snapshot = await getDocs(productosRef);
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProductos(lista);
    } catch (err) {
      console.error('Error al cargar productos:', err);
    }
  };

  // 🗑️ Eliminar producto
  const handleDeleteRow = async (id) => {
    try {
      await deleteDoc(doc(db, 'productos', id));
      fetchProductos();
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  // 💾 Añadir producto a Firestore
 const handleGuardarProducto = async () => {
  console.log('firebase prueba', import.meta.env.VITE_apiKey);
  console.log("Guardando producto...", nuevoProducto); // ✅ VERIFICA
  const calculado = calcularValores(nuevoProducto);
  try {
    await addDoc(productosRef, calculado);
    setOpenModal(false);
    setNuevoProducto({ ...productoVacio });
    fetchProductos();
  } catch (err) {
    console.error('Error al guardar:', err);
  }
};


  useEffect(() => {
    fetchProductos();
  }, []);

  const totalImporteVenta = productos.reduce((acc, p) => acc + (parseFloat(p.importeVenta) || 0), 0);
  const totalIGV = productos.reduce((acc, p) => acc + (parseFloat(p.igv) || 0), 0);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6">Lista de Bienes / Servicios</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
        >
          Añadir Producto
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            {['Tipo', 'Unidad', 'Cantidad', 'Descripción', 'Valor Unitario', 'IGV', 'Importe Venta', 'Acciones'].map((text) => (
              <TableCell key={text}>{text}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto, index) => (
            <TableRow key={index}>
              <TableCell>{producto.nombre}</TableCell>
              <TableCell>{producto.unidad}</TableCell>
              <TableCell>{producto.cantidad}</TableCell>
              <TableCell>{producto.descripcion}</TableCell>
              <TableCell>{producto.valorUnitario}</TableCell>
              <TableCell>{producto.igv}</TableCell>
              <TableCell>{producto.importeVenta}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDeleteRow(producto.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Totales */}
      <Box mt={3}>
        <Typography><strong>Total IGV:</strong> S/ {totalIGV.toFixed(2)}</Typography>
        <Typography><strong>Total Venta:</strong> S/ {totalImporteVenta.toFixed(2)}</Typography>
      </Box>

      {/* Modal de nuevo producto */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
            value={nuevoProducto.nombre}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Bien">Bien</MenuItem>
            <MenuItem value="Servicio">Servicio</MenuItem>
          </Select>

          <Select
            fullWidth
            value={nuevoProducto.unidad}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, unidad: e.target.value })}
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
            value={nuevoProducto.cantidad}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Descripción"
            value={nuevoProducto.descripcion}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Valor Unitario (sin IGV)"
            type="number"
            value={nuevoProducto.valorUnitario}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, valorUnitario: e.target.value })}
            sx={{ mb: 2 }}
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleGuardarProducto}>Guardar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default TablaProductos;
