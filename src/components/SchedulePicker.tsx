import React, { useState } from 'react';
import { Select, DatePicker, TimePicker, Checkbox, Typography } from 'antd';
import styled from 'styled-components';
import { Dayjs } from 'dayjs';

const { Option } = Select;
const { Title } = Typography;

const Wrapper = styled.div`
  padding: 32px;
  background-color: #ffffff;
  border-radius: 16px;
  max-width: 800px;
  margin: auto;
  width:800px;
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
    align-items: left;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  flex: 1;
  .ant-picker {
    padding:11px;
    border-radius: 8px !important;
    height: 48px !important;
    padding: 0 16px !important;
    display: flex;
    align-items: left;
  }
`;

const StyledTimePicker = styled(TimePicker)`
  flex: 1;
  .ant-picker {
    border-radius: 8px !important;
    height: 48px !important;
    padding: 0 16px !important;
    display: flex;
    align-items: left;
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

const timeZones = [
  { value: 'Etc/GMT+12', label: '(GMT-12:00) International Date Line West' },
  { value: 'Pacific/Midway', label: '(GMT-11:00) Midway Island, Samoa' },
  { value: 'Pacific/Honolulu', label: '(GMT-10:00) Hawaii' },
  { value: 'US/Alaska', label: '(GMT-09:00) Alaska' },
  { value: 'America/Los_Angeles', label: '(GMT-08:00) Pacific Time (US & Canada)' },
  { value: 'America/Denver', label: '(GMT-07:00) Mountain Time (US & Canada)' },
  { value: 'America/Chicago', label: '(GMT-06:00) Central Time (US & Canada)' },
  { value: 'America/New_York', label: '(GMT-05:00) Eastern Time (US & Canada)' },
  { value: 'America/Caracas', label: '(GMT-04:30) Caracas' },
  { value: 'America/Halifax', label: '(GMT-04:00) Atlantic Time (Canada)' },
  { value: 'America/St_Johns', label: '(GMT-03:30) Newfoundland' },
  { value: 'America/Argentina/Buenos_Aires', label: '(GMT-03:00) Buenos Aires' },
  { value: 'Atlantic/South_Georgia', label: '(GMT-02:00) Mid-Atlantic' },
  { value: 'Atlantic/Azores', label: '(GMT-01:00) Azores' },
  { value: 'Europe/London', label: '(GMT+00:00) London, Lisbon, Dublin' },
  { value: 'Europe/Berlin', label: '(GMT+01:00) Berlin, Stockholm, Rome, Bern, Brussels' },
  { value: 'Africa/Cairo', label: '(GMT+02:00) Cairo' },
  { value: 'Asia/Baghdad', label: '(GMT+03:00) Baghdad' },
  { value: 'Asia/Tehran', label: '(GMT+03:30) Tehran' },
  { value: 'Asia/Dubai', label: '(GMT+04:00) Abu Dhabi, Muscat' },
  { value: 'Asia/Kabul', label: '(GMT+04:30) Kabul' },
  { value: 'Asia/Karachi', label: '(GMT+05:00) Islamabad, Karachi' },
  { value: 'Asia/Calcutta', label: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi' },
  { value: 'Asia/Katmandu', label: '(GMT+05:45) Kathmandu' },
  { value: 'Asia/Dhaka', label: '(GMT+06:00) Astana, Dhaka' },
  { value: 'Asia/Bangkok', label: '(GMT+07:00) Bangkok, Hanoi, Jakarta' },
  { value: 'Asia/Hong_Kong', label: '(GMT+08:00) Beijing, Perth, Singapore, Hong Kong' },
  { value: 'Asia/Tokyo', label: '(GMT+09:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk' },
  { value: 'Australia/Adelaide', label: '(GMT+09:30) Adelaide' },
  { value: 'Australia/Sydney', label: '(GMT+10:00) Brisbane, Canberra, Melbourne, Sydney' },
  { value: 'Asia/Magadan', label: '(GMT+11:00) Magadan, Solomon Islands, New Caledonia' },
  { value: 'Pacific/Auckland', label: '(GMT+12:00) Auckland, Wellington' },
  { value: 'Pacific/Fiji', label: '(GMT+12:00) Fiji, Kamchatka, Marshall Is.' },
];


const SchedulePicker: React.FC = () => {
  const [occurrence, setOccurrence] = useState<OccurrenceType>('One Time');
  const [executionTime, setExecutionTime] = useState<ExecutionTimeType>('As soon as possible');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);
  const [runningInterval, setRunningInterval] = useState<RunningIntervalType>('Every hour');
  const [specificHours, setSpecificHours] = useState<number[]>([]);
  const [specificMinutes, setSpecificMinutes] = useState<number>(0);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [specificDays, setSpecificDays] = useState<number[]>([]);
  const [specificMonths, setSpecificMonths] = useState<string[]>([]);

  const handleOccurrenceChange = (value: OccurrenceType) => setOccurrence(value);
  const handleExecutionTimeChange = (value: ExecutionTimeType) => setExecutionTime(value);
  const handleRunningIntervalChange = (value: RunningIntervalType) => setRunningInterval(value);

  const toggleWeekday = (day: string) => {
    setDaysOfWeek(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  return (
    <Wrapper>
      <Title level={3} style={{ marginBottom: '32px', textAlign: 'left' }}>Schedule Picker</Title>
      
      <Section>
        <StyledLabel>Timezone</StyledLabel>
        <StyledSelect
        style={{textAlign: 'left' }}
          showSearch
          placeholder="Select Time Zone"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        >
          {timeZones.map(tz => (
            <Option key={tz.value} value={tz.value} label={tz.label}>
              {tz.label}
            </Option>
          ))}
        </StyledSelect>
      </Section>
      <Section>
        <StyledLabel>Occurrence</StyledLabel>
        <StyledSelect<OccurrenceType> value={occurrence} onChange={handleOccurrenceChange} placeholder="Select Occurrence" style={{ textAlign:'left'}} >
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
          <StyledLabel>Execution Time</StyledLabel>
          <StyledSelect<ExecutionTimeType> value={executionTime} onChange={handleExecutionTimeChange} placeholder="Select Execution Time" style={{ textAlign:'left'}}>
            <Option value="As soon as possible">As soon as possible</Option>
            <Option value="Select time">Select time</Option>
          </StyledSelect>
          {executionTime === 'Select time' && <StyledSelect showTime />}
        </Section>
      )}

      {occurrence === 'Hourly Intervals' && (
        <>
          <Section>
            <StyledLabel>Start Date</StyledLabel>
            <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
            <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
              Set End Date
            </StyledCheckbox>
            {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          </Section>
          <Section>
            <StyledLabel>Running Interval</StyledLabel>
            <StyledSelect<RunningIntervalType> value={runningInterval} onChange={handleRunningIntervalChange} placeholder="Select Running Interval" style={{ textAlign:'left'}}>
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
                <StyledSelect<number[]> mode="multiple" value={specificHours} onChange={setSpecificHours} placeholder="Select Specific Hours" style={{ textAlign:'left'}}>
                  {Array.from({ length: 23 }, (_, i) => (
                    <Option key={i + 1} value={i + 1}>
                      {i + 1}
                    </Option>
                  ))}
                </StyledSelect>
                <StyledSelect<number> value={specificMinutes} onChange={(value) => setSpecificMinutes(value)} placeholder="Select Specific Minutes" style={{ textAlign:'left'}}>
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
            <StyledLabel>Start Date</StyledLabel>
            <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
            <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
              Set End Date
            </StyledCheckbox>
            {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          </Section>
          <Section>
            <StyledLabel>Execution Time</StyledLabel>
            <StyledTimePicker placeholder="Execution Time" />
          </Section>
        </>
      )}

      {occurrence === 'Weekly' && (
        <>
          <Section>
            <StyledLabel>Start Date</StyledLabel>
            <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
            <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
              Set End Date
            </StyledCheckbox>
            {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          </Section>
          <Section>
            <StyledLabel>Weekdays</StyledLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
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
            <StyledLabel>Execution Time</StyledLabel>
            <StyledTimePicker placeholder="Execution Time" />
          </Section>
        </>
      )}

      {occurrence === 'Monthly' && (
        <>
          <Section>
            <StyledLabel>Start Date</StyledLabel>
            <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
            <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
              Set End Date
            </StyledCheckbox>
            {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          </Section>
          <Section>
            <StyledLabel>Execution Time</StyledLabel>
            <StyledTimePicker placeholder="Execution Time" />
          </Section>
          <Section>
            <StyledLabel>Days of Month</StyledLabel>
            <StyledSelect<number[]> mode="multiple" value={specificDays} onChange={setSpecificDays} placeholder="Select Specific Days" style={{ textAlign:'left'}} >
              {Array.from({ length: 31 }, (_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </StyledSelect>
          </Section>
        </>
      )}

      {occurrence === 'Yearly' && (
        <>
          <Section>
            <StyledLabel>Start Date</StyledLabel>
            <StyledDatePicker onChange={setStartDate} placeholder="Select Start Date" />
            <StyledCheckbox checked={showEndDate} onChange={(e) => setShowEndDate(e.target.checked)}>
              Set End Date
            </StyledCheckbox>
            {showEndDate && <StyledDatePicker onChange={setEndDate} placeholder="Select End Date" />}
          </Section>
          <Section>
            <StyledLabel>Months</StyledLabel>
            <StyledSelect<string[]> mode="multiple" value={specificMonths} onChange={setSpecificMonths} placeholder="Select Specific Months" style={{ textAlign:'left'}}>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                <Option key={month} value={month}>
                  {month}
                </Option>
              ))}
            </StyledSelect>
          </Section>
          <Section>
            <StyledLabel>Days of Month</StyledLabel>
            <StyledSelect<number[]> mode="multiple" value={specificDays} onChange={setSpecificDays} placeholder="Select Specific Days" style={{ textAlign:'left'}} >
              {Array.from({ length: 31 }, (_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </StyledSelect>
          </Section>
          <Section>
            <StyledLabel>Execution Time</StyledLabel>
            <StyledTimePicker placeholder="Execution Time" />
          </Section>
        </>
      )}
    </Wrapper>
  );
};

export default SchedulePicker;