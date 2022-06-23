import React from 'react';
import { makeStyles } from '@mui/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const styles = (theme) => ({
  tab: {
    border: '4px solid #dfeaf5',
  },
});

const useStyles = makeStyles(styles);

const CustomRadioGroup = (props) => {
  const { options, label, row, value, handleChange } = props;
  const classes = useStyles();

  return (
    <FormControl>
      {label ? (
        <FormLabel id='demo-row-radio-buttons-group-label'>{label}</FormLabel>
      ) : null}

      <RadioGroup
        row={row}
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        value={value}
        onChange={handleChange}
      >
        {options?.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio />}
            label={option.label}
            key={`radio-${option.value}`}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
