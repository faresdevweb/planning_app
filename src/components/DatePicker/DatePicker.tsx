import "./DatePicker.scss";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { format } from "date-fns";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";
import { useCloseModal } from "../../hooks/useCloseModal";

interface DatePickerProps {
  value: Date | null;
  onChange: (value: Date | null, selectionState?: PickerSelectionState) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const { open, setOpen, ref } = useCloseModal();

  return (
    <div className="container_2" ref={ref}>
      <p className="date" onClick={() => setOpen(!open)}>
        {value ? format(value, "EEEE, MMMM d") : "Select Date"}
      </p>
      {open ? (
        <DateCalendar
          className="date_calendar"
          value={value}
          onChange={(date: Date | null) => {
            if (date) {
              onChange(date);
              setOpen(false);
            }
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default DatePicker;
