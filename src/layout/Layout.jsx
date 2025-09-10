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
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';

const drawerWidth = 240;

const Layout = ({ children }) => {
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
          { text: 'Inicio', icon: <HomeIcon />, onclick:{} },
          { text: 'Generar Boleta de Venta', icon: <ArticleIcon />, onclick:{} },
          { text: 'Generar Factura', icon: <DescriptionIcon />, onclick:{} },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={item.onclick}
            className="transition-all duration-300 hover:bg-gray-100"
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
              <Avatar {...stringAvatar(nombreEmpresa)} />
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
            <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>
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

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
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
      bgcolor: stringToColor(name),
    },
    children: initials.toUpperCase(),
  };
}
