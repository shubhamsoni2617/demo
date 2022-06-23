import React from 'react';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CustomButton from './CustomButton';

export default {
  title: 'components/CustomButton',
  component: CustomButton,
};

const Template = (args) => {
  return <CustomButton {...args} />;
};
export const PrimaryContained = Template.bind({});
PrimaryContained.args = {
  isPrimary: true,
  variant: 'contained',
  height: 32,
  width: 72,
  label: 'Filter',
};

export const SecondaryContained = Template.bind({});
SecondaryContained.args = {
  isPrimary: false,
  variant: 'contained',
  height: 32,
  width: 72,
  label: 'Filter',
};

export const PrimaryOutlined = Template.bind({});
PrimaryOutlined.args = {
  isPrimary: true,
  variant: 'outlined',
  height: 32,
  width: 72,
  label: 'Filter',
};

export const SecondaryOutlined = Template.bind({});
SecondaryOutlined.args = {
  isPrimary: false,
  variant: 'outlined',
  height: 32,
  width: 72,
  label: 'Filter',
};

export const PrimaryContainedStartIcon = Template.bind({});
PrimaryContainedStartIcon.args = {
  isPrimary: true,
  variant: 'contained',
  height: 32,
  width: 72,
  label: 'Cold',
  startIcon: <AcUnitIcon />,
};

export const PrimaryContainedEndIcon = Template.bind({});
PrimaryContainedEndIcon.args = {
  isPrimary: true,
  variant: 'contained',
  height: 32,
  width: 72,
  label: 'Cold',
  endIcon: <AcUnitIcon />,
};
