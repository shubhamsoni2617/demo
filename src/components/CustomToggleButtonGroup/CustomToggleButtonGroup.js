import React from 'react';
import { makeStyles } from '@mui/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const styles = (theme) => ({
  tab: {
    border: '4px solid #dfeaf5',
  },
});

const useStyles = makeStyles(styles);

const CustomToggleButtonGroup = (props) => {
  const { value, children, handleSwitch, customClasses, borderRadius } = props;
  const classes = useStyles();

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleSwitch}
      aria-label='text alignment'
      classes={{
        root: customClasses?.tab ? customClasses.tab : classes.tab,
      }}
      style={{ borderRadius }}
    >
      {children}
    </ToggleButtonGroup>
  );
};

export default CustomToggleButtonGroup;
