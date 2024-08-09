import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import moment from "moment-timezone";

interface Schedule {
  start_date: Date;
  end_date: Date;
  cadence: string;
  hour: string;
  minute: string;
  timezone: string;
}

interface SchedulePickerProps {
  scheduler: Schedule;
  onChange: (value: Schedule) => void;
  isValid: (value: boolean) => void;
}

const SchedulePicker: React.FC<SchedulePickerProps> = ({
  scheduler,
  onChange,
  isValid,
}) => {
  const [schedule, setSchedule] = useState<Schedule>(scheduler);

  const handleDateChange =
    (field: "start_date" | "end_date") => (date: Date) => {
      setSchedule((prev) => {
        const updated = { ...prev, [field]: date };
        onChange(updated);
        return updated;
      });
    };

  const handleTimeChange = (time: string) => {
    const [hour, minute] = time.split(":");
    setSchedule((prev) => {
      const updated = { ...prev, hour, minute };
      onChange(updated);
      return updated;
    });
  };

  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const timezone = event.target.value;
    setSchedule((prev) => {
      const updated = { ...prev, timezone };
      onChange(updated);
      return updated;
    });
  };

  const validateSchedule = () => {
    const isValid = schedule.start_date < schedule.end_date;
    isValid(isValid);
  };

  React.useEffect(() => {
    validateSchedule();
  }, [schedule]);

  return (
    <div>
      <div>
        <label>Start date:</label>
        <DatePicker
          selected={schedule.start_date}
          onChange={handleDateChange("start_date")}
        />
      </div>
      <div>
        <label>End date:</label>
        <DatePicker
          selected={schedule.end_date}
          onChange={handleDateChange("end_date")}
        />
      </div>
      <div>
        <label>Execution time:</label>
        <TimePicker
          onChange={handleTimeChange}
          value={`${schedule.hour}:${schedule.minute}`}
        />
      </div>
      <div>
        <label>Timezone:</label>
        <select value={schedule.timezone} onChange={handleTimezoneChange}>
          {moment.tz.names().map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SchedulePicker;
