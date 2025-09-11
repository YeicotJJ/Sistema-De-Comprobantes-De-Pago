import { CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { idChange, nombreChange, direccionChange } from '@/store/slices/form_second_line'

function SecondLine() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.second_line.id);
  const nombre = useSelector((state) => state.second_line.nombre);
  const direccion = useSelector((state) => state.second_line.direccion);

  const text_min = '11px';
  const text_med = '2vw';
  const text_max = '16px';

  return (
    <Grid
      container
      direction={'column'}
      spacing={1}
      sx={{
        width: '100%',
        minHeight: '10vh',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-on-surface)',
        boxSizing: 'border-box',
        padding: '1em',
        borderRadius: '10px',
        boxShadow: 'inset 0 3px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
        <Typography fontSize={`clamp(${text_min}, ${text_med}, ${text_max})`} textAlign={'start'} fontWeight={'bold'}>
            Datos del Cliente:
        </Typography>
        <Grid container direction={'row'} alignItems="center" spacing={1}>
        <Typography fontSize={`clamp(${text_min}, ${text_med}, ${text_max})`} textAlign={'start'}>
            DNI:
        </Typography>
        <TextField
            variant='standard'
            placeholder='12345678'
            value={id || ''}
            onChange={(e) => dispatch(idChange(e.target.value))}
            size="small"
            sx={{
            '& .MuiInputBase-input': {
                fontSize: `clamp(${text_min}, ${text_med}, ${text_max})`,
            },
            }}
        />
      </Grid>

      <Grid container direction={'row'} alignItems="center" spacing={1}>
        <Typography fontSize={`clamp(${text_min}, ${text_med}, ${text_max})`} textAlign={'start'}>
          NOMBRE:
        </Typography>
        <TextField
            variant="standard"
            placeholder="Nombre del Cliente"
            value={nombre || ''}
            onChange={(e) => dispatch(nombreChange(e.target.value))}
            size="small"
            sx={{
            '& .MuiInputBase-input': {
                fontSize: `clamp(${text_min}, ${text_med}, ${text_max})`,
            },
            }}
        />
      </Grid>

      <Grid container direction={'row'} alignItems="center" spacing={1}>
        <Typography fontSize={`clamp(${text_min}, ${text_med}, ${text_max})`} textAlign={'start'}>
          DIRECCIÓN:
        </Typography>
        <TextField
            variant='standard'
            placeholder='Dirección del Cliente'
            value={direccion || ''}
            onChange={(e) => dispatch(direccionChange(e.target.value))}
            size="small"
            sx={{
            '& .MuiInputBase-input': {
                fontSize: `clamp(${text_min}, ${text_med}, ${text_max})`,
            },
            }}
        />
      </Grid>
    </Grid>
  );
}

export default SecondLine;
