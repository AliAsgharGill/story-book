import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "../components/Button";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Button> & {
  buttonText: string;
};

const meta: Meta<StoryProps> = {
  title: "CommonComponents/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
  args: {
    bgColor: "blue",
    textColor: "white",
    buttonText: "Button",
    variant: "primary",
    size: "md",
    disabled: true,
    children: "Button",
  },
  render: ({ buttonText, ...args }) => <Button {...args}>{buttonText}</Button>,
};

export const Secondary: Story = {
  args: {
    textColor: "black",
    bgColor: "gray",
    buttonText: "Button",
    variant: "secondary",
    size: "md",
    children: "Button",
  },
  render: ({ buttonText, ...args }) => <Button {...args}>{buttonText}</Button>,
};
