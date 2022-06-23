import React from 'react';
import { makeStyles } from '@mui/styles';

const styles = (theme) => ({
  container: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    borderRadius: 6,
    width: 80,
    border: `1px solid ${theme.palette.bgBlock}`,
  },
  text: {
    ...theme.typography.fontSizes.normalText,
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    margin: 0,
    marginLeft: 8,
    height: 32,
    width: '100%',
    paddingLeft: 12,
  },
  block: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
    background: theme.palette.bgBlock,
    padding: 8,
    marginLeft: 8,
    height: 32,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
});

const useStyles = makeStyles(styles);

const PercentBlock = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.text}>
        {props.value}
        <div className={classes.block}>%</div>
      </div>
    </div>
  );
};

export default PercentBlock;
