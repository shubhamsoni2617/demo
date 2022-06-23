import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { ToggleButton } from '@mui/material';
import CustomButton from '../components/CustomButton';
import { Box } from '@mui/system';
import CustomToggleButtonGroup from '../components/CustomToggleButtonGroup';
import ProductGroupPerformance from './ProductGroupPerformance';
import ProductPromo from './ProductPromo';

const styles = (theme) => ({
  container: {
    position: theme.content.positions.relative,
    height: '100%',
    width: 908,
    overflow: theme.content.overflow.hidden,
  },
  header: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    padding: 16,
  },
  switchTab: {
    border: `1px solid ${theme.palette.strokeTab}`,
    borderRadius: '4px !important',
  },
  toggleRoot: {
    padding: '6px 16px',
    borderRight: `1px solid ${theme.palette.strokeTab} !important`,
    background: theme.palette.textWhite,
    color: `${theme.palette.textDark}`,
    border: 'none',

    '& .MuiTouchRipple-root': {
      borderRight: `1px solid ${theme.palette.strokeTab} !important`,
    },
  },
  toggleRootLast: {
    padding: '6px 16px',
    background: theme.palette.textWhite,
    color: `${theme.palette.textDark}`,
    border: 'none',
  },
  toggleActive: {
    padding: '6px 16px',
    margin: -1,
    background: `${theme.palette.bgSwitch} !important`,
    color: `${theme.palette.textWhite} !important`,
    border: 'none',
  },
  switchTabText: {
    color: 'inherit',
    textTransform: 'capitalize',
    margin: 0,
    minWidth: 160,
  },
  body: {
    height: '80%',
    overflowY: theme.content.overflow.scroll,
  },
  footer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    position: theme.content.positions.absolute,
    width: '100%',
    background: theme.palette.textWhite,
    bottom: 0,
    boxShadow: '0px -3px 6px #00000029',
    padding: 32,
  },
});

const useStyles = makeStyles(styles);

const ProductGroupDetailsDrawer = ({ data, state, toggleDrawer }) => {
  const classes = useStyles();

  const [activeSwitchTabHeader, setActiveSwitchTabHeader] =
    useState('promo_performance');

  const handleSwitchHeader = (_, newAlignment) => {
    setActiveSwitchTabHeader(newAlignment);
  };

  return (
    <div className={classes.container}>
      <Box
        className={classes.header}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <CustomToggleButtonGroup
          value={activeSwitchTabHeader}
          handleSwitch={handleSwitchHeader}
          borderRadius={8}
          customClasses={{
            tab: classes.switchTab,
          }}
        >
          <ToggleButton
            value={'promo_performance'}
            aria-label='left aligned'
            classes={{
              root: classes.toggleRoot,
              selected: classes.toggleActive,
            }}
          >
            <p className={classes.switchTabText}>Promo Performance</p>
          </ToggleButton>
          <ToggleButton
            value={'edit_promo'}
            aria-label='left aligned'
            classes={{
              root: classes.toggleRootLast,
              selected: classes.toggleActive,
            }}
          >
            <p className={classes.switchTabText}>Edit Promo</p>
          </ToggleButton>
        </CustomToggleButtonGroup>
      </Box>
      <div className={classes.body}>
        {activeSwitchTabHeader === 'promo_performance' ? (
          <ProductGroupPerformance data={data} />
        ) : (
          <ProductPromo data={data} />
        )}
      </div>
      {activeSwitchTabHeader === 'promo_performance' ? (
        <div className={classes.footer}>
          <CustomButton
            isPrimary={true}
            variant='contained'
            height={32}
            width={142}
            minWidth={0}
            padding={'16px'}
            label='Close'
            onButtonClick={() => toggleDrawer()}
          />
        </div>
      ) : (
        <div className={classes.footer}>
          <CustomButton
            isPrimary={true}
            variant='outlined'
            height={32}
            width={142}
            minWidth={0}
            padding={'16px'}
            label='Close'
            onButtonClick={() => toggleDrawer()}
          />
          <CustomButton
            isPrimary={true}
            variant='contained'
            height={32}
            width={182}
            minWidth={0}
            padding={'16px'}
            label='Save Changes'
            onButtonClick={() =>
              state === 6 ? toggleDrawer(state) : toggleDrawer(state - 1)
            }
          />
        </div>
      )}
    </div>
  );
};

export default ProductGroupDetailsDrawer;
