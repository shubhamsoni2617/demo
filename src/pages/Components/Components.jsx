import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import ToggleButton from '@mui/material/ToggleButton';
import SelectRenderer from '../../components/Select/SelectRenderer';
import CustomButton from '../../components/CustomButton';
import {
  colourOptions,
  radioOptions,
  data,
  dataHeaders,
  tabs,
  treeMapData,
  treeMapMetrics,
  dataCardValues,
  dataLabels,
} from './data';
import SimpleTable from '../../components/SimpleTable/SimpleTable';
import SimpleTabs from '../../components/SimpleTabs';
import CustomToggleButtonGroup from '../../components/CustomToggleButtonGroup';
import CustomRadioGroup from '../../components/CustomRadioGroup';
import CustomDateRangePicker from '../../components/CustomDateRangePicker';
import CustomDatePicker from '../../components/CustomDatePicker';
import CheckboxGroup from '../../components/CheckboxGroup';
import CustomCard from '../../components/CustomCard';

import Chart from '../../utils/charts/Chart';

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import DataCard from '../../components/DataCard';
import DataLabels from '../../components/DataLabels';
import { Divider } from '@mui/material';

const styles = (theme) => ({
  componentContainer: {
    margin: '16px 0 24px 0',
  },
  header: {
    fontSize: '1.5rem',
    color: theme.palette.textDark,
    margin: 0,
    marginBottom: 16,
    padding: '16px 8px',
    borderBottom: `0.5px solid ${theme.palette.stroke}`,
  },
  container: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
  },
  title: {
    margin: '30px 10px 10px 10px',
    textAlign: 'left',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  toggleRoot: {
    padding: '8px',
    background: theme.palette.bgBadgeLight,
    border: 'none',
  },
  toggleActive: {
    padding: '8px',
    background: `${theme.palette.textWhite} !important`,
    border: 'none',
  },
});

const useStyles = makeStyles(styles);

