import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Table.scss';
import CustomImage from './CustomImage';
import ProductAction from './ProductAction';
import Status from './Status';
import Exceptions from './Exceptions';
import BlockText from './BlockText';
import { theme } from '../../theme';
import PercentBlock from './PercentBlock';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      columnDefs: [],
      defaultColDef: {
        enableValue: true,
        enableRowGroup: true,
        enablePivot: true,
        sortable: true,
        autoHeight: true,
        filter: 'agTextColumnFilter',
        editable: false,
        resizable: true,
      },

      rowData: [],
      frameworkComponents: {
        childMessageRenderer: CustomImage,
        actionCellRenderer: ProductAction,
        statusCellRenderer: Status,
        exceptionsCellRenderer: Exceptions,
        blockCellRenderer: BlockText,
        percentCellRenderer: PercentBlock,
      },
    };
  }

  // Expand row and apper another table
  onFirstDataRendered = (params) => {
    // params.api.sizeColumnsToFit();
  };

  // general search
  onQuickFilterChanged = () => {
    this.gridApi.setQuickFilter(document.getElementById('quickFilter').value);
  };

  // clear filters
  clearFilters = () => {
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
  };

  isImagePresent = () => {
    const imageColumn = this.props.columnDefs.find((column) => {
      return column?.cellRenderer === 'childMessageRenderer';
    });

    if (imageColumn) {
      return true;
    }

    return false;
  };

  getRowStyle = (params) => {
    if (params.data.is_finalized) {
      return { background: theme.palette.bgTableFinalized };
    } else if (params.data.is_product_performance) {
      return {
        background:
          params.data.status === 'track'
            ? theme.palette.bgSuccessTransparent
            : params.data.status === 'over'
            ? theme.palette.bgWarningTransparent
            : theme.palette.bgDangerTransparent,
      };
    }

    return { background: theme.palette.textWhite };
  };

  render() {
    return (
      <div
        id='myGrid'
        style={{
          height: this.props.height || '900px',
          width: '100%',
          marginTop: '25px',
        }}
        className={
          this.isImagePresent()
            ? 'ag-theme-custom-react-image'
            : 'ag-theme-custom-react'
        }
      >
        <AgGridReact
          onGridReady={(params) => (this.gridApi = params.api)}
          rowSelection={'multiple'}
          suppressRowClickSelection={true}
          columnDefs={this.props.columnDefs}
          defaultColDef={this.state.defaultColDef}
          sideBar={this.state.sideBar}
          groupSelectsChildren={true}
          pagination={this.props.pagination}
          paginationPageSize={this.state.paginationPageSize}
          paginateChildRows={true}
          autoGroupColumnDef={this.state.autoGroupColumnDef}
          rowData={this.props.rowData}
          masterDetail={true}
          onFirstDataRendered={this.onFirstDataRendered}
          detailCellRendererParams={this.state.detailCellRendererParams}
          floatingFilter={this.props.floatingFilter}
          cacheQuickFilter={true}
          isExternalFilterPresent={this.isExternalFilterPresent}
          doesExternalFilterPass={this.doesExternalFilterPass}
          suppressMenuHide={true}
          getRowStyle={this.getRowStyle}
          frameworkComponents={this.state.frameworkComponents}
        />
      </div>
    );
  }
}

export default Table;
