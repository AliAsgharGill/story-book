import { Meta, StoryObj } from '@storybook/react';
import TimezonePicker, { TimezonePickerProps } from '../components/TimezonePicker';

const meta: Meta<TimezonePickerProps> = {
  tags: ['autodocs'],
  title: 'TimeZone/TimezonePicker',
  component: TimezonePicker,
  parameters: {
    layout: 'start',
  },
};

export default meta;

type Story = StoryObj<TimezonePickerProps>;

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
    onChange: (value: string | null) => {
      console.log('Selected Timezone:', value);
    },
  },
};
