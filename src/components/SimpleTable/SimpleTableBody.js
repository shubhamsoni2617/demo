import React from 'react';
import { makeStyles } from '@mui/styles';
import { TableBody, TableRow, TableCell } from '@mui/material';

const styles = (theme) => ({
  tableBodyCell: {
    padding: '12px 8px',
    fontSize: '0.7rem',
  },
});

const useStyles = makeStyles(styles);

const SimpleTableBody = ({ headers, data }) => {
  const classes = useStyles();

  return (
    <TableBody>
      {data?.map((dataItem, dataIndex) => (
        <TableRow key={`data-${dataIndex}`}>
          {headers?.map((header, index) => (
            <TableCell
              key={`${header.label}-${dataIndex}`}
              align={header?.align}
              className={classes.tableBodyCell}
              style={{
                color:
                  header?.type === 'text'
                    ? '#6F7F8F'
                    : header?.type === 'difference'
                    ? dataItem[header.id] > 0
                      ? 'green'
                      : 'red'
                    : '#000',
                paddingLeft: index === 0 && 10,
              }}
            >
              {header.type === 'difference' && dataItem[header.id] > 0 && '+'}
              {typeof dataItem[header.id] === 'number'
                ? dataItem[header.id].toFixed(2)
                : dataItem[header.id]}
              {header?.suffix}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default SimpleTableBody;
