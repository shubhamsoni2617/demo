import React, { Fragment, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    padding: theme.spacing(2),
    overflowX: theme.content.overflow.hidden,
  },
});

const useStyles = makeStyles(styles);

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Sidebar open={open} handleToggleDrawer={handleToggleDrawer} />
        <main
          className={classes.content}
          style={{ paddingLeft: open ? 236 : 88 }}
        >
          <Header />
          {children}
        </main>
      </div>
    </Fragment>
  );
};

export default MainLayout;
