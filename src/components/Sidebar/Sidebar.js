import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import Logo from '../../assets/svg/logo.svg';
import DashboardIcon from '../../assets/svg/dashboardIcon.svg';
import ProfileAvatar from '../ProfileAvatar';
import { IconButton, Tooltip } from '@mui/material';
import { getFormattedName } from '../../utils';
const drawerWidth = 220;

const styles = (theme) => ({
  drawerRoot: {
    minHeight: '100vh',
  },
  drawerPaper: {
    color: theme.palette.textWhite,
    position: theme.content.positions.fixed,
    height: '100%',
    overflowX: theme.content.overflow.hidden,
    backgroundColor: theme.palette.mainHeadingColor,
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: theme.content.overflow.hidden,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    position: theme.content.positions.fixed,
    top: 0,
    width: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  root: {
    '& .MuiListItem-root:hover': {
      backgroundColor: theme.palette.bgHighlight,
    },
  },
  dshbListItemIcon: {
    margin: '16px 0 16px 8px',
    minWidth: '46px',
  },
  listIcon: {
    color: 'inherit',
  },
  link: {
    textDecoration: 'none',
    color: 'rgb(143, 173, 206)',
  },
  logoContainer: {
    marginBottom: 50,
  },
  impact: {
    color: '#59afe8',
    position: theme.content.positions.relative,
    top: '4px',
    fontWeight: theme.typography.fontWeight.semiBold,
    fontSize: '1.5rem',
    letterSpacing: '0.5px',
  },
  analytics: {
    display: theme.content.display.block,
    color: '#646ce7',
    position: theme.content.positions.relative,
    bottom: '4px',
    fontSize: '0.83rem',
    letterSpacing: '2px',
  },
  logo: {
    width: '2rem',
    height: '2rem',
    marginLeft: '4px',
  },
  copyrightIconContainer: {
    position: theme.content.positions.absolute,
    bottom: '10px',
  },
  copyrightIcon: {
    color: 'inherit',
    flex: 1,
  },
  copyright: {
    whiteSpace: 'normal',
    fontSize: '0.8rem',
    textAlign: theme.typography.textAlign.center,
  },
});

const useStyles = makeStyles(styles);

const Sidebar = ({ open, handleToggleDrawer }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant='permanent'
      classes={{
        root: classes.drawerRoot,
        paper: `${classes.drawerPaper} ${
          open ? '' : `${classes.drawerPaperClose}`
        }`,
      }}
      open={open}
    >
      <List
        classes={{
          root: classes.root,
        }}
      >
        <ListItem button onClick={handleToggleDrawer}>
          <ListItemIcon
            classes={{
              root: classes.listIcon,
            }}
          >
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              disableRipple
              disableFocusRipple
            >
              {!open && (
                <KeyboardDoubleArrowRightIcon color='white' size='18' />
              )}
              {open && <KeyboardDoubleArrowLeftIcon color='white' size='18' />}
            </IconButton>
          </ListItemIcon>
        </ListItem>

        <ListItem className={classes.logoContainer}>
          <ListItemIcon>
            <img src={Logo} alt='company-logo' className={classes.logo} />
          </ListItemIcon>
          <ListItemText
            primary={
              <span>
                <span className={classes.impact}>IMPACT</span>
                <span className={classes.analytics}>ANALYTICS</span>
              </span>
            }
          />
        </ListItem>
        <Tooltip
          arrow
          title={localStorage.getItem('name')?.toUpperCase() || 'User'}
        >
          <ListItem>
            <ListItemIcon>
              <ProfileAvatar
                name={localStorage.getItem('name')?.toUpperCase() || 'User'}
                height={40}
                width={40}
              />
            </ListItemIcon>
            <ListItemText primary={getFormattedName()} />
          </ListItem>
        </Tooltip>
        <Link
          to={`/?code=${window.location.search.slice(1).split('=')[1]}`}
          className={classes.link}
        >
          <Tooltip arrow title={'Dashboard'}>
            <ListItem button>
              <ListItemIcon
                classes={{
                  root: classes.dshbListItemIcon,
                }}
              >
                <img
                  src={DashboardIcon}
                  alt='Dashboard Logo'
                  style={{ height: 24 }}
                />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
          </Tooltip>
        </Link>
      </List>
    </Drawer>
  );
};

export default Sidebar;
