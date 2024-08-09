import { Meta, StoryObj } from '@storybook/react';
import { Button } from 'antd';
import SpaceBetween, { SpaceBetweenProps } from '../components/SpaceBetween';

const meta: Meta<SpaceBetweenProps> = {
  tags:['autodocs'],
  title: 'Space/SpaceBetween',
  component: SpaceBetween,
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['horoizontal', 'vertical'],
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'space-between'],
    },
  },
};

export default meta;

type Story = StoryObj<SpaceBetweenProps>;

export const RowSpaceBetween: Story = {
  args: {
    direction: 'horizontal',
    justify: 'space-between',
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};

export const ColumnSpaceBetween: Story = {
  args: {
    direction: 'vertical',
    justify: 'space-between',
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};
