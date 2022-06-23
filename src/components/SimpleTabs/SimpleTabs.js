import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const styles = (theme) => ({
  tab: {
    color: `${theme.palette.stroke}`,
    fontWeight: theme.typography.fontWeight.medium,
    textTransform: theme.typography.textTransform.capitalize,
  },
  activeTab: {
    color: `#44677b !important`,
    fontWeight: theme.typography.fontWeight.medium,
    textTransform: theme.typography.textTransform.capitalize,
  },
  selectedTab: {
    height: '1.5px',
    background: '#44677b',
  },
});

const useStyles = makeStyles(styles);

const SimpleTabs = (props) => {
  const { items, value, customClasses, handleChange } = props;
  const classes = useStyles();

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      classes={{
        indicator: customClasses?.indicator
          ? customClasses?.indicator
          : classes.selectedTab,
      }}
      aria-label='basic tabs example'
    >
      {items?.map((item, index) => (
        <Tab
          label={item?.label}
          value={index}
          key={`tab-${item}-${index}`}
          classes={{
            root: customClasses?.tab ? customClasses.tab : classes.tab,
            selected: customClasses?.activeTab
              ? customClasses?.activeTab
              : classes.activeTab,
          }}
        />
      ))}
    </Tabs>
  );
};

export default SimpleTabs;
