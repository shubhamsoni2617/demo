import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Select from './Select';

const Item = styled(Paper)(({ theme, width }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  boxShadow: 'none',
  background: 'transparent',
  width,
  color: theme.palette.text.secondary,
}));

const SelectRenderer = (props) => {
  const {
    type,
    filterLabel,
    isMandatory,
    isMulti,
    placeholder,
    updateSelected,
    options,
    selectedItems,
    width,
  } = props;

  return (
    <div>
      <Item className='filterGroup' width={width}>
        <label>
          {filterLabel}
          {isMandatory ? <span style={{ color: 'red' }}> * </span> : null}
        </label>
        <Select
          type={type}
          placeholder={placeholder}
          isMulti={isMulti}
          initialData={options}
          selectedOptions={selectedItems}
          reset={false}
          dependency={selectedItems}
          updateSelected={updateSelected}
          onDropdownOpen={() => console.log('Ok')}
          forceApiCall={false}
        />
      </Item>
    </div>
  );
};

export default SelectRenderer;
