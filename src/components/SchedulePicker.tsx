/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Select, DatePicker, TimePicker, Checkbox, Typography } from "antd";
import styled from "styled-components";
import { Dayjs } from "dayjs";

const { Option } = Select;
const { Title } = Typography;

interface OptionType {
  label: string;
  value: string;
}

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
  { "value": "Etc/GMT+12", "label": "(GMT-12:00) International Date Line West" },
  { "value": "Pacific/Midway", "label": "(GMT-11:00) Midway Island, Samoa" },
  { "value": "Pacific/Honolulu", "label": "(GMT-10:00) Hawaii" },
  { "value": "America/Anchorage", "label": "(GMT-09:00) Alaska" },
  { "value": "America/Los_Angeles", "label": "(GMT-08:00) Pacific Time (US & Canada)" },
  { "value": "America/Denver", "label": "(GMT-07:00) Mountain Time (US & Canada)" },
  { "value": "America/Chicago", "label": "(GMT-06:00) Central Time (US & Canada)" },
  { "value": "America/New_York", "label": "(GMT-05:00) Eastern Time (US & Canada)" },
  { "value": "America/Halifax", "label": "(GMT-04:00) Atlantic Time (Canada)" },
  { "value": "America/Argentina/Buenos_Aires", "label": "(GMT-03:00) Buenos Aires, Georgetown" },
  { "value": "Atlantic/South_Georgia", "label": "(GMT-02:00) Mid-Atlantic" },
  { "value": "Atlantic/Azores", "label": "(GMT-01:00) Azores" },
  { "value": "Europe/London", "label": "(GMT+00:00) Greenwich Mean Time, London" },
  { "value": "Europe/Berlin", "label": "(GMT+01:00) Central European Time" },
  { "value": "Europe/Athens", "label": "(GMT+02:00) Eastern European Time" },
  { "value": "Europe/Moscow", "label": "(GMT+03:00) Moscow Time" },
  { "value": "Asia/Dubai", "label": "(GMT+04:00) Gulf Standard Time" },
  { "value": "Asia/Karachi", "label": "(GMT+05:00) Pakistan Standard Time" },
  { "value": "Asia/Dhaka", "label": "(GMT+06:00) Bangladesh Standard Time" },
  { "value": "Asia/Bangkok", "label": "(GMT+07:00) Indochina Time" },
  { "value": "Asia/Shanghai", "label": "(GMT+08:00) China Standard Time" },
  { "value": "Asia/Tokyo", "label": "(GMT+09:00) Japan Standard Time" },
  { "value": "Australia/Sydney", "label": "(GMT+10:00) Australian Eastern Standard Time" },
  { "value": "Pacific/Guadalcanal", "label": "(GMT+11:00) Solomon Islands, Vanuatu" },
  { "value": "Pacific/Fiji", "label": "(GMT+12:00) Fiji, Kamchatka" }
]


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

  const handleSpecificDaysChange = (value: number[]) => setSpecificDays(value);

  const handleSpecificMonthsChange = (value: string[]) =>
    setSpecificMonths(value);

  const handleOccurrenceChange = (value: unknown) =>
    setOccurrence(value as OccurrenceType);

  const handleExecutionTimeChange = (value: unknown) =>
    setExecutionTime(value as ExecutionTimeType);

  const handleRunningIntervalChange = (value: unknown) =>
    setRunningInterval(value as RunningIntervalType);

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
              onChange={(date) => setStartDate(date as Dayjs)}
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
                onChange={(date) => setEndDate(date as Dayjs)}
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
          </Section>

          {runningInterval === "Custom" && (
            <>
              <Section>
                <StyledLabel>Specific Hours</StyledLabel>
                {/* eslint-disable @typescript-eslint/no-explicit-any  */}
                <StyledSelect<any>
                  mode="multiple"
                  value={specificHours}
                  onChange={(value: any) => setSpecificHours(value as number[])}
                  placeholder="Select Specific Hours"
                >
                  {[...Array(24).keys()].map((hour) => (
                    <Option key={hour} value={hour}>
                      {hour < 10 ? `0${hour}:00` : `${hour}:00`}
                    </Option>
                  ))}
                </StyledSelect>
                /* eslint-disable @typescript-eslint/no-explicit-any */
                <StyledSelect<any>
                  value={specificMinutes}
                  onChange={(value: any) => setSpecificMinutes(value as number)}
                  placeholder="Select Specific Minutes"
                >
                  {[0, 15, 30, 45].map((minute) => (
                    <Option key={minute} value={minute}>
                      {minute < 10 ? `0${minute}` : minute}
                    </Option>
                  ))}
                </StyledSelect>
              </Section>
            </>
          )}
        </>
      )}

      {occurrence === "Daily" && (
        <>
          <Section>
            <StyledLabel>Start Date</StyledLabel>
            <StyledDatePicker
              onChange={(date) => setStartDate(date as Dayjs)}
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
                onChange={(date) => setEndDate(date as Dayjs)}
                placeholder="Select End Date"
              />
            )}
          </Section>
          <Section>
            <StyledLabel>Specific Time</StyledLabel>
            <StyledTimePicker
              onChange={setStartDate}
              placeholder="Select Specific Time"
            />
          </Section>
        </>
      )}

      {occurrence === "Weekly" && (
        <>
          <Section>
            <StyledLabel>Start Date</StyledLabel>
            <StyledDatePicker
              onChange={(date) => setStartDate(date as Dayjs)}
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
                onChange={(date) => setEndDate(date as Dayjs)}
                placeholder="Select End Date"
              />
            )}
          </Section>
          <Section>
            <StyledLabel>Days of Week</StyledLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <DayCheckbox
                  key={day}
                  checked={daysOfWeek.includes(day)}
                  onChange={() => toggleWeekday(day)}
                >
                  {day}
                </DayCheckbox>
              ))}
            </div>
          </Section>
          <Section>
            <StyledLabel>Specific Time</StyledLabel>
            <StyledTimePicker
              onChange={setStartDate}
              placeholder="Select Specific Time"
            />
          </Section>
        </>
      )}

      {occurrence === "Monthly" && (
        <>
          <Section>
            <StyledLabel>Start Date</StyledLabel>
            <StyledDatePicker
              onChange={(date) => setStartDate(date as Dayjs)}
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
                onChange={(date) => setEndDate(date as Dayjs)}
                placeholder="Select End Date"
              />
            )}
          </Section>
          <Section>
            <StyledLabel>Specific Days</StyledLabel>
            /* eslint-disable @typescript-eslint/no-explicit-any */
            <StyledSelect<any>
              mode="multiple"
              value={specificDays[0]}
              onChange={(value: any) =>
                handleSpecificDaysChange([value as number])
              }
              placeholder="Select Specific Days"
            >
              {[...Array(31).keys()].map((day) => (
                <Option key={day + 1} value={day + 1}>
                  {day + 1}
                </Option>
              ))}
            </StyledSelect>
          </Section>
          <Section>
            <StyledLabel>Specific Time</StyledLabel>
            <StyledTimePicker
              onChange={setStartDate}
              placeholder="Select Specific Time"
            />
          </Section>
        </>
      )}

      {occurrence === "Yearly" && (
        <>
          <Section>
            <StyledLabel>Start Date</StyledLabel>
            <StyledDatePicker
              onChange={(date) => setStartDate(date as Dayjs)}
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
                onChange={(date) => setEndDate(date as Dayjs)}
                placeholder="Select End Date"
              />
            )}
          </Section>
          <Section>
            <StyledLabel>Specific Months</StyledLabel>
            {/* eslint-disable @typescript-eslint/no-explicit-any  */}
            <StyledSelect<any>
              mode="multiple"
              value={specificMonths}
              onChange={(value: any) =>
                handleSpecificMonthsChange(value as string[])
              }
              placeholder="Select Specific Months"
            >
              {[
                { label: "January", value: "January" },
                { label: "February", value: "February" },
                { label: "March", value: "March" },
                { label: "April", value: "April" },
                { label: "May", value: "May" },
                { label: "June", value: "June" },
                { label: "July", value: "July" },
                { label: "August", value: "August" },
                { label: "September", value: "September" },
                { label: "October", value: "October" },
                { label: "November", value: "November" },
                { label: "December", value: "December" },
              ].map((month) => (
                <Option key={month.value} value={month.value}>
                  {month.label}
                </Option>
              ))}
            </StyledSelect>
          </Section>
          <Section>
            <StyledLabel>Specific Days</StyledLabel>
            {/* eslint-disable @typescript-eslint/no-explicit-any */}
            <StyledSelect<any>
              mode="multiple"
              value={specificDays}
              onChange={(value: any) =>
                handleSpecificDaysChange(value as number[])
              }
              placeholder="Select Specific Days"
            >
              {[...Array(31).keys()].map((day) => (
                <Option key={day + 1} value={day + 1}>
                  {day + 1}
                </Option>
              ))}
            </StyledSelect>
          </Section>
          <Section>
            <StyledLabel>Specific Time</StyledLabel>
            <StyledTimePicker
              onChange={setStartDate}
              placeholder="Select Specific Time"
            />
          </Section>
        </>
      )}
    </Wrapper>
  );
};

export default SchedulePicker;

const Wrapper = styled.div<{ width?: string; height?: string }>`
  padding: 32px;
  background-color: #ffffff;
  border-radius: 16px;
  max-width: 800px;
  margin: auto;
  width: ${({ width }) => width || "700px"};
  height: ${({ height }) => height || "auto"};
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
