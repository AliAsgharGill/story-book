import { Meta, StoryObj } from "@storybook/react";
import SchedulePicker from "../components/SchedulePicker";
import moment from "moment-timezone";

export default {
  title: "Components/SchedulePicker",
  component: SchedulePicker,
  tags: ["autodocs"],
} as Meta;

const Template: StoryObj<any> = (args) => <SchedulePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  scheduler: {
    start_date: new Date("2024-03-27"),
    end_date: new Date("2024-04-30"),
    cadence: "day",
    hour: "18",
    minute: "25",
    timezone: "America/New_York",
  },
  onChange: (value) => console.log("Schedule changed:", value),
  isValid: (value) => console.log("Is schedule valid:", value),
};

export const CustomDateRange = Template.bind({});
CustomDateRange.args = {
  scheduler: {
    start_date: new Date("2024-05-01"),
    end_date: new Date("2024-06-01"),
    cadence: "week",
    hour: "09",
    minute: "00",
    timezone: "Europe/London",
  },
  onChange: (value) => console.log("Custom schedule changed:", value),
  isValid: (value) => console.log("Is custom schedule valid:", value),
};

export const DifferentTimezone = Template.bind({});
DifferentTimezone.args = {
  scheduler: {
    start_date: new Date("2024-07-01"),
    end_date: new Date("2024-08-01"),
    cadence: "month",
    hour: "12",
    minute: "45",
    timezone: "Asia/Tokyo",
  },
  onChange: (value) => console.log("Timezone schedule changed:", value),
  isValid: (value) => console.log("Is timezone schedule valid:", value),
};

export const InvalidSchedule = Template.bind({});
InvalidSchedule.args = {
  scheduler: {
    start_date: new Date("2024-09-01"),
    end_date: new Date("2024-08-01"), // End date before start date to simulate invalid state
    cadence: "year",
    hour: "23",
    minute: "59",
    timezone: "America/Los_Angeles",
  },
  onChange: (value) => console.log("Invalid schedule changed:", value),
  isValid: (value) => console.log("Is invalid schedule valid:", value),
};
