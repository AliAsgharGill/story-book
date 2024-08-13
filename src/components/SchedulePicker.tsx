import React, { useState } from 'react';
import { Select, DatePicker, TimePicker, Checkbox } from 'antd';
import styled from 'styled-components';
import { Dayjs } from 'dayjs';

const { Option } = Select;

type OccurrenceType = 'One Time' | 'Hourly Intervals' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
type ExecutionTimeType = 'As soon as possible' | 'Select time';
type RunningIntervalType = 'Every hour' | 'Every 2 hours' | 'Every 3 hours' | 'Every 4 hours' | 'Every 6 hours' | 'Every 8 hours' | 'Every 12 hours' | 'Every 24 hours' | 'Custom';

interface SchedulePickerProps {
  timeZones: string[];
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  background-color: #f7f8fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  .ant-select-selector {
    border-radius: 8px !important;
    height: 48px !important;
    padding: 0 16px !important;
    display: flex;
    align-items: center;
    background-color: #ffffff !important;
    border-color: #d9d9d9 !important;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 48px !important;
  .ant-picker-input > input {
    height: 48px !important;
    padding: 0 16px !important;
  }
  .ant-picker {
    border-radius: 8px !important;
  }
`;

const StyledTimePicker = styled(TimePicker)`
  width: 100%;
  height: 48px !important;
  .ant-picker-input > input {
    height: 48px !important;
    padding: 0 16px !important;
  }
  .ant-picker {
    border-radius: 8px !important;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    border-radius: 4px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DaySelection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`;

const DayCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    border-radius: 4px;
  }
  margin-right: 8px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  color: #595959;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 20px;
  color: #1a1a1a;
  margin-bottom: 24px;
  font-weight: 600;
  text-align: center;
`;

const SchedulePicker: React.FC<SchedulePickerProps> = ({ timeZones }) => {
  const [occurrence, setOccurrence] = useState<OccurrenceType>('One Time');
  const [executionTime, setExecutionTime] = useState<ExecutionTimeType>('As soon as possible');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [runningInterval, setRunningInterval] = useState<RunningIntervalType>('Every hour');
  const [specificHours, setSpecificHours] = useState<number[]>([]);
  const [specificMinutes, setSpecificMinutes] = useState<number>(0);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [specificDays, setSpecificDays] = useState<number[]>([]);
  const [specificMonths, setSpecificMonths] = useState<string[]>([]);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);

  const handleOccurrenceChange = (value: OccurrenceType) => setOccurrence(value);
  const handleExecutionTimeChange = (value: ExecutionTimeType) => setExecutionTime(value);
  const handleRunningIntervalChange = (value: RunningIntervalType) => setRunningInterval(value);

  const toggleWeekday = (day: string) => {
    if (daysOfWeek.includes(day)) {
      setDaysOfWeek(daysOfWeek.filter(d => d !== day));
    } else {
      setDaysOfWeek([...daysOfWeek, day]);
    }
  };

  return (
    <Wrapper>
      <Title>Schedule Picker</Title>
      
      <Section>
        <StyledLabel>Select Time Zone</StyledLabel>
        <StyledSelect placeholder="Select Time Zone">
          {timeZones.map((zone) => (
            <Option key={zone} value={zone}>
              {zone}
            </Option>
          ))}
        </StyledSelect>
      </Section>

      <Section>
        <StyledLabel>Select Occurrence</StyledLabel>
        <StyledSelect value={occurrence} onChange={handleOccurrenceChange} placeholder="Select Occurrence">
          <Option value="One Time">One Time</Option>
          <Option value="Hourly Intervals">Hourly Intervals</Option>
          <Option value="Daily">Daily</Option>
          <Option value="Weekly">Weekly</Option>
          <Option value="Monthly">Monthly</Option>
          <Option value="Yearly">Yearly</Option>
        </StyledSelect>
      </Section>

      {occurrence === 'One Time' && (
        <Section>
          <StyledLabel>Select Execution Time</StyledLabel>
          <StyledSelect value={executionTime} onChange={handleExecutionTimeChange} placeholder="Select Execution Time">
            <Option value="As soon as possible">As soon as possible</Option>
            <Option value="Select time">Select time</Option>
          </StyledSelect>
          {executionTime === 'Select time' && <StyledDatePicker showTime />}
        </Section>
      )}

      {occurrence === 'Hourly Intervals' && (
        <Section>
          <StyledLabel>Select Start Date</StyledLabel>
          <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
          <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
            Set End Date
          </StyledCheckbox>
          {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          <StyledSelect value={runningInterval} onChange={handleRunningIntervalChange} placeholder="Select Running Interval">
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
          {runningInterval === 'Custom' && (
            <>
              <StyledLabel>Select Specific Hours</StyledLabel>
              <StyledSelect mode="multiple" value={specificHours} onChange={setSpecificHours} placeholder="Select Specific Hours">
                {Array.from({ length: 23 }, (_, i) => (
                  <Option key={i + 1} value={i + 1}>
                    {i + 1}
                  </Option>
                ))}
              </StyledSelect>
              <StyledLabel>Select Specific Minutes</StyledLabel>
              <StyledSelect value={specificMinutes} onChange={(value) => setSpecificMinutes(value)} placeholder="Select Specific Minutes">
                <Option value={0}>00</Option>
                <Option value={15}>15</Option>
                <Option value={30}>30</Option>
                <Option value={45}>45</Option>
              </StyledSelect>
            </>
          )}
        </Section>
      )}

      {occurrence === 'Daily' && (
        <Section>
          <StyledLabel>Select Start Date</StyledLabel>
          <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
          <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
            Set End Date
          </StyledCheckbox>
          {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          <StyledTimePicker placeholder="Execution Time" />
        </Section>
      )}

      {occurrence === 'Weekly' && (
        <Section>
          <StyledLabel>Select Start Date</StyledLabel>
          <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
          <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
            Set End Date
          </StyledCheckbox>
          {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          <StyledLabel>Select Days of the Week</StyledLabel>
          <DaySelection>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <DayCheckbox key={day} checked={daysOfWeek.includes(day)} onChange={() => toggleWeekday(day)}>
                {day}
              </DayCheckbox>
            ))}
          </DaySelection>
          <StyledTimePicker placeholder="Execution Time" />
        </Section>
      )}

      {occurrence === 'Monthly' && (
        <Section>
          <StyledLabel>Select Specific Days of the Month</StyledLabel>
          <StyledSelect mode="multiple" value={specificDays} onChange={setSpecificDays} placeholder="Select Specific Days">
            {Array.from({ length: 31 }, (_, i) => (
              <Option key={i + 1} value={i + 1}>
                {i + 1}
              </Option>
            ))}
          </StyledSelect>
          <StyledTimePicker placeholder="Execution Time" />
        </Section>
      )}

      {occurrence === 'Yearly' && (
        <Section>
          <StyledLabel>Select Specific Months</StyledLabel>
          <StyledSelect mode="multiple" value={specificMonths} onChange={setSpecificMonths} placeholder="Select Specific Months">
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
              (month) => (
                <Option key={month} value={month}>
                  {month}
                </Option>
              )
            )}
          </StyledSelect>
          <StyledTimePicker placeholder="Execution Time" />
        </Section>
      )}
    </Wrapper>
  );
};

export default SchedulePicker;
