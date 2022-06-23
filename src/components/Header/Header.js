import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
// import CustomCard from 'components/CustomCard';

const styles = (theme) => ({
  appBar: {
    color: theme.palette.mainHeadingColor,
    backgroundColor: theme.palette.bgPrimary,
    boxShadow: 'none',
    position: theme.content.positions.sticky,
  },
  notificationCard: {
    ...theme.content.card,
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    width: 44,
    height: 44,
    marginRight: theme.spacing(2),
    padding: '12px 14px',
    overflow: theme.content.overflow.visible,
    position: theme.content.positions.relative,
  },
  notificationBadge: {
    ...theme.typography.fontSizes.badgeText,
    color: theme.palette.textWhite,
    height: theme.spacing(2),
    width: 30,
    fontWeight: theme.typography.fontWeight.medium,
    position: theme.content.positions.absolute,
    background: theme.palette.bgBadge,
    top: -8,
    right: -8,
  },
  profileText: {
    ...theme.typography.fontSizes.normalText,
    color: theme.palette.textDark,
    fontWeight: theme.typography.fontWeight.medium,
    marginLeft: 12,
  },
  title: {
    ...theme.typography.fontSizes.mainHeaderText,
    fontWeight: theme.typography.fontWeight.semiBold,
    flexGrow: 1,
  },
});

const useStyles = makeStyles(styles);

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar disableGutters={true} classes={{ root: classes.toolbarRoot }}>
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          className={classes.title}
        >
          PriceSmart
        </Typography>
        {/* <CustomCard cardStyles={classes.notificationCard}>
          <IconButton color='inherit' disableRipple>
            <Badge
              badgeContent={20}
              max={99}
              classes={{ badge: classes.notificationBadge }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </CustomCard> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
