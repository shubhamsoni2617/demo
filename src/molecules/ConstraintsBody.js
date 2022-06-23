import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import SelectRenderer from '../components/Select/SelectRenderer';
import CustomRadioGroup from '../components/CustomRadioGroup';

import {
  offerType,
  discountLevels,
  constraintLevels,
} from '../pages/Components/data';
import CustomNumberInput from '../components/CustomNumberInput/CustomNumberInput';
import { Radio } from '@mui/material';

const styles = (theme) => ({
  container: {},
  headerContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    padding: '24px 40px',
    borderBottom: `0.5px solid ${theme.palette.stroke}`,
  },
  dataContainer: {
    padding: '24px 40px',
  },
  field: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
    margin: '24px 0',
  },
  fieldWithRadio: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
    margin: '24px 0',
    marginLeft: -12,
  },
  fieldsGroup: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
  },
  fieldSeparator: {
    margin: '0 12px',
    color: theme.palette.stroke,
  },
  fieldLabel: {
    ...theme.typography.fontSizes.normalText,
    fontWeight: theme.typography.fontWeight.semiBold,
    margin: 0,
    marginRight: 16,
    width: 180,
  },
  fieldLabelWithRadio: {
    ...theme.typography.fontSizes.normalText,
    fontWeight: theme.typography.fontWeight.semiBold,
    margin: 0,
    marginRight: 16,
    width: 150,
  },
  fieldLabelDisabled: {
    ...theme.typography.fontSizes.normalText,
    fontWeight: theme.typography.fontWeight.semiBold,
    margin: 0,
    marginRight: 16,
    color: theme.palette.stroke,
    width: 180,
  },
  fieldLabelWithRadioDisabled: {
    ...theme.typography.fontSizes.normalText,
    fontWeight: theme.typography.fontWeight.semiBold,
    margin: 0,
    marginRight: 16,
    color: theme.palette.stroke,
    width: 150,
  },
  inputRoot: {
    marginTop: 0,
  },
  inputSpinner: {
    ...theme.content.flexStyles.flexCol,
    ...theme.content.flexStyles.flexAlignCenter,
    height: 36,
    padding: '4px 10px',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});

const useStyles = makeStyles(styles);

