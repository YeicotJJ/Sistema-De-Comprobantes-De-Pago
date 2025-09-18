import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
   IconButton, Button, Box,Typography,Switch,Grid,Tooltip,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/db/firebase'; // Ajusta la ruta si es necesario
import ModalProducto from './ModalProductos';
import ListMode from './ListMode';

function TablaProductos() {
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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

  // Referencia a la subcolección correcta
  const productosRef = collection(db, 'empresa', 'productos', 'productos');

  // Obtener productos desde Firestore
  const fetchProductos = async () => {
    try {
      const snapshot = await getDocs(productosRef);
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProductos(lista);
    } catch (err) {
      console.error('Error al cargar productos:', err);
    }
  };

  // Eliminar producto
  const handleDeleteRow = async (id) => {
    try {
      await deleteDoc(doc(db, 'empresa', 'productos', 'productos', id));
      fetchProductos();
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  //Font Size
  const text_min='16px' //px
  const text_med= '5vw' //vw
  const text_max='23px' //px

  return (
    <Grid container width={'80vw'}>
      <Grid container direction={esMovil?'column':'row'} justifyContent={esMovil?'center':'space-between'} alignItems={'center'} sx={{mb:4, mt:3}} width={'100%'} padding={{xs:2,sm:0,md:2}}>
        <Typography fontSize={`clamp(${text_min}, ${text_med}, ${text_max})`} fontWeight={'bold'}>Lista de Bienes / Servicios</Typography>
        <Grid container size={5}>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{fontSize:`clamp(10px, 1vw, 18px)`}}/>}
            onClick={() => setOpenModal(true)}
            sx={{ 
              width: '100%',
              fontSize:`clamp(10px, 1vw, 18px)`,
            }}
          >
            {esMovil?'Producto' : 'Añadir Producto'}
          </Button>
        </Grid>
        
      </Grid>

    <Grid container width={'100%'}>
      {!esMovil && (
        <Table sx={{width:'100%'}}>
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
      )}
      
      {esMovil && (
        <ListMode productos={productos}/>
      )}
    </Grid>

      {/* Modal nuevo producto */}
      <ModalProducto
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Grid>
  );
}

export default TablaProductos;
