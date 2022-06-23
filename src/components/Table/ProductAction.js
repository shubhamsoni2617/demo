import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import CustomButton from '../CustomButton';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import CustomDrawer from '../CustomDrawer';
import ProductGroupDetailsDrawer from '../../molecules/ProductGroupDetailsDrawer';
import { useSearchParams } from 'react-router-dom';

const styles = (theme) => ({
  text: {
    ...theme.typography.fontSizes.normalText,
    margin: 0,
    marginLeft: 8,
  },
  filterActions: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
  },
  iconButton: {
    fontSize: '24px !important',
    color: theme.palette.bgSwitch,
  },
  startIcon: {
    display: 'inherit',
    margin: 0,
  },
});

const useStyles = makeStyles(styles);

const ProductAction = (props) => {
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();

  const [drawer, setDrawer] = useState(false);

  const categoryId = searchParams.get('category_id');
  const subCategoryId = searchParams.get('sub_category_id');
  const state = !categoryId ? 0 : searchParams.get('state');

  const toggleDrawer = (state) => {
    setDrawer(!drawer);

    if (state >= 0) {
      const searchParams = new URLSearchParams({
        code: 0,
        state: state + 1,
        category_id: categoryId,
        sub_category_id: subCategoryId,
      });

      setSearchParams(searchParams);
    }
  };

  return (
    <div>
      <p className={classes.text}>{props.value}</p>
      <div className={classes.filterActions}>
        <CustomButton
          isPrimary={false}
          variant='outlined'
          height={32}
          width={32}
          minWidth={0}
          padding={'16px'}
          label=''
          startIcon={
            <ModeEditOutlineOutlinedIcon className={classes.iconButton} />
          }
          startIconClass={classes.startIcon}
          onButtonClick={() => toggleDrawer()}
        />
        <CustomButton
          isPrimary={false}
          variant='outlined'
          height={32}
          width={32}
          minWidth={0}
          padding={'16px'}
          label=''
          startIcon={<CampaignOutlinedIcon className={classes.iconButton} />}
          startIconClass={classes.startIcon}
          onButtonClick={(event) => event.stopPropagation()}
        />
        <CustomButton
          isPrimary={false}
          variant='outlined'
          height={32}
          width={32}
          minWidth={0}
          padding={'16px'}
          label=''
          startIcon={<PercentOutlinedIcon className={classes.iconButton} />}
          startIconClass={classes.startIcon}
          onButtonClick={(event) => event.stopPropagation()}
        />
      </div>
      <CustomDrawer
        open={drawer}
        anchor={'right'}
        width={400}
        toggleDrawer={toggleDrawer}
      >
        <ProductGroupDetailsDrawer
          data={props.data}
          state={parseInt(state)}
          toggleDrawer={toggleDrawer}
        />
      </CustomDrawer>
    </div>
  );
};

export default ProductAction;
