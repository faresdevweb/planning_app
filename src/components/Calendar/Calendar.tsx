import "./Calendar.scss";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DayList from "../Daylist/DayList";
import { useCalendar } from "../../hooks/useCalendar";

const Calendar = () => {
  const {
    title,
    subtractMonth,
    addMonth,
    handleDateChange,
    dateDropdown,
    setDateDropdown,
    currentDate,
    generateDays,
  } = useCalendar();

  return (
    <div className="container_calendar">
      <div className="sub_container">
        <div className="header">
          <IoIosArrowBack className="arrow_back" onClick={subtractMonth} />
          <p className="title" onClick={() => setDateDropdown(!dateDropdown)}>
            {title}
          </p>
          <IoIosArrowForward className="arrow_forward" onClick={addMonth} />
          <div>
            {dateDropdown && (
              <div className="dropdown">
                <DatePicker
                  views={["year", "month"]}
                  value={currentDate}
                  onChange={handleDateChange}
                  open={dateDropdown}
                  onClose={() => setDateDropdown(false)}
                  className="date_picker"
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <DayList generateDays={generateDays} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
