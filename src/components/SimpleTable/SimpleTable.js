import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import SimpleTableHead from './SimpleTableHead';
import SimpleTableBody from './SimpleTableBody';

const SimpleTable = (props) => {
  const { title, titleClass, headers, data } = props;
  return (
    <TableContainer
      className='variance-from-plan'
      component={Box}
      style={{ height: '100%' }}
    >
      {title ? <p className={titleClass}>{title}</p> : null}
      <Table>
        <SimpleTableHead headers={headers} />
        <SimpleTableBody headers={headers} data={data} />
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
