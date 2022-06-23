import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import CustomButton from '../components/CustomButton';

import StorageIcon from '../assets/svg/storage.svg';
import StoreIcon from '../assets/svg/shop.svg';

const styles = (theme) => ({
  inventoryContainer: {
    padding: 40,
    borderBottom: `2px dashed ${theme.palette.strokeLightBlue}`,
  },
  header: {
    ...theme.typography.fontSizes.unitText,
    fontWeight: theme.typography.fontWeight.bold,
  },
  inventoryDetails: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
  },
  inventory: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStart,
  },
  headerIconContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    background: 'rgb(68 103 123 / 14%)',
    height: 56,
    width: 56,
    borderRadius: '50%',
    marginTop: 12,
    marginRight: 16,
  },
  headerIcon: {
    fontSize: 16,
  },
  inventoryInfo: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
  },
  inventoryInfoItem: {
    ...theme.content.flexStyles.flexCol,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    marginRight: 16,
  },
  inventoryInfoHeader: {
    ...theme.typography.fontSizes.breadCrumbText,
    fontWeight: theme.typography.fontWeight.semiBold,
    margin: '16px 0 8px 0',
  },
  inventoryInfoValue: {
    ...theme.typography.fontSizes.sectionHeaderText,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.palette.bgSwitch,
    margin: '0 0 16px 0',
  },
});

const useStyles = makeStyles(styles);

const Inventory = ({ inventoryDetails, isReoptimizing }) => {
  const classes = useStyles();

  return (
    <div className={classes.inventoryContainer}>
      <p className={classes.header}>Current Inventory Info</p>
      <div className={classes.inventoryDetails}>
        <div className={classes.inventory}>
          <div className={classes.headerIconContainer}>
            <img
              src={StorageIcon}
              alt='storage'
              className={classes.headerIcon}
            />
          </div>
          <div>
            <div className={classes.inventoryInfo}>
              <div className={classes.inventoryInfoItem}>
                <p className={classes.inventoryInfoHeader}>DC OH</p>
                <p className={classes.inventoryInfoValue}>
                  {inventoryDetails.dc_oh}
                </p>
              </div>
              <div className={classes.inventoryInfoItem}>
                <p className={classes.inventoryInfoHeader}>DC On Order</p>
                <p className={classes.inventoryInfoValue}>
                  {inventoryDetails.dc_on_order}
                </p>
              </div>
              <div className={classes.inventoryInfoItem}>
                <p className={classes.inventoryInfoHeader}>DC In Transit</p>
                <p className={classes.inventoryInfoValue}>
                  {inventoryDetails.dc_in_transit}
                </p>
              </div>
              <div className={classes.inventoryInfoItem}>
                <p className={classes.inventoryInfoHeader}>Store OH</p>
                <p className={classes.inventoryInfoValue}>
                  {inventoryDetails.store_oh}
                </p>
              </div>
              <div className={classes.inventoryInfoItem}>
                <p className={classes.inventoryInfoHeader}>Store In Transit</p>
                <p className={classes.inventoryInfoValue}>
                  {inventoryDetails.store_in_transit}
                </p>
              </div>
              <div className={classes.inventoryInfoItem}>
                <p className={classes.inventoryInfoHeader}>LW Discount%</p>
                <p className={classes.inventoryInfoValue}>
                  {inventoryDetails.lw_discount}
                </p>
              </div>
            </div>
            {isReoptimizing && (
              <CustomButton
                isPrimary={true}
                variant='contained'
                height={32}
                width={132}
                minWidth={0}
                padding={'16px'}
                label='DC on Order'
                onButtonClick={() => console.log('Cool')}
              />
            )}
          </div>
        </div>
        <div className={classes.inventory}>
          <div className={classes.headerIconContainer}>
            <img src={StoreIcon} alt='store' className={classes.headerIcon} />
          </div>
          <div>
            <div className={classes.inventoryInfo}>
              <div className={classes.inventoryInfoItem}>
                <p className={classes.inventoryInfoHeader}>Stores</p>
                <p className={classes.inventoryInfoValue}>
                  {inventoryDetails.stores}
                </p>
              </div>
            </div>
            {isReoptimizing && (
              <CustomButton
                isPrimary={true}
                variant='contained'
                height={32}
                width={72}
                minWidth={0}
                padding={'16px'}
                label='Stores'
                onButtonClick={() => console.log('Cool')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
