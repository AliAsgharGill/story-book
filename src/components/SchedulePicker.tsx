import React, { useState } from 'react';
import { Select, DatePicker, TimePicker, Checkbox, Row, Col, Typography } from 'antd';
import styled from 'styled-components';
import { Dayjs } from 'dayjs';

const { Option } = Select;
const { Title } = Typography;

const Wrapper = styled.div`
  padding: 24px;
  background-color: #f7f8fa;
  border-radius: 8px;
  max-width: 800px;
  margin: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 16px;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  .ant-select-selector {
    border-radius: 8px !important;
    height: 40px !important;
    padding: 0 16px !important;
    display: flex;
    align-items: center;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  .ant-picker {
    border-radius: 8px !important;
    height: 40px !important;
  }
`;

const StyledTimePicker = styled(TimePicker)`
  width: 100%;
  .ant-picker {
    border-radius: 8px !important;
    height: 40px !important;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    border-radius: 4px;
  }
  margin-right: 8px;
`;

const DayCheckbox = styled(Checkbox)`
  margin-right: 8px;
  .ant-checkbox-inner {
    border-radius: 4px;
  }
`;

const SchedulePicker: React.FC = () => {
  const [occurrence, setOccurrence] = useState<'One Time' | 'Hourly Intervals' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly'>('One Time');
  const [executionTime, setExecutionTime] = useState<'As soon as possible' | 'Select time'>('As soon as possible');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);
  const [runningInterval, setRunningInterval] = useState<'Every hour' | 'Every 2 hours' | 'Every 3 hours' | 'Every 4 hours' | 'Every 6 hours' | 'Every 8 hours' | 'Every 12 hours' | 'Every 24 hours' | 'Custom'>('Every hour');
  const [specificHours, setSpecificHours] = useState<number[]>([]);
  const [specificMinutes, setSpecificMinutes] = useState<number>(0);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [specificDays, setSpecificDays] = useState<number[]>([]);
  const [specificMonths, setSpecificMonths] = useState<string[]>([]);

  const handleOccurrenceChange = (value: 'One Time' | 'Hourly Intervals' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly') => setOccurrence(value);
  const handleExecutionTimeChange = (value: 'As soon as possible' | 'Select time') => setExecutionTime(value);
  const handleRunningIntervalChange = (value: 'Every hour' | 'Every 2 hours' | 'Every 3 hours' | 'Every 4 hours' | 'Every 6 hours' | 'Every 8 hours' | 'Every 12 hours' | 'Every 24 hours' | 'Custom') => setRunningInterval(value);

  const toggleWeekday = (day: string) => {
    setDaysOfWeek(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  return (
    <Wrapper>
      <Title level={3}>Schedule Picker</Title>
      
      <Section>
        <StyledSelect placeholder="Select Time Zone">
          <Option value="GMT">GMT</Option>
          <Option value="UTC">UTC</Option>
          <Option value="PST">PST</Option>
          <Option value="EST">EST</Option>
          {/* Add more time zones as needed */}
        </StyledSelect>
      </Section>
      
      <Section>
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
          <StyledSelect value={executionTime} onChange={handleExecutionTimeChange} placeholder="Select Execution Time">
            <Option value="As soon as possible">As soon as possible</Option>
            <Option value="Select time">Select time</Option>
          </StyledSelect>
          {executionTime === 'Select time' && <StyledDatePicker showTime />}
        </Section>
      )}

      {occurrence === 'Hourly Intervals' && (
        <>
          <Section>
            <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
            <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
              Set End Date
            </StyledCheckbox>
            {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          </Section>
          <Section>
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
                <StyledSelect mode="multiple" value={specificHours} onChange={setSpecificHours} placeholder="Select Specific Hours">
                  {Array.from({ length: 23 }, (_, i) => (
                    <Option key={i + 1} value={i + 1}>
                      {i + 1}
                    </Option>
                  ))}
                </StyledSelect>
                <StyledSelect value={specificMinutes} onChange={(value) => setSpecificMinutes(value)} placeholder="Select Specific Minutes">
                  <Option value={0}>00</Option>
                  <Option value={15}>15</Option>
                  <Option value={30}>30</Option>
                  <Option value={45}>45</Option>
                </StyledSelect>
              </>
            )}
          </Section>
        </>
      )}

      {occurrence === 'Daily' && (
        <>
          <Section>
            <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
            <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
              Set End Date
            </StyledCheckbox>
            {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          </Section>
          <Section>
            <StyledTimePicker placeholder="Execution Time" />
          </Section>
        </>
      )}

      {occurrence === 'Weekly' && (
        <>
          <Section>
            <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
            <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
              Set End Date
            </StyledCheckbox>
            {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          </Section>
          <Section>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <DayCheckbox
                  key={day}
                  checked={daysOfWeek.includes(day)}
                  onChange={() => toggleWeekday(day)}
                  style={{ backgroundColor: daysOfWeek.includes(day) ? '#e6f7ff' : undefined }}
                >
                  {day}
                </DayCheckbox>
              ))}
            </div>
          </Section>
          <Section>
            <StyledTimePicker placeholder="Execution Time" />
          </Section>
        </>
      )}

      {occurrence === 'Monthly' && (
        <>
          <Section>
            <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
            <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
              Set End Date
            </StyledCheckbox>
            {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          </Section>
          <Section>
            <StyledSelect mode="multiple" value={specificDays} onChange={setSpecificDays} placeholder="Select Specific Days">
              {Array.from({ length: 31 }, (_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </StyledSelect>
          </Section>
          <Section>
            <StyledTimePicker placeholder="Execution Time" />
          </Section>
        </>
      )}

      {occurrence === 'Yearly' && (
        <>
          <Section>
            <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
            <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
              Set End Date
            </StyledCheckbox>
            {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          </Section>
          <Section>
            <StyledSelect mode="multiple" value={specificDays} onChange={setSpecificDays} placeholder="Select Specific Days">
              {Array.from({ length: 31 }, (_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </StyledSelect>
          </Section>
          <Section>
            <StyledSelect mode="multiple" value={specificMonths} onChange={setSpecificMonths} placeholder="Select Specific Months">
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                <Option key={month} value={month}>
                  {month}
                </Option>
              ))}
            </StyledSelect>
          </Section>
          <Section>
            <StyledTimePicker placeholder="Execution Time" />
          </Section>
        </>
      )}
    </Wrapper>
  );
};

export default SchedulePicker;
