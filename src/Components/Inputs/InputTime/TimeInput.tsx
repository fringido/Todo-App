import React from "react";
import './TimeInput.css'
interface TimeInputProps {
  value: { hours: number; minutes: number };
  onChange: (value: { hours: number; minutes: number }) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hours = Math.max(0, Math.min(23, Number(event.target.value)));
    onChange({ ...value, hours });
  };

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = Math.max(0, Math.min(59, Number(event.target.value)));
    onChange({ ...value, minutes });
  };

  return (
    <div className="TimeInput">
      <input
        type="number"
        min="0"
        max="23"
        value={value.hours}
        onChange={handleHoursChange}
        placeholder="Horas"
        className="input-form "
      />
      <span>:</span>
      <input
        type="number"
        min="0"
        max="59"
        value={value.minutes}
        onChange={handleMinutesChange}
        placeholder="Minutos"
        className="input-form "
      />
    </div>
  );
};

export { TimeInput };