const ConstraintsBody = () => {
  const classes = useStyles();

  const [level, setLevel] = useState('tiers');
  const [selectedField, setSelectedField] = useState('frequency');
  const [discountSegment, setDiscountSegment] = useState(1);
  const [discountFrequency, setDiscountFrequency] = useState({
    min: null,
    max: null,
  });
  const [discountCount, setDiscountCount] = useState({
    min: null,
    max: null,
  });
  const [discount, setDiscount] = useState({
    min: null,
    max: null,
  });
  const [units, setUnits] = useState({
    min: null,
    max: null,
  });
  const [stepSize, setStepSize] = useState({
    min: null,
    max: null,
  });
  const [discountDifferenceLevel, setDiscountDifferenceLevel] = useState({
    min: null,
    max: null,
  });

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
  };

  const handleOnSelect = (value) => {
    console.log('value', value);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const onDiscountSegmentChange = (value) => {
    setDiscountSegment(value);
  };

  const onDiscountFrequencyChange = (value, key) => {
    const discountFrequencyValues = { ...discountFrequency };
    discountFrequencyValues[key] = value;

    setDiscountFrequency(discountFrequencyValues);
  };

  const onDiscountCountChange = (value, key) => {
    const discountCountValues = { ...discountCount };
    discountCountValues[key] = value;

    setDiscountCount(discountCountValues);
  };

  const onDiscountChange = (value, key) => {
    const discountValues = { ...discount };
    discountValues[key] = value;

    setDiscount(discountValues);
  };

  const onUnitsChange = (value, key) => {
    const unitValues = { ...units };
    unitValues[key] = value;

    setUnits(unitValues);
  };

  const onStepSizeChange = (value, key) => {
    const stepSizeValues = { ...stepSize };
    stepSizeValues[key] = value;

    setStepSize(stepSizeValues);
  };

  const onDiscountLevelChange = (value, key) => {
    const discountLevelValues = { ...discountDifferenceLevel };
    discountLevelValues[key] = value;

    setDiscountDifferenceLevel(discountLevelValues);
  };

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <SelectRenderer
          options={offerType}
          selectedItems={[]}
          isMandatory={false}
          isMulti={false}
          filterLabel={'Offer Type'}
          type={'abc'}
          width={200}
          updateSelected={handleOnSelect}
        />
        <SelectRenderer
          options={discountLevels}
          selectedItems={[]}
          isMandatory={false}
          isMulti={false}
          filterLabel={'Discount Level'}
          type={'abc'}
          width={200}
          updateSelected={handleOnSelect}
        />
      </div>

      <div className={classes.dataContainer}>
        <div className={classes.constraintLevel}>
          <CustomRadioGroup
            label={''}
            options={constraintLevels}
            value={level}
            handleChange={handleLevelChange}
            row={true}
          />
        </div>
        <div className={classes.fieldWithRadio}>
          <div>
            <Radio
              checked={selectedField === 'frequency'}
              onChange={handleFieldChange}
              value='frequency'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'A' }}
            />
          </div>
          <p
            className={
              selectedField === 'frequency'
                ? classes.fieldLabelWithRadio
                : classes.fieldLabelWithRadioDisabled
            }
          >
            {' '}
            Discount Frequency
          </p>
          <div className={classes.fieldsGroup}>
            <CustomNumberInput
              height={36}
              width={88}
              disabled={selectedField !== 'frequency'}
              marginTop={'16px'}
              type={'min'}
              value={discountFrequency.min}
              placeholder={'Min'}
              customClasses={{
                root: classes.inputRoot,
                spinner: classes.inputSpinner,
              }}
              onValueChange={onDiscountFrequencyChange}
            />
            <p className={classes.fieldSeparator}>-</p>
            <CustomNumberInput
              height={36}
              width={88}
              disabled={selectedField !== 'frequency'}
              marginTop={'16px'}
              type={'min'}
              value={discountFrequency.max}
              placeholder={'Max'}
              customClasses={{
                root: classes.inputRoot,
                spinner: classes.inputSpinner,
              }}
              onValueChange={onDiscountFrequencyChange}
            />
          </div>
        </div>
        <div className={classes.fieldWithRadio}>
          <div>
            <Radio
              checked={selectedField === 'discount_count'}
              onChange={handleFieldChange}
              value='discount_count'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'A' }}
            />
          </div>
          <p
            className={
              selectedField === 'discount_count'
                ? classes.fieldLabelWithRadio
                : classes.fieldLabelWithRadioDisabled
            }
          >
            {' '}
            No. of Discounts
          </p>
          <div className={classes.fieldsGroup}>
            <CustomNumberInput
              height={36}
              width={88}
              disabled={selectedField !== 'discount_count'}
              marginTop={'16px'}
              type={'min'}
              value={discountCount.min}
              placeholder={'Min'}
              customClasses={{
                root: classes.inputRoot,
                spinner: classes.inputSpinner,
              }}
              onValueChange={onDiscountCountChange}
            />
            <p className={classes.fieldSeparator}>-</p>
            <CustomNumberInput
              height={36}
              width={88}
              disabled={selectedField !== 'discount_count'}
              marginTop={'16px'}
              type={'min'}
              value={discountCount.max}
              placeholder={'Max'}
              customClasses={{
                root: classes.inputRoot,
                spinner: classes.inputSpinner,
              }}
              onValueChange={onDiscountCountChange}
            />
          </div>
        </div>
        <div className={classes.field}>
          <p className={classes.fieldLabel}> No. of Discount segment</p>
          <CustomNumberInput
            height={36}
            width={88}
            marginTop={'16px'}
            type={'discount_segment'}
            value={discountSegment}
            customClasses={{
              root: classes.inputRoot,
              spinner: classes.inputSpinner,
            }}
            onValueChange={onDiscountSegmentChange}
          />
        </div>
        <div className={classes.field}>
          <p className={classes.fieldLabel}> Min% - Max discount%</p>
          <div className={classes.fieldsGroup}>
            <CustomNumberInput
              height={36}
              width={88}
              marginTop={'16px'}
              type={'min'}
              value={discount.min}
              placeholder={'Min'}
              customClasses={{
                root: classes.inputRoot,
                spinner: classes.inputSpinner,
              }}
              onValueChange={onDiscountChange}
            />
            <p className={classes.fieldSeparator}>-</p>
            <CustomNumberInput
              height={36}
              width={88}
              marginTop={'16px'}
              type={'min'}
              value={discount.max}
              placeholder={'Max'}
              customClasses={{
                root: classes.inputRoot,
                spinner: classes.inputSpinner,
              }}
              onValueChange={onDiscountChange}
            />
          </div>
        </div>
        <div className={classes.field}>
          <p className={classes.fieldLabel}> week by week change units %</p>
          <div className={classes.fieldsGroup}>
            <CustomNumberInput
              height={36}
              width={88}
              marginTop={'16px'}
              type={'min'}
              value={units.min}
              placeholder={'Min'}
              customClasses={{
                root: classes.inputRoot,
                spinner: classes.inputSpinner,
              }}
              onValueChange={onUnitsChange}
            />
            <p className={classes.fieldSeparator}>-</p>
            <CustomNumberInput
              height={36}
              width={88}
              marginTop={'16px'}
              type={'max'}
              value={units.max}
              placeholder={'Max'}
              customClasses={{
                root: classes.inputRoot,
                spinner: classes.inputSpinner,
              }}
              onValueChange={onUnitsChange}
            />
          </div>
        </div>
        <div className={classes.field}>
          <p className={classes.fieldLabel}> Step Size %</p>
          <div className={classes.fieldsGroup}>
            <CustomNumberInput
              height={36}
              width={88}
              marginTop={'16px'}
              type={'min'}
              value={stepSize.min}
              placeholder={'Min'}
              customClasses={{
                root: classes.inputRoot,
                spinner: classes.inputSpinner,
              }}
              onValueChange={onStepSizeChange}
            />
            <p className={classes.fieldSeparator}>-</p>
            <CustomNumberInput
              height={36}
              width={88}
              marginTop={'16px'}
              type={'max'}
              value={stepSize.max}
              placeholder={'Max'}
              customClasses={{
                root: classes.inputRoot,
                spinner: classes.inputSpinner,
              }}
              onValueChange={onStepSizeChange}
            />
          </div>
        </div>
        <div className={classes.field}>
          <p className={classes.fieldLabelDisabled}>
            {' '}
            Min % - Max discount % difference between each level
          </p>
          <div className={classes.fieldsGroup}>
            <CustomNumberInput
              height={36}
              width={88}
              disabled={true}
              marginTop={'16px'}
              type={'min'}
              value={discountDifferenceLevel.min}
              placeholder={'Min'}
              customClasses={{
                root: classes.inputRoot,
                spinner: classes.inputSpinner,
              }}
              onValueChange={onDiscountLevelChange}
            />
            <p className={classes.fieldSeparator}>-</p>
            <CustomNumberInput
              height={36}
              width={88}
              disabled={true}
              marginTop={'16px'}
              type={'max'}
              value={discountDifferenceLevel.max}
              placeholder={'Max'}
              customClasses={{
                root: classes.inputRoot,
                spinner: classes.inputSpinner,
              }}
              onValueChange={onDiscountLevelChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstraintsBody;
