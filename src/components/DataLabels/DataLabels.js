import React from 'react';
import { makeStyles } from '@mui/styles';

import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CurrencyYenOutlinedIcon from '@mui/icons-material/CurrencyYenOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropDownOutlined from '@mui/icons-material/ArrowDropDownOutlined';

const styles = (theme) => ({
  container: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    width: '100%',
    borderRight: `0.5px solid ${theme.palette.strokeTable}`,
  },
  label: {
    margin: 0,
    marginRight: 12,
    fontSize: '0.8rem',
    color: theme.palette.textDark,
  },
  value: {
    // margin: 0,
    margin: '12px 0',
    fontSize: '1.6rem',
    lineHeight: '2rem',
    fontWeight: 600,
    background: '#eaf3fc',
    color: '#3089e4',
    padding: '0px 4px',
    borderRadius: 4,
  },
});

const useStyles = makeStyles(styles);

const DataLabels = (props) => {
  const { label, value, isLast } = props;
  const classes = useStyles();

  return (
    <div
      className={classes.container}
      style={{ borderRight: isLast && 'none' }}
    >
      <p className={classes.label}>{label}</p>
      <p className={classes.value}>{`${value}`}</p>
    </div>
  );
};

export default DataLabels;
