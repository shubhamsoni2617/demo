import React from 'react';
import { makeStyles } from '@mui/styles';
import SimpleTable from '../../components/SimpleTable/SimpleTable';

const styles = (theme) => ({
  title: {
    margin: '0',
    padding: '16px 8px',
    fontSize: '1.05rem',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const useStyles = makeStyles(styles);

const VarianceData = (props) => {
  const classes = useStyles();
  const { tableHeader, tableConfig, data } = props;

  return (
    <SimpleTable
      title={tableHeader}
      titleClass={classes.title}
      headers={tableConfig}
      data={data}
    />
  );
};

export default VarianceData;
