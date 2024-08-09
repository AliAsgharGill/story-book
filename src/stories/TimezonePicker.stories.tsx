import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TimezonePicker from '../components/TimezonePicker'; 

interface TimezonePickerStoryProps extends TimezonePickerProps {}

const meta: Meta<TimezonePickerStoryProps> = {
  tags: ['autodocs'],
  title: 'TimeZone/TimezonePicker',
  component: TimezonePicker,
  parameters: {
    layout: 'start',
  },
};

export default meta;

type Story = StoryObj<TimezonePickerStoryProps>;

export const Default: Story = {
  args: {
    style: { width: 300 },
  },
};

export const WithCustomStyle: Story = {
  args: {
    style: { width: 400, border: '1px solid #000' },
  },
  render: (args) => <TimezonePicker {...args} />,
};

export const WithOnChangeHandler: Story = {
  args: {
    onChange: (value) => console.log('Selected Timezone:', value),
  },
};
