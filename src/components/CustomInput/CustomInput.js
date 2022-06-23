import React from 'react';
import { makeStyles } from '@mui/styles';
import { OutlinedInput } from '@mui/material';

const styles = (theme) => ({
  inputFieldRoot: {
    paddingRight: 12,
    paddingLeft: 8,
    background: '#fff',

    '& .MuiOutlinedInput-notchedOutline': {
      border: `0.5px solid ${theme.palette.stroke} !important`,
      borderRadius: '4px',
    },
  },
  inputField: {
    ...theme.typography.fontSizes.normalText,
    padding: `6px 0px 6px 6px `,
    boxSizing: theme.content.boxSizing.borderBox,
    height: '2.25rem',
    color: theme.palette.textDark,

    '& [type=number]': {
      '-moz-appearance': 'textfield',
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
    },

    '&::placeholder': {
      opacity: 1,
    },
  },
  inputFieldAdornment: {
    ...theme.typography.fontSizes.normalText,
    margin: 0,
  },
});

const useStyles = makeStyles(styles);

const CustomInput = (props) => {
  const {
    height,
    width,
    inputType,
    placeholder,
    type,
    value,
    startInputAdornment,
    onValueChange,
  } = props;
  const classes = useStyles();

  return (
    <OutlinedInput
      id='outlined-adornment-password'
      sx={{ height, width }}
      type={inputType}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onValueChange(e.target.value, type)}
      classes={{
        root: classes.inputFieldRoot,
        input: classes.inputField,
      }}
      startAdornment={
        startInputAdornment && (
          <p className={classes.inputFieldAdornment}>{startInputAdornment}</p>
        )
      }
    />
  );
};

export default CustomInput;
