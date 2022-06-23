import React from 'react';
import { makeStyles } from '@mui/styles';
import classnames from 'classnames';

const styles = (theme) => ({
  container: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
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

const Status = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div
        className={
          props.value === 'On Track'
            ? classnames(classes.status, classes.statusTrack)
            : props.value === 'Selling Slow'
            ? classnames(classes.status, classes.statusSlow)
            : classnames(classes.status, classes.statusFast)
        }
      ></div>
      <p className={classes.text}>{props.value}</p>
    </div>
  );
};

export default Status;
