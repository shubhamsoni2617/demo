import React from 'react';
import { makeStyles } from '@mui/styles';
import classnames from 'classnames';

const styles = (theme) => ({
  containerLow: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    padding: '6px 16px',
    borderRadius: 6,
    background: theme.palette.bgSuccessTransparent,
    color: theme.palette.bgSuccess,
  },
  containerMedium: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    padding: '6px 16px',
    borderRadius: 6,
    background: theme.palette.bgWarningTransparent,
    color: theme.palette.bgWarning,
  },
  containerHigh: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    padding: '6px 16px',
    borderRadius: 6,
    background: theme.palette.bgDangerTransparent,
    color: theme.palette.bgDanger,
  },
  text: {
    ...theme.typography.fontSizes.normalText,
    margin: 0,
    marginLeft: 8,
  },
  status: {
    height: 10,
    width: 10,
    borderRadius: '50%',
  },
  statusTrack: {
    background: theme.palette.bgSuccess,
  },
  statusSlow: {
    background: theme.palette.bgDanger,
  },
  statusFast: {
    background: theme.palette.bgWarning,
  },
});

const useStyles = makeStyles(styles);

const Exceptions = (props) => {
  const classes = useStyles();

  return (
    <div
      className={
        props.value === 'Low'
          ? classes.containerLow
          : props.value === 'Medium'
          ? classes.containerMedium
          : classes.containerHigh
      }
    >
      <div
        className={
          props.value === 'Low'
            ? classnames(classes.status, classes.statusTrack)
            : props.value === 'High'
            ? classnames(classes.status, classes.statusSlow)
            : classnames(classes.status, classes.statusFast)
        }
      ></div>
      <p className={classes.text}>{props.value}</p>
    </div>
  );
};

export default Exceptions;
