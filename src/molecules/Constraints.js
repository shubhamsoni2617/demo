import React from 'react';
import { makeStyles } from '@mui/styles';

import CustomButton from '../components/CustomButton';
import ConstraintsBody from './ConstraintsBody';
import CloseIcon from '@mui/icons-material/Close';

import UnCheckedIcon from '../assets/svg/unchecked.svg';
import CheckedIcon from '../assets/svg/check.svg';
import { Checkbox } from '@mui/material';

const styles = (theme) => ({
  container: {
    width: 500,
    position: theme.content.positions.relative,
    height: '100%',
    overflow: theme.content.overflow.hidden,
  },
  headerContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    padding: '24px 40px',
    borderBottom: `0.5px solid ${theme.palette.stroke}`,
  },
  headerText: {
    ...theme.typography.fontSizes.sectionHeaderText,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  closeIcon: {
    cursor: theme.content.cursor.pointer,
  },
  body: {
    height: '80%',
    overflowY: theme.content.overflow.scroll,
  },
  footer: {
    ...theme.content.flexStyles.flexCol,
    ...theme.content.flexStyles.flexAlignCenter,
    position: theme.content.positions.absolute,
    width: '100%',
    background: theme.palette.textWhite,
    bottom: 0,
    boxShadow: '0px -3px 6px #00000029',
    padding: 32,
  },
  defaultContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
  },
  defaultText: {
    ...theme.typography.fontSizes.breadCrumbText,
    margin: 0,
    // marginLeft: 8,
  },
});

const useStyles = makeStyles(styles);

const Constraints = ({ toggleDrawer }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <p className={classes.headerText}>Add Additonal Constraints</p>
        <CloseIcon
          className={classes.closeIcon}
          onClick={() => toggleDrawer()}
        />
      </div>
      <div className={classes.body}>
        <ConstraintsBody />
      </div>
      <div className={classes.footer}>
        <div className={classes.defaultContainer}>
          <Checkbox
            icon={<img src={UnCheckedIcon} alt='unchecked' />}
            checkedIcon={<img src={CheckedIcon} alt='unchecked' />}
            name={'default'}
            className={classes.customCheckbox}
          />
          <p className={classes.defaultText}>Save as default</p>
        </div>
        <CustomButton
          isPrimary={true}
          variant='contained'
          height={36}
          width={152}
          minWidth={0}
          padding={'16px'}
          label='Add Constraints'
          onButtonClick={() => toggleDrawer()}
        />
      </div>
    </div>
  );
};

export default Constraints;
