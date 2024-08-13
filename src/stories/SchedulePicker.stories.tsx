import { Meta, StoryObj } from "@storybook/react";
import SchedulePicker from "../components/SchedulePicker";

const meta: Meta<typeof SchedulePicker> = {
  title: "Schedule/SchedulePicker",
  component: SchedulePicker,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SchedulePicker>;

// Default SchedulePicker
export const Default: Story = {
  args: {},
};

// SchedulePicker with Hourly Intervals
export const HourlyIntervals: Story = {
  args: {
    occurrence: "Hourly Intervals",
    runningInterval: "Every 2 hours",
  },
};

// SchedulePicker with Daily Occurrence
export const DailyOccurrence: Story = {
  args: {
    occurrence: "Daily",
    startDate: null,
    endDate: null,
  },
};

// SchedulePicker with Weekly Occurrence and Specific Days
export const WeeklyOccurrence: Story = {
  args: {
    occurrence: "Weekly",
    daysOfWeek: ["Mon", "Wed", "Fri"],
  },
};

// SchedulePicker with Monthly Occurrence and Specific Days
export const MonthlyOccurrence: Story = {
  args: {
    occurrence: "Monthly",
    specificDays: [1, 15, 30],
  },
};

// SchedulePicker with Yearly Occurrence and Specific Months
export const YearlyOccurrence: Story = {
  args: {
    occurrence: "Yearly",
    specificMonths: ["January", "June", "December"],
    specificDays: [1],
  },
};

// SchedulePicker with Custom Hourly Intervals
export const CustomHourlyIntervals: Story = {
  args: {
    occurrence: "Hourly Intervals",
    runningInterval: "Custom",
    specificHours: [9, 12, 15],
    specificMinutes: 30,
  },
};

// SchedulePicker with Disabled End Date
export const NoEndDate: Story = {
  args: {
    occurrence: "Daily",
    startDate: null,
    showEndDate: false,
  },
};

// SchedulePicker with Pre-Selected Timezone
export const PreSelectedTimezone: Story = {
  args: {
    occurrence: "One Time",
    timeZone: "Pacific/Honolulu",
  },
};
