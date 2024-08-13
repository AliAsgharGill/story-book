/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Select, DatePicker, TimePicker, Checkbox, Typography } from "antd";
import { Dayjs } from "dayjs";
import styled from "styled-components";

const StyledButton = styled.button`
  /* CSS styles go here */
`;
const { Option } = Select;
const { Title } = Typography;

const Wrapper = styled.div`
  padding: 32px;
  background-color: #ffffff;
  border-radius: 16px;
  max-width: 800px;
  margin: auto;
  width: 800px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const StyledLabel = styled(Typography.Text)`
  font-weight: 600;
  color: #333;
  width: 150px;
  text-align: left;
`;

const StyledSelect = styled(Select)`
  flex: 1;
  .ant-select-selector {
    border-radius: 8px !important;
    height: 48px !important;
    padding: 0 16px !important;
    display: flex;
    align-items: center;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  flex: 1;
  .ant-picker {
    padding: 11px;
    border-radius: 8px !important;
    height: 48px !important;
    padding: 0 16px !important;
    display: flex;
    align-items: center;
  }
`;

const StyledTimePicker = styled(TimePicker)`
  flex: 1;
  .ant-picker {
    border-radius: 8px !important;
    height: 48px !important;
    padding: 0 16px !important;
    display: flex;
    align-items: center;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    border-radius: 4px;
  }
  margin-right: 8px;
`;

const DayCheckbox = styled(Checkbox)`
  margin-right: 12px;
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #f0f2f5;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6f7ff;
  }

  &.ant-checkbox-wrapper-checked {
    background-color: #bae7ff;
    border-color: #1890ff;
  }

  .ant-checkbox-inner {
    border-radius: 4px;
  }
