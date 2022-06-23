import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

import CustomInput from '../components/CustomInput/CustomInput';
import CustomNumberInput from '../components/CustomNumberInput/CustomNumberInput';
import SelectRenderer from '../components/Select/SelectRenderer';
import { maximizationMetricsOptions } from '../pages/Components/data';
import CustomButton from '../components/CustomButton';

import SettingsIcon from '../assets/svg/settings.svg';
import CustomDrawer from '../components/CustomDrawer';
import Constraints from './Constraints';

const styles = (theme) => ({
  container: {
    padding: '24px 40px',
    borderBottom: `2px dashed ${theme.palette.strokeLightBlue}`,
  },
  headerContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
  },
  headerFirst: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    width: '55%',
  },
  header: {
    ...theme.typography.fontSizes.unitText,
    fontWeight: theme.typography.fontWeight.bold,
    marginTop: 0,
  },
  headerDateContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
  },
  headerDateLabel: {
    ...theme.typography.fontSizes.normalText,
    margin: 0,
    marginRight: 24,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  headerDate: {
    ...theme.typography.fontSizes.normalText,
    border: `0.5px solid ${theme.palette.stroke}`,
    borderRadius: 4,
    padding: '8px 32px 8px 8px',
  },
  strategyInfo: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
  },
  infoContainer: {
    marginRight: 40,
  },
  infoLabel: {
    ...theme.typography.fontSizes.breadCrumbText,
    fontWeight: theme.typography.fontWeight.semiBold,
    margin: '16px 0',
  },
  infoValue: {
    ...theme.typography.fontSizes.breadCrumbText,
    background: theme.palette.bgTransparent,
    padding: '12px 40px 12px 16px',
    borderRadius: 4,
    margin: 0,
  },
  strategyDetails: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    marginTop: 24,
  },
  strategyTextContainer: {
    marginTop: 46,
  },
  strategyTextOne: {
    ...theme.typography.fontSizes.normalText,
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
    margin: 0,
    height: 40,
  },
  strategyTextTwo: {
    ...theme.typography.fontSizes.normalText,
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
    margin: 0,
    height: 56,
  },
  label: {
    ...theme.typography.fontSizes.breadCrumbText,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  strategy: {
    ...theme.content.flexStyles.flexCol,
    ...theme.content.flexStyles.flexAlignStart,
  },
  metrics: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
    marginTop: 24,
  },
  metricsLabel: {
    ...theme.typography.fontSizes.normalText,
    margin: 0,
    marginRight: 24,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  startIcon: {
    height: 16,
    width: 16,
  },
});

const useStyles = makeStyles(styles);

