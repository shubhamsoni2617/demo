import React from 'react';
import { makeStyles } from '@mui/styles';

const styles = (theme) => ({
  container: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    padding: '6px 16px',
    borderRadius: 6,
    background: theme.palette.bgBlock,
  },
  text: {
    ...theme.typography.fontSizes.normalText,
    margin: 0,
    marginLeft: 8,
  },
});

const useStyles = makeStyles(styles);

const BlockText = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <p className={classes.text}>{props.value}</p>
    </div>
  );
};

export default BlockText;
