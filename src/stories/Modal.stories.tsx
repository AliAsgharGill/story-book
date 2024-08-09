import { Meta, StoryObj } from "@storybook/react";
import ModalComponent from "../components/Modal";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof ModalComponent>;

const meta: Meta<StoryProps> = {
  title: "Modal/ModalComponent",
  component: ModalComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
  args: {
    title: "Basic Modal",
    buttonText: "Open Modal",
    content: ["Some contents...", "Some contents...", "Some contents..."],
  },
};
