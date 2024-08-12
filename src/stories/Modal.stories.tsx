import { Meta, StoryObj } from "@storybook/react";
import ModalComponent from "../components/Modal";
import { Button } from "antd";

const meta: Meta<typeof ModalComponent> = {
  title: "Modal/ModalComponent",
  component: ModalComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ModalComponent>;

// Basic Modal
export const Primary: Story = {
  args: {
    title: "Basic Modal",
    buttonText: "Open Modal",
    children: (
      <>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </>
    ),
  },
};

// Modal without footer
export const ModalWithoutFooter: Story = {
  args: {
    title: "Basic Modal",
    buttonText: "Open Modal",
    children: (
      <>
        <p>Some contents...</p>
        <p>I have no footer...</p>
      </>
    ),
    footer: null,
  },
};

// Modal with Loading State
export const Loading: Story = {
  args: {
    title: "Loading Modal",
    buttonText: "Open Modal",
    loading: true,
    children: <p>This modal is in a loading state.</p>,
  },
};

// Modal with Alert
export const WithAlert: Story = {
  args: {
    title: "Modal with Alert",
    buttonText: "Open Modal",
    showAlert: true,
    alertType: "warning",
    alertMessage: "This is a warning alert!",
    children: <p>This modal shows an alert at the top.</p>,
  },
};

// Modal with Custom Footer and Buttons
export const CustomFooter: Story = {
  args: {
    title: "Modal with Custom Footer",
    buttonText: "Open Modal",
    footer: (
      <div>
        <Button onClick={() => console.log("Custom OK clicked")}>
          Custom OK
        </Button>
        <Button onClick={() => console.log("Custom Cancel clicked")}>
          Custom Cancel
        </Button>
      </div>
    ),
    children: <p>This modal has a custom footer.</p>,
  },
};

// Modal with Conditional Text
export const ConditionalText: Story = {
  args: {
    title: "Modal with Conditional Text",
    buttonText: "Open Modal",
    showText: true,
    textToShow: "Here is some additional dynamic text.",
    children: (
      <>
        <p>This modal conditionally displays extra text.</p>
        <p>This modal conditionally displays extra text.</p>
        <p>This modal conditionally displays extra text.</p>
      </>
    ),
  },
};

// Centered Modal
export const CenteredModal: Story = {
  args: {
    title: "Centered Modal",
    buttonText: "Open Modal",
    centered: true,
    children: <p>This modal is centered vertically.</p>,
  },
};

// Modal with Non-Closable Mask
export const NonClosableMask: Story = {
  args: {
    title: "Non-Closable Mask Modal",
    buttonText: "Open Modal",
    maskClosable: false,
    children: <p>Clicking outside will not close this modal.</p>,
  },
};

// Modal with After Close Callback
export const AfterCloseCallback: Story = {
  args: {
    title: "Modal with After Close Callback",
    buttonText: "Open Modal",
    afterClose: () => console.log("Modal closed after callback"),
    children: <p>This modal triggers a callback after closing.</p>,
  },
};
