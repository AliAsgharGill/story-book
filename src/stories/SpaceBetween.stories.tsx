import { Meta, StoryObj } from "@storybook/react";
import { Button } from "antd";
import SpaceBetween, { SpaceBetweenProps } from "../components/SpaceBetween";

const meta: Meta<SpaceBetweenProps> = {
  tags: ["autodocs"],
  title: "Space/SpaceBetween",
  component: SpaceBetween,
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    justify: {
      control: { type: "select" },
      options: [
        "start",
        "center",
        "end",
        "space-between",
        "space-around",
        "space-evenly",
      ],
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end", "baseline", "stretch"],
    },
    gap: {
      control: { type: "text" },
    },
  },
};

export default meta;

type Story = StoryObj<SpaceBetweenProps>;

// Basic horizontal layout with space-between
export const RowSpaceBetween: Story = {
  args: {
    direction: "horizontal",
    justify: "space-between",
    gap: "16px",
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};

// Horizontal layout with centered content
export const RowSpaceCenter: Story = {
  args: {
    direction: "horizontal",
    justify: "center",
    gap: "16px",
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};

// Vertical layout with space-between
export const ColumnSpaceBetween: Story = {
  args: {
    direction: "vertical",
    justify: "space-between",
    gap: "16px",
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};

// Vertical layout with center alignment
export const ColumnSpaceCenter: Story = {
  args: {
    direction: "vertical",
    justify: "center",
    gap: "16px",
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};

// Horizontal layout with custom alignment
export const RowCustomAlign: Story = {
  args: {
    direction: "horizontal",
    justify: "space-evenly",
    align: "baseline",
    gap: "20px",
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};

// Vertical layout with custom gap
export const ColumnCustomGap: Story = {
  args: {
    direction: "vertical",
    justify: "space-around",
    gap: "30px",
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};
