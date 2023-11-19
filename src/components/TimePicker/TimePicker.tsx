import "./TimePicker.scss";
import { TimeClock } from "@mui/x-date-pickers/TimeClock";
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

  return (
    <div className="container_time_picker" ref={ref}>
      <p className="hour" onClick={() => setOpen(!open)}>
        {value ? format(value, "hh:mm a") : "Select "}
      </p>
      {open && (
        <div className="digital_clock">
          <TimeClock
            value={value}
            onChange={(newValue: Date | null) => {
              if (newValue !== null) {
                onChange(newValue);
              }
              setOpen(false);
            }}
            maxTime={dayjs().hour(20).minute(0).toDate()}
            minutesStep={5}
            ampm={false}
          />
        </div>
      )}
    </div>
  );
};

export default TimePicker;
