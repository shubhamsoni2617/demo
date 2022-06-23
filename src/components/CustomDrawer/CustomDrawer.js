import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';

const CustomDrawer = (props) => {
  const { children, drawerStyles, anchor, open, toggleDrawer } = props;

  return (
    <div>
      <Drawer anchor={anchor} open={open} onClose={toggleDrawer}>
        {children}
      </Drawer>
    </div>
  );
};

CustomDrawer.propTypes = {
  children: PropTypes.node,
  cardStyles: PropTypes.string,
};

export default CustomDrawer;
