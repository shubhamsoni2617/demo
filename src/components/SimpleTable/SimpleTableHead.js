import React from 'react';
import { makeStyles } from '@mui/styles';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const styles = (theme) => ({
  tableHeadCell: {
    fontSize: '0.65rem',
    color: '#696969',
    padding: '6px 4px',
  },
});

const useStyles = makeStyles(styles);

const SimpleTableHead = ({ headers }) => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {headers?.map((header, index) => (
          <TableCell
            key={header.id}
            align={header?.align}
            className={classes.tableHeadCell}
            style={{
              textTransform: header?.textTransform,
              paddingLeft: index === 0 && 10,
            }}
          >
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default SimpleTableHead;
