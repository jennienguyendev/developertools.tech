import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import GitHub from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import navItems from '../data/nav';
import useWindowSize from '../hooks/useWindowSize';
import logo from '../public/logo.svg';
import dlfordLogo from '../public/logo-full.svg';
import Link from './Link';

const drawerWidth = 240;

function Logo() {
  return (
    <Button
      href='/'
      component={Link}
      height={44}
      sx={{ mr: 'auto', ml: 0 }}
    >
      <Image
        src={logo}
        width={36}
        height={36}
        alt=''
        aria-hidden='true'
      />
      <Typography
        ml={1}
        color='#fff'
        textTransform='none'
      >
        Dev Tools
      </Typography>
    </Button>
  );
}

export default function Layout({
  title = 'Developer Utilities',
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { width } = useWindowSize();
  const { asPath } = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {[...navItems]
        .sort((a, b) => {
          if (a.title === 'Home') {
            return -1;
          }
          if (b.title === 'Home') {
            return 1;
          }
          return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        })
        .map(({ title: itemTitle, href, Icon }) => (
          <ListItem
            key={href}
            disablePadding
          >
            <ListItemButton
              href={href}
              component={Link}
              disabled={asPath === href}
            >
              <ListItemIcon>{!!Icon && <Icon />}</ListItemIcon>
              <ListItemText primary={itemTitle} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );

  return (
    <Box
      height='100%'
      display='flex'
      flexDirection='column'
    >
      <Head>
        <title>{title}</title>
        <meta
          name='description'
          content='Developer utilities by DL Ford'
        />
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width'
        />
      </Head>

      <CssBaseline />
      <AppBar
        position={(width || 0) > 600 ? 'relative' : 'fixed'}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mr: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Logo />
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='Tools'
      >
        <Drawer
          variant={(width || 0) < 600 ? 'temporary' : 'permanent'}
          anchor='right'
          open={(width || 0) < 600 ? mobileOpen : true}
          onClose={(width || 0) < 600 ? handleDrawerToggle : undefined}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              sm: {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{
          px: 3,
          py: 6,
          pt: {
            xs: 12,
            sm: 6,
          },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
      <Box
        position='relative'
        component='footer'
        mt='auto'
        mb={0}
        width={{ xs: '100%', sm: `calc(100% - ${drawerWidth}px)` }}
        display='flex'
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
        pt={4}
        sx={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09));',
        }}
      >
        <Box
          display='flex'
          justifyContent='center'
          flexDirection='column'
          alignItems='center'
          pb={4}
          width='100%'
        >
          <Typography
            variant='h6'
            mb={3}
            fontWeight='normal'
          >
            Sponsors
          </Typography>
          <Button
            variant='contained'
            startIcon={<FavoriteIcon />}
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/sponsors/dlford'
          >
            Sponsor
          </Button>
        </Box>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='100%'
          borderTop='1px solid #444'
        >
          <Box
            px={2}
            py={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Typography
              display='flex'
              justifyContent='center'
              alignItems='center'
              gap='0.125rem'
              fontSize='0.75rem'
              lineHeight={1}
            >
              CopyLeft
              <a
                href='https://www.dlford.io'
                rel='noopener noreferrer'
                target='_blank'
              >
                <Button sx={{ px: 0, mb: 0.5 }}>
                  <Image
                    src={dlfordLogo}
                    width={90}
                    height={34}
                    alt='DL Ford'
                  />
                </Button>
              </a>
              2022
              <IconButton
                href='https://github.com/developertools-tech/developertools.tech'
                target='_blank'
                rel='noopener noreferrer'
              >
                <GitHub />
              </IconButton>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