`;

type OccurrenceType =
  | "One Time"
  | "Hourly Intervals"
  | "Daily"
  | "Weekly"
  | "Monthly"
  | "Yearly";
type ExecutionTimeType = "As soon as possible" | "Select time";
type RunningIntervalType =
  | "Every hour"
  | "Every 2 hours"
  | "Every 3 hours"
  | "Every 4 hours"
  | "Every 6 hours"
  | "Every 8 hours"
  | "Every 12 hours"
  | "Every 24 hours"
  | "Custom";

const timeZones = [
  { value: "Etc/GMT+12", label: "(GMT-12:00) International Date Line West" },
  { value: "Pacific/Midway", label: "(GMT-11:00) Midway Island, Samoa" },
  { value: "Pacific/Honolulu", label: "(GMT-10:00) Hawaii" },
  // ... (more time zones)
  { value: "Pacific/Fiji", label: "(GMT+12:00) Fiji, Kamchatka, Marshall Is." },
];

const SchedulePicker: React.FC = () => {
  const [occurrence, setOccurrence] = useState<OccurrenceType>("One Time");
  const [executionTime, setExecutionTime] = useState<ExecutionTimeType>(
    "As soon as possible"
  );
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);
  const [runningInterval, setRunningInterval] =
    useState<RunningIntervalType>("Every hour");
  const [specificHours, setSpecificHours] = useState<number[]>([]);
  const [specificMinutes, setSpecificMinutes] = useState<number>(0);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [specificDays, setSpecificDays] = useState<number[]>([]);
  const [specificMonths, setSpecificMonths] = useState<string[]>([]);

  const handleSpecificDaysChange = (value: number[], option: { value: number; label: React.ReactNode }[]) => {
    setSpecificDays(value);
  };
  

  const handleSpecificMonthsChange = (value: string[], option: { value: string; label: React.ReactNode }[]) => {
    setSpecificMonths(value);
  };
  
  const handleOccurrenceChange = (value: unknown) => {
    if (
      typeof value === "string" &&
      ["Daily", "Weekly", "Monthly", "Yearly"].includes(value)
    ) {
      setOccurrence(value as OccurrenceType);
    }
  };

  const handleExecutionTimeChange = (value: unknown) => {
    setExecutionTime(value as ExecutionTimeType);
  };

  const handleRunningIntervalChange = (value: unknown) => {
    setRunningInterval(value as RunningIntervalType);
  };
  const toggleWeekday = (day: string) => {
    setDaysOfWeek((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  return (
    <Wrapper>
      <Title level={3} style={{ marginBottom: "32px", textAlign: "left" }}>
        Schedule Picker
      </Title>

      <Section>
        <StyledLabel>Timezone</StyledLabel>
        <StyledSelect
          showSearch
          placeholder="Select Time Zone"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        >
          {timeZones.map((tz) => (
            <Option key={tz.value} value={tz.value} label={tz.label}>
              {tz.label}
            </Option>
          ))}
        </StyledSelect>
      </Section>

      <Section>
        <StyledLabel>Occurrence</StyledLabel>
        <StyledSelect<OccurrenceType>
          value={occurrence}
          onChange={handleOccurrenceChange}
          placeholder="Select Occurrence"
        >
          <Option value="One Time">One Time</Option>
          <Option value="Hourly Intervals">Hourly Intervals</Option>
          <Option value="Daily">Daily</Option>
          <Option value="Weekly">Weekly</Option>
          <Option value="Monthly">Monthly</Option>
          <Option value="Yearly">Yearly</Option>
        </StyledSelect>
      </Section>

      {occurrence === "One Time" && (
        <Section>
          <StyledLabel>Execution Time</StyledLabel>
          <StyledSelect<ExecutionTimeType>
            value={executionTime}
            onChange={handleExecutionTimeChange}
            placeholder="Select Execution Time"
          >
            <Option value="As soon as possible">As soon as possible</Option>
            <Option value="Select time">Select time</Option>
          </StyledSelect>
          {executionTime === "Select time" && (
            <StyledTimePicker
              onChange={setStartDate}
              placeholder="Select Time"
            />
          )}
        </Section>
      )}

      {occurrence === "Hourly Intervals" && (
        <>
          <Section>
            <StyledLabel>Start Date</StyledLabel>
            <StyledDatePicker
              onChange={(date: unknown, dateString: string | string[]) => {
                if (date instanceof Dayjs) {
                  setStartDate(date);
                }
              }}
              placeholder="Select Start Date"
            />

            <StyledCheckbox
              checked={showEndDate}
              onChange={(e) => setShowEndDate(e.target.checked)}
            >
              Set End Date
            </StyledCheckbox>
            {showEndDate && (
              <StyledDatePicker
                onChange={(date: unknown, dateString: string | string[]) => {
                  if (date instanceof Dayjs) {
                    setEndDate(date);
                  }
                }}
                placeholder="Select End Date"
              />
            )}
          </Section>

          <Section>
            <StyledLabel>Running Interval</StyledLabel>
            <StyledSelect<RunningIntervalType>
              value={runningInterval}
              onChange={handleRunningIntervalChange}
              placeholder="Select Running Interval"
            >
              <Option value="Every hour">Every hour</Option>
              <Option value="Every 2 hours">Every 2 hours</Option>
              <Option value="Every 3 hours">Every 3 hours</Option>
              <Option value="Every 4 hours">Every 4 hours</Option>
              <Option value="Every 6 hours">Every 6 hours</Option>
              <Option value="Every 8 hours">Every 8 hours</Option>
              <Option value="Every 12 hours">Every 12 hours</Option>
              <Option value="Every 24 hours">Every 24 hours</Option>
              <Option value="Custom">Custom</Option>
            </StyledSelect>
            {runningInterval === "Custom" && (
              <>
                <StyledSelect
                  mode="multiple"
                  value={specificHours}
                  onChange={(value, option) => {
                    if (Array.isArray(value)) {
                      setSpecificHours(value);
                    }
                  }}
                  placeholder="Select Specific Hours"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <Option key={i} value={i}>
                      {i}
                    </Option>
                  ))}
                </StyledSelect>

                <Section>
                  <StyledLabel>Select Specific Minutes</StyledLabel>
                  <StyledSelect
                    value={specificMinutes}
                    onChange={(value: unknown) => {
                      if (typeof value === "number") {
                        setSpecificMinutes(value);
                      }
                    }}
                    placeholder="Select Specific Minutes"
                  >
                    <Option value={0}>00</Option>
                    <Option value={15}>15</Option>
                    <Option value={30}>30</Option>
                    <Option value={45}>45</Option>
                  </StyledSelect>
                </Section>
              </>
            )}
          </Section>
        </>
      )}

      {occurrence === "Daily" && (
        <Section>
          <StyledLabel>Select Time</StyledLabel>
          <StyledTimePicker onChange={setStartDate} placeholder="Select Time" />
        </Section>
      )}

      {occurrence === "Weekly" && (
        <Section>
          <StyledLabel>Select Days of the Week</StyledLabel>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <DayCheckbox
                key={day}
                checked={daysOfWeek.includes(day)}
                onChange={() => toggleWeekday(day)}
              >
                {day}
              </DayCheckbox>
            ))}
          </div>
          <StyledTimePicker onChange={setStartDate} placeholder="Select Time" />
        </Section>
      )}

      {occurrence === "Monthly" && (
        <>
          <Section>
            <StyledLabel>Select Specific Days</StyledLabel>
            <StyledSelect
              mode="multiple"
              value={specificDays}
              onChange={handleSpecificDaysChange}
              placeholder="Select Specific Days"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </StyledSelect>
          </Section>
          <Section>
            <StyledLabel>Select Time</StyledLabel>
            <StyledTimePicker
              onChange={setStartDate}
              placeholder="Select Time"
            />
          </Section>
        </>
      )}

      {occurrence === "Yearly" && (
        <>
          <Section>
            <StyledLabel>Select Specific Months</StyledLabel>
            <StyledSelect
              mode="multiple"
              value={specificDays}
              onChange={handleSpecificDaysChange}
              placeholder="Select Specific Days"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </StyledSelect>

            <StyledSelect
              mode="multiple"
              value={specificMonths}
              onChange={handleSpecificMonthsChange}
              placeholder="Select Specific Months"
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <Option key={index} value={month}>
                  {month}
                </Option>
              ))}
            </StyledSelect>
          </Section>
          <Section>
            <StyledLabel>Select Time</StyledLabel>
            <StyledTimePicker
              onChange={setStartDate}
              placeholder="Select Time"
            />
          </Section>
        </>
      )}
    </Wrapper>
  );
};

export default SchedulePicker;
