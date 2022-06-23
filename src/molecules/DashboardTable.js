import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Checkbox, ToggleButton } from '@mui/material';

import DownloadIcon from '../assets/svg/download.svg';
import CustomButton from '../components/CustomButton';
import CustomToggleButtonGroup from '../components/CustomToggleButtonGroup';
import { Table } from '../components/Table';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { tableConfig } from '../pages/ExecutiveSummary/config';

const styles = (theme) => ({
  container: {
    padding: 16,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
  },
  headerText: {
    ...theme.typography.fontSizes.unitText,
    color: theme.palette.stroke,
    margin: 0,
  },
  weekDetails: {
    color: theme.palette.textBlack,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  switchTab: {
    border: `1px solid ${theme.palette.strokeTab}`,
    borderRadius: '4px !important',
  },
  toggleRoot: {
    padding: '6px 16px',
    borderRight: `1px solid ${theme.palette.strokeTab} !important`,
    background: theme.palette.textWhite,
    color: `${theme.palette.textDark}`,
    border: 'none',

    '& .MuiTouchRipple-root': {
      borderRight: `1px solid ${theme.palette.strokeTab} !important`,
    },
  },
  toggleRootLast: {
    padding: '6px 16px',
    background: theme.palette.textWhite,
    color: `${theme.palette.textDark}`,
    border: 'none',
  },
  toggleActive: {
    padding: '6px 16px',
    margin: -1,
    background: `${theme.palette.bgSwitch} !important`,
    color: `${theme.palette.textWhite} !important`,
    border: 'none',
  },
  switchTabText: {
    color: 'inherit',
    textTransform: 'capitalize',
    margin: 0,
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
  tableActionContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    marginTop: 16,
  },
});

const useStyles = makeStyles(styles);

const DashboardTable = (props) => {
  const classes = useStyles();
  const { data, state, categoryId, subCategoryId, finalize } = props;

  const [activeSwitchTab, setActiveSwitchTab] = useState('weekly');

  const handleSwitch = (_, newAlignment) => {
    setActiveSwitchTab(newAlignment);
  };

  return (
    <div className={classes.container}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          padding: '8px 40px',
        }}
      >
        <div className={classes.headerContainer}>
          <p className={classes.headerText}>
            Decision For Week: <span className={classes.weekDetails}>W38</span>
          </p>
          <CustomToggleButtonGroup
            value={activeSwitchTab}
            handleSwitch={handleSwitch}
            borderRadius={8}
            customClasses={{
              tab: classes.switchTab,
            }}
          >
            <ToggleButton
              value={'monthly'}
              aria-label='left aligned'
              classes={{
                root: classes.toggleRoot,
                selected: classes.toggleActive,
              }}
            >
              <p className={classes.switchTabText}>Monthly</p>
            </ToggleButton>
            <ToggleButton
              value={'weekly'}
              aria-label='left aligned'
              classes={{
                root: classes.toggleRoot,
                selected: classes.toggleActive,
              }}
            >
              <p className={classes.switchTabText}>Weekly</p>
            </ToggleButton>
            <ToggleButton
              value={'daily'}
              aria-label='left aligned'
              classes={{
                root: classes.toggleRootLast,
                selected: classes.toggleActive,
              }}
            >
              <p className={classes.switchTabText}>Daily</p>
            </ToggleButton>
          </CustomToggleButtonGroup>
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
                <SettingsApplicationsRoundedIcon
                  className={classes.iconButton}
                />
              }
              startIconClass={classes.startIcon}
              onButtonClick={() => console.log('1')}
            />
            <CustomButton
              isPrimary={false}
              variant='outlined'
              height={32}
              width={32}
              minWidth={0}
              padding={'16px'}
              label=''
              startIcon={<ContentCopyIcon className={classes.iconButton} />}
              startIconClass={classes.startIcon}
              onButtonClick={() => console.log('1')}
            />
            <CustomButton
              isPrimary={false}
              variant='outlined'
              height={32}
              width={32}
              minWidth={0}
              padding={'16px'}
              label=''
              startIcon={<EditRoundedIcon className={classes.iconButton} />}
              startIconClass={classes.startIcon}
              onButtonClick={() => console.log('1')}
            />
            <CustomButton
              isPrimary={false}
              variant='outlined'
              height={32}
              width={32}
              minWidth={0}
              padding={'16px'}
              label=''
              startIcon={
                <img
                  src={DownloadIcon}
                  alt='download'
                  className={classes.iconButton}
                />
              }
              startIconClass={classes.startIcon}
              onButtonClick={() => console.log('1')}
            />
            <CustomButton
              isPrimary={false}
              variant='outlined'
              height={32}
              width={32}
              minWidth={0}
              padding={'16px'}
              label=''
              startIcon={<DeleteIcon className={classes.iconButton} />}
              startIconClass={classes.startIcon}
              onButtonClick={() => console.log('1')}
            />
          </div>
        </div>
      </Box>
      <div>
        <Table
          rowData={data}
          columnDefs={tableConfig}
          pagination={true}
          floatingFilter={true}
          height={'620px'}
        />
        <div className={classes.tableActionContainer}>
          <CustomButton
            isPrimary={true}
            variant='contained'
            height={40}
            width={180}
            minWidth={0}
            padding={'16px'}
            label='Save and Refresh'
            startIcon={<SaveOutlinedIcon />}
            // startIconClass={classes.startIcon}
            onButtonClick={() => console.log('1')}
          />
          <CustomButton
            isPrimary={state < 8}
            variant={'contained'}
            disabled={state >= 8}
            height={40}
            width={140}
            minWidth={0}
            padding={'16px'}
            label='Finalize'
            startIcon={<InventoryOutlinedIcon />}
            // startIconClass={classes.startIcon}
            onButtonClick={() =>
              finalize(parseInt(state), categoryId, subCategoryId)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
