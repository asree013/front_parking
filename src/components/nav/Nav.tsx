'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import { validJwt } from '@/services/authen.service';
import { Users } from '@/interfaces/users.model';
import { findUserById } from '@/services/user.service';
import { enviroment } from '@/constants/enviroment';
import { toastAlert } from '@/services/alert.service';
import { useEffect } from 'react';

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const p = {} as Users
  const [profile, setProfile] = React.useState<Users>(p)
  const [user_id, setUser_id] = React.useState<string>('')
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  function handleCloseNavMenu() {
    setAnchorElNav(null);
  };

  function handleCloseUserMenu () {    
      setAnchorElUser(null);
  };

  function onLogOut() {
      localStorage.removeItem('authen')
      localStorage.removeItem('timeOut')
      console.log('delete');
  }


  async function feedProfile () {
    const authen = localStorage.getItem('authen')
    if(authen) {
      try {
        const jwt = JSON.parse(authen).jwt
        const validId = await validJwt(jwt.toString())
        const findUser = await findUserById(validId.id)
        setProfile(findUser)
        setUser_id(validId.id)
        console.log('profile: ' ,profile.image_user);
        
      } catch (error) {
        toastAlert('error', 'error')
        console.log(error);
        
      }
    }
  }

  useEffect(() => {
    feedProfile()
  }, [])

  return (
    <AppBar position="static" >
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                BaanRimRou
              </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link href={'/park'} prefetch={true} style={{textDecoration: 'none'}}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Park</Typography>
                  </MenuItem>
              </Link>
              <Link href={'/booking'} prefetch={true} style={{textDecoration: 'none'}}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Booking</Typography>
                  </MenuItem>
              </Link>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BaanRimRou
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link href={'/park'}>
                <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    Park
                </Button>
              </Link>
              <Link href={'/booking'}>
                <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    Booking
                </Button>
              </Link>
              <Link href={'/profile'}>
                <Button 
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    User
                </Button>
              </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={profile.image_user? enviroment.baseImage + profile.image_user: enviroment.noImage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link href={'/profile/'+ user_id} style={{textDecoration: 'none'}}>
                <MenuItem >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>
              <Link href={'/profile'} style={{textDecoration: 'none'}}>
                <MenuItem >
                  <Typography textAlign="center">UserAll</Typography>
                </MenuItem>
              </Link>
              <Link href={'/dashbord'} style={{textDecoration: 'none'}}>
                <MenuItem >
                  <Typography textAlign="center">Dashbord</Typography>
                </MenuItem>
              </Link>
              <Link href={'/'} style={{textDecoration: 'none'}}>
                <MenuItem  onClick={onLogOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}export default ResponsiveAppBar;