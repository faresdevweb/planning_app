import "./TimePicker.scss";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import { format } from "date-fns";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";
import { useCloseModal } from "../../hooks/useCloseModal";

interface TimePickerProps {
  value: Date | null;
  onChange: (value: Date | null, selectionState?: PickerSelectionState) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const { open, setOpen, ref } = useCloseModal();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onChange(date);
      setOpen(false);
    }
  };

  return (
    <div className="container_time_picker" ref={ref}>
      <p className="hour" onClick={() => setOpen(!open)}>
        {value ? format(value, "hh:mm a") : "Select "}
      </p>
      {open ? (
        <DigitalClock
          defaultValue={value}
          onChange={handleDateChange}
          className="digital_clock"
          minTime={dayjs("2022-04-17T09:00").toDate()}
          maxTime={dayjs("2022-04-17T20:00").toDate()}
          timeStep={5}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TimePicker;
