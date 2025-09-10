// Layout.jsx
import * as React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Grid,
  Menu,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';
import ConstructionIcon from '@mui/icons-material/Construction';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { useAppTheme } from '@/theme/ThemeProvider';
import { Switch, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useAppTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const nombreEmpresa = "Mi Empresa";

  // Estado para el menú del avatar
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <div className="h-full w-full">
      <Toolbar className="flex items-center justify-between px-4">
        <Typography variant="h6" noWrap>
          Mi Menú
        </Typography>
        <IconButton onClick={toggleDrawer(false)} className="text-gray-700">
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List className="mt-2">
        {[
          {
            text: 'Inicio',
            icon: <HomeIcon />,
            onclick: () => {
              navigate('/');
            }
          },
          { 
            text: 'Generar Boleta de Venta',
            icon: <ArticleIcon />,
            onclick: () => {
              navigate('/boletas');
            }
            },
          { 
            text: 'Generar Factura',
            icon: <DescriptionIcon />,
            onclick: () => {
              navigate('/facturas');
            }
          },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={item.onclick}
            className="transition-all duration-300 hover:bg-gray-100 hover:cursor-pointer px-6"
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar className="justify-between" sx={{ height: '30px' }}>
          {/* Botón hamburguesa */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h7" noWrap component="div" fontWeight="bold">
            Sistema de Comprobantes de Pago
          </Typography>

          {/* Avatar y nombre de empresa */}
          <Grid className="flex gap-3 items-center">
            <IconButton onClick={handleAvatarClick}>
              <Avatar {...stringAvatar(nombreEmpresa, mode)} />
            </IconButton>
          </Grid>

          {/* Menú del avatar */}
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Grid>
              <Typography variant="h8" noWrap component="div" justifySelf={'center'}>
                {nombreEmpresa}
              </Typography>
              <Divider/>
            </Grid>
            <Grid className="flex gap-2 items-center justify-center ml-[12px]">
              <Typography>{mode === 'dark' ? 'Modo Oscuro' : 'Modo Claro'} </Typography>
              <Tooltip title={mode === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}>
                <Switch
                  checked={mode === 'dark'}
                  onChange={toggleTheme}
                  color="default"
                  icon={<LightModeIcon fontSize="small" />}
                  checkedIcon={<DarkModeIcon fontSize="small" sx={{color:'white'}}/>}
                  inputProps={{ 'aria-label': 'toggle theme mode' }}
                />
              </Tooltip>
            
            </Grid>
            <MenuItem onClick={() => navigate('/configuration')} className='gap-3'> <ConstructionIcon/> Preferencias </MenuItem>
            <MenuItem onClick={handleMenuClose} className='gap-3' > <ExitToAppIcon/> Cerrar sesión </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // espacio para el AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

// ---------------------- Helpers ----------------------

function stringToColor(string, mode = 'light') {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;

    if (mode === 'dark') {
      // Aquí colores claros para tema oscuro
      value = Math.floor((value / 255) * 55) + 200;
    } else {
      // Aquí colores oscuros para tema claro
      value = Math.floor((value / 255) * 70) + 50;
    }

    color += value.toString(16).padStart(2, '0');
  }

  return color;
}

function stringAvatar(name, mode = 'light') {
  if (typeof name !== 'string' || !name.trim()) {
    return {
      sx: { bgcolor: '#ccc' },
      children: '?',
    };
  }

  const nameParts = name.trim().split(' ');
  let initials = nameParts[0][0];
  if (nameParts.length > 1) {
    initials += nameParts[1][0];
  }

  return {
    sx: {
      bgcolor: stringToColor(name, mode),
    },
    children: initials.toUpperCase(),
  };
}