const Components = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [gender, setGender] = useState(null);
  const [activeSwitchTab, setActiveSwitchTab] = useState('line');
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [date, setDate] = useState(new Date());
  const [checkboxesValues, setCheckboxesValues] = useState({
    male: true,
    female: false,
    other: false,
  });

  const handleDateRangeChange = (values) => {
    setDates([...values]);
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  const handleOnSelect = (value) => {
    console.log('value', value);
  };

  const handleChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  const handleSwitch = (_, newAlignment) => {
    setActiveSwitchTab(newAlignment);
  };

  const setSelected = (items) => {
    console.log('Items', items);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const values = { ...checkboxesValues };
    values[e.target.name] = !values[e.target.name];

    setCheckboxesValues(values);
  };

  const handleDrilldown = (item) => {
    console.log(item);
    // Add new filter - Optional to add to actual filter
    // New filter mimic same action as filter selection (redux) - optional
    // Call the API again with new filter - get filter from saved filters and add any new params

    // Get aggregate value from currently selectedHierarchy
    // Get hierarchy options from last saved filters and config down to CT
    // setTreemapExtraFilter(extraFilters);

    // Add extra filters to last saved filters and make API call to get new itemSummary
  };

  const tooltip = {
    enable: true,
    useHtml: true,
    formatter: function (tooltipData) {
      // Find the current item in other metrics and add to variance object
      const variance = {};
      if (tooltipData && tooltipData.id) {
        const itemId = tooltipData.id;
        treeMapData.map((metric) => {
          const currentItem = metric.items.find((item) => item.id === itemId);
          if (currentItem && !_.isEmpty(currentItem.variance)) {
            let actual = currentItem.variance.find((v) =>
              v.variance_type.includes('actual')
            );
            let recommended = currentItem.variance.find((v) =>
              v.variance_type.includes('ia_recommendation')
            );
            let finalized = currentItem.variance.find((v) =>
              v.variance_type.includes('final_forecast')
            );

            variance[metric.metric_name] = {
              current: actual && actual.value,
              recommended: recommended && recommended.value,
              finalized: finalized && finalized.value,
            };
          }
        });
      }
      let tableData = '';
      for (const [key, value] of Object.entries(variance)) {
        let displayName =
          treeMapMetrics &&
          !_.isEmpty(treeMapMetrics) &&
          treeMapMetrics.filter((metric) => metric.key === key);
        displayName =
          displayName && displayName.length ? displayName[0].display : key;
        tableData +=
          '<tr> <td>' +
          displayName +
          ' </td>' +
          '<td>' +
          (value.current ? value.current + '%' : '-') +
          '</td>' +
          '<td>' +
          (value.recommended ? value.recommended + '%' : '-') +
          '</td>' +
          '<td>' +
          (value.finalized ? value.finalized + '%' : '-') +
          '</td> </tr>';
      }

      return (
        "<table class='treemap-hover-table'>" +
        '<tr> <th></th>' +
        '<th>Current  </th>' +
        '<th>Recommended  </th>' +
        '<th>Finalized  </th> </tr>' +
        tableData +
        '</table>'
      );
    },
  };

  return (
    <div>
      <div>
        <div className={classes.componentContainer}>
          <p className={classes.header}>Select Fields</p>
          <div className={classes.container}>
            <SelectRenderer
              options={colourOptions}
              selectedItems={[]}
              isMandatory={true}
              isMulti={false}
              filterLabel={'Single'}
              type={'abc'}
              width={200}
              updateSelected={handleOnSelect}
            />
            <SelectRenderer
              options={colourOptions}
              selectedItems={[]}
              isMandatory={true}
              isMulti={true}
              filterLabel={'Multi-Select'}
              type={'abc'}
              width={200}
              updateSelected={handleOnSelect}
            />
            <SelectRenderer
              options={colourOptions}
              selectedItems={[]}
              isMandatory={false}
              isMulti={false}
              filterLabel={'Single'}
              type={'abc'}
              width={200}
              updateSelected={handleOnSelect}
            />
            <SelectRenderer
              options={colourOptions}
              selectedItems={[]}
              isMandatory={false}
              isMulti={true}
              filterLabel={'Multi-Select'}
              type={'abc'}
              width={200}
              updateSelected={handleOnSelect}
            />
          </div>
        </div>

        <div className={classes.componentContainer}>
          <p className={classes.header}>Input Date Range Fields</p>
          <div className={classes.container}>
            <CustomDateRangePicker
              label={'Time Period'}
              labeldirection={'column'}
              values={dates}
              width={200}
              fieldWidth={200}
              isMandatory={true}
              onChange={handleDateRangeChange}
            />
            <CustomDateRangePicker
              label={'Time Period'}
              labeldirection={'column'}
              values={dates}
              width={200}
              fieldWidth={200}
              isMandatory={false}
              onChange={handleDateRangeChange}
            />
            <CustomDateRangePicker
              label={'Time Period'}
              labeldirection={'row'}
              values={dates}
              width={400}
              fieldWidth={200}
              isMandatory={true}
              onChange={handleDateRangeChange}
            />
            <CustomDateRangePicker
              label={'Time Period'}
              labeldirection={'row'}
              values={dates}
              width={200}
              fieldWidth={200}
              isMandatory={false}
              onChange={handleDateRangeChange}
            />
          </div>
        </div>

        <div className={classes.componentContainer}>
          <p className={classes.header}>Input Date Fields</p>
          <div className={classes.container}>
            <CustomDatePicker
              label={'Time Period'}
              labeldirection={'column'}
              values={date}
              width={200}
              fieldWidth={200}
              isMandatory={true}
              onChange={handleDateChange}
            />
            <CustomDatePicker
              label={'Time Period'}
              labeldirection={'column'}
              values={date}
              width={200}
              fieldWidth={200}
              isMandatory={false}
              onChange={handleDateChange}
            />
            <CustomDatePicker
              label={'Time Period'}
              labeldirection={'row'}
              values={date}
              width={400}
              fieldWidth={200}
              isMandatory={true}
              onChange={handleDateChange}
            />
            <CustomDatePicker
              label={'Time Period'}
              labeldirection={'row'}
              values={date}
              width={200}
              fieldWidth={200}
              isMandatory={false}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className={classes.componentContainer}>
          <p className={classes.header}>Buttons</p>
          <div className={classes.container}>
            <CustomButton
              isPrimary={true}
              variant='contained'
              height={32}
              width={120}
              label='Optimize'
              onButtonClick={() => console.log('1')}
            />
            <CustomButton
              isPrimary={false}
              variant='contained'
              height={32}
              width={120}
              label='Optimize'
              onButtonClick={() => console.log('1')}
            />
            <CustomButton
              isPrimary={true}
              variant='outlined'
              height={32}
              width={120}
              label='Optimize'
              onButtonClick={() => console.log('1')}
            />
            <CustomButton
              isPrimary={false}
              variant='outlined'
              height={32}
              width={120}
              label='Optimize'
              onButtonClick={() => console.log('1')}
            />
            <CustomButton
              isPrimary={true}
              variant='contained'
              height={32}
              width={120}
              label='Filter'
              startIcon={<FilterAltOutlinedIcon />}
              onButtonClick={() => console.log('1')}
            />
            <CustomButton
              isPrimary={false}
              variant='outlined'
              height={32}
              width={120}
              label='Reset'
              startIcon={<RefreshIcon />}
              onButtonClick={() => console.log('1')}
            />
          </div>
        </div>

        <div className={classes.componentContainer}>
          <p className={classes.header}>Simple Tabs</p>
          <div className={classes.container}>
            <SimpleTabs
              items={tabs}
              value={tabIndex}
              handleChange={handleChange}
            />
          </div>
        </div>

        <div className={classes.componentContainer}>
          <p className={classes.header}>Switch Tabs</p>
          <div className={classes.container}>
            <CustomToggleButtonGroup
              value={activeSwitchTab}
              handleSwitch={handleSwitch}
            >
              <ToggleButton
                value={'line'}
                aria-label='left aligned'
                classes={{
                  root: classes.toggleRoot,
                  selected: classes.toggleActive,
                }}
              >
                <TimelineOutlinedIcon />
              </ToggleButton>
              <ToggleButton
                value={'bar'}
                aria-label='left aligned'
                classes={{
                  root: classes.toggleRoot,
                  selected: classes.toggleActive,
                }}
              >
                <BarChartOutlinedIcon />
              </ToggleButton>
            </CustomToggleButtonGroup>

            <CustomToggleButtonGroup
              value={activeSwitchTab}
              handleSwitch={handleSwitch}
            >
              <ToggleButton
                value={'line'}
                aria-label='left aligned'
                classes={{
                  root: classes.toggleRoot,
                  selected: classes.toggleActive,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <TimelineOutlinedIcon style={{ marginRight: 8 }} />
                  Line Chart
                </div>
              </ToggleButton>
              <ToggleButton
                value={'bar'}
                aria-label='left aligned'
                classes={{
                  root: classes.toggleRoot,
                  selected: classes.toggleActive,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <BarChartOutlinedIcon style={{ marginRight: 8 }} />
                  Bar Chart
                </div>
              </ToggleButton>
            </CustomToggleButtonGroup>

            <CustomToggleButtonGroup
              value={activeSwitchTab}
              handleSwitch={handleSwitch}
            >
              <ToggleButton
                value={'line'}
                aria-label='left aligned'
                classes={{
                  root: classes.toggleRoot,
                  selected: classes.toggleActive,
                }}
              >
                Active
              </ToggleButton>
              <ToggleButton
                value={'bar'}
                aria-label='left aligned'
                classes={{
                  root: classes.toggleRoot,
                  selected: classes.toggleActive,
                }}
              >
                Passive
              </ToggleButton>
            </CustomToggleButtonGroup>
          </div>
        </div>

        <div className={classes.componentContainer}>
          <p className={classes.header}>Radio Group</p>
          <div className={classes.container}>
            <CustomRadioGroup
              label={'Gender Row'}
              options={radioOptions}
              value={gender}
              handleChange={handleGenderChange}
              row={true}
            />

            <CustomRadioGroup
              label={'Gender Col'}
              options={radioOptions}
              value={gender}
              handleChange={handleGenderChange}
              row={false}
            />
          </div>
        </div>

        <div className={classes.componentContainer}>
          <p className={classes.header}>Checkbox Group</p>
          <div className={classes.container}>
            <CheckboxGroup
              label={'Gender Row'}
              options={radioOptions}
              values={checkboxesValues}
              handleChange={handleCheckboxChange}
              row={true}
            />

            <CheckboxGroup
              label={'Gender Col'}
              options={radioOptions}
              values={checkboxesValues}
              handleChange={handleCheckboxChange}
              row={false}
            />
          </div>
        </div>

        <div className={classes.componentContainer}>
          <p className={classes.header}>Data Cards</p>
          <div className={classes.container}>
            {dataCardValues?.map((value) => (
              <div style={{ width: 400 }} key={`value.type`}>
                <CustomCard>
                  <DataCard data={value} />
                </CustomCard>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.componentContainer}>
          <p className={classes.header}>Data Labels</p>
          <CustomCard>
            <div
              className={classes.container}
              style={{ border: '0.5px solid #CCD8E3', borderRadius: 4 }}
            >
              {Object.keys(dataLabels)?.map((key, index) => (
                <DataLabels key={key} label={key} value={dataLabels[key]} />
              ))}
            </div>
          </CustomCard>
        </div>

        <div className={classes.componentContainer}>
          <p className={classes.header}>Simple Table</p>
          <div className={classes.container}>
            <div style={{ width: 320 }}>
              <SimpleTable
                title={'Variance from Plan'}
                titleClass={classes.title}
                headers={dataHeaders}
                data={data}
              />
            </div>
          </div>
        </div>

        <div className={classes.componentContainer}>
          <p className={classes.header}>Charts - Map</p>
          <div className={classes.container}>
            <div style={{ margin: 8, width: 720 }}>
              <Chart
                chartType='treemap'
                drilldown={true}
                select={true}
                height='360px'
                data={
                  treeMapData.find(
                    (data) => data.metric_name === 'gross_margin'
                  )
                    ? treeMapData.find(
                        (data) => data.metric_name === 'gross_margin'
                      ).items
                    : []
                }
                tooltip={tooltip}
                setSelectedItems={(items) => setSelected(items)}
                handleDrilldown={(selectedItem) =>
                  handleDrilldown(selectedItem)
                }
                seriesName='SBU'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Components;