const Strategy = ({ inventoryDetails, state }) => {
  const classes = useStyles();

  const [inventory, setInventory] = useState({});
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  useEffect(() => {
    if (inventoryDetails?.id) {
      setInventory(inventoryDetails);
    }
  }, [inventoryDetails]);

  const onValueChange = (value, key) => {
    const inventoryValues = { ...inventory };

    inventoryValues[key] = value;

    setInventory({ ...inventoryValues });
  };

  const handleOnSelect = (value) => {
    console.log('value', value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <div className={classes.headerFirst}>
          <p
            className={classes.header}
            style={{ marginBottom: state === 1 && 0 }}
          >
            Strategy
          </p>
          {state === 1 && (
            <div className={classes.headerDateContainer}>
              <p className={classes.headerDateLabel}>Date Range</p>
              <p className={classes.headerDate}>{inventory.date_range}</p>
            </div>
          )}
        </div>
        {state === 1 && (
          <CustomButton
            isPrimary={true}
            variant='outlined'
            height={36}
            width={148}
            minWidth={0}
            padding={'16px'}
            label='Constraints'
            startIcon={
              <img
                src={SettingsIcon}
                alt='settings'
                className={classes.startIcon}
              />
            }
            onButtonClick={toggleDrawer}
          />
        )}
      </div>

      {state === 0 ? (
        <div className={classes.strategyInfo}>
          <div className={classes.infoContainer}>
            <p className={classes.infoLabel}>Sell through%</p>
            <p className={classes.infoValue}>{inventory.sell_through_target}</p>
          </div>
          <div className={classes.infoContainer}>
            <p className={classes.infoLabel}>Margin%</p>
            <p className={classes.infoValue}>{inventory.margin}</p>
          </div>
          <div className={classes.infoContainer}>
            <p className={classes.infoLabel}>Date Range</p>
            <p className={classes.infoValue}>{inventory.date_range}</p>
          </div>
        </div>
      ) : (
        <div className={classes.strategyDetails}>
          <div className={classes.strategyTextContainer}>
            <p className={classes.strategyTextOne}>Value</p>
            <p className={classes.strategyTextTwo}>Priority</p>
          </div>
          <div>
            <p className={classes.label}>Revenue Target $</p>
            <div className={classes.strategy}>
              <CustomInput
                height={32}
                width={96}
                inputType={'number'}
                type={'revenue_target'}
                value={inventory.revenue_target}
                startInputAdornment={'$'}
                onValueChange={onValueChange}
              />
              <CustomNumberInput
                height={36}
                width={88}
                marginTop={'16px'}
                type={'revenue_target_priority'}
                value={inventory.revenue_target_priority}
                onValueChange={onValueChange}
              />
            </div>
          </div>
          <div>
            <p className={classes.label}>Sales Target (units)</p>
            <div className={classes.strategy}>
              <CustomInput
                height={32}
                width={96}
                inputType={'number'}
                type={'sales_target'}
                value={inventory.sales_target}
                onValueChange={onValueChange}
              />
              <CustomNumberInput
                height={36}
                width={88}
                marginTop={'16px'}
                type={'sales_target_priority'}
                value={inventory.sales_target_priority}
                onValueChange={onValueChange}
              />
            </div>
          </div>
          <div>
            <p className={classes.label}>Margin Target $</p>
            <div className={classes.strategy}>
              <CustomInput
                height={32}
                width={96}
                inputType={'text'}
                type={'margin_target'}
                value={inventory.margin_target}
                startInputAdornment={'$'}
                onValueChange={onValueChange}
              />
              <CustomNumberInput
                height={36}
                width={88}
                marginTop={'16px'}
                type={'margin_target_priority'}
                value={inventory.margin_target_priority}
                onValueChange={onValueChange}
              />
            </div>
          </div>
          <div>
            <p className={classes.label}>GM %</p>
            <div className={classes.strategy}>
              <CustomInput
                height={32}
                width={96}
                inputType={'text'}
                type={'margin'}
                value={inventory.margin}
                onValueChange={onValueChange}
              />
              <CustomNumberInput
                height={36}
                width={88}
                marginTop={'16px'}
                type={'margin_priority'}
                value={inventory.margin_priority}
                onValueChange={onValueChange}
              />
            </div>
          </div>
          <div>
            <p className={classes.label}>ST Target %</p>
            <div className={classes.strategy}>
              <CustomInput
                height={32}
                width={96}
                inputType={'text'}
                type={'sell_through_target'}
                value={inventory.sell_through_target}
                onValueChange={onValueChange}
              />
              <CustomNumberInput
                height={36}
                width={88}
                marginTop={'16px'}
                type={'sell_through_priority'}
                value={inventory.sell_through_priority}
                onValueChange={onValueChange}
              />
            </div>
          </div>
          <div>
            <p className={classes.label}>Target Inventory</p>
            <div className={classes.strategy}>
              <CustomInput
                height={32}
                width={96}
                inputType={'number'}
                type={'target_inventory'}
                value={inventory.target_inventory}
                startInputAdornment={'%'}
                onValueChange={onValueChange}
              />
              <CustomNumberInput
                height={36}
                width={88}
                marginTop={'16px'}
                type={'target_inventory_priority'}
                value={inventory.target_inventory_priority}
                onValueChange={onValueChange}
              />
            </div>
          </div>
        </div>
      )}
      {state === 1 ? (
        <div className={classes.metrics}>
          <p className={classes.metricsLabel}>Maximization metric</p>
          <SelectRenderer
            options={maximizationMetricsOptions}
            selectedItems={[]}
            isMandatory={false}
            isMulti={false}
            filterLabel={''}
            type={'abc'}
            width={200}
            updateSelected={handleOnSelect}
          />
        </div>
      ) : null}
      {state === 1 && (
        <CustomDrawer
          open={drawer}
          anchor={'right'}
          width={200}
          toggleDrawer={toggleDrawer}
        >
          <Constraints toggleDrawer={toggleDrawer} />
        </CustomDrawer>
      )}
    </div>
  );
};

export default Strategy;
