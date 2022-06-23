import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import { makeStyles, styled } from '@mui/styles';

import './DatePicker.scss';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import { Paper } from '@mui/material';

const styles = (theme) => ({
  tab: {
    border: '4px solid #dfeaf5',
  },
});

const useStyles = makeStyles(styles);

const Item = styled(Paper)(({ theme, width, labeldirection }) => ({
  ...theme.typography.body2,
  display: labeldirection === 'row' && 'flex',
  alignItems: labeldirection === 'row' && 'center',
  justifyContent: labeldirection === 'row' && 'space-between',
  textAlign: 'left',
  boxShadow: 'none',
  background: 'transparent',
  // width,
  color: theme.palette.text.secondary,
}));

const CustomDatePicker = (props) => {
  const classes = useStyles();
  const {
    label,
    labeldirection,
    values,
    width,
    fieldWidth,
    isMandatory,
    onChange,
  } = props;

  return (
    <div>
      <Item
        className='filterGroup'
        labeldirection={labeldirection}
        width={width}
      >
        <label
          style={{
            marginRight: labeldirection === 'row' && 16,
            paddingBottom: labeldirection === 'row' && 0,
          }}
        >
          {label}
          {isMandatory ? <span style={{ color: 'red' }}> * </span> : null}
        </label>
        <div style={{ width: fieldWidth }}>
          <DatePicker
            onChange={onChange}
            value={values}
            clearIcon={null}
            dayPlaceholder={'dd'}
            monthPlaceholder={'mm'}
            yearPlaceholder={'yyyy'}
            calendarIcon={
              <CalendarMonthOutlined
                style={{ fontSize: 20, color: '#515151' }}
              />
            }
          />
        </div>
      </Item>
    </div>
  );
};

export default CustomDatePicker;
