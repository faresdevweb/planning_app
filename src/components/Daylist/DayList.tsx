import { useState } from "react";
import { useTaskStore } from "../../store/task";
import { useDayStore } from "../../store/day.ts";
import "./DayList.scss";
import { useSelectDay } from "../../hooks/useSelectDay";

interface DayListProps {
  generateDays: () => { year: number; month: number; day: number }[];
}

const DayList: React.FC<DayListProps> = ({ generateDays }) => {
  const { setDay } = useDayStore();
  const daysArray = generateDays();
  const [clicked, setClicked] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const taskStore = useTaskStore();

  const adjustDayIndex = (dayIndex: number) => {
    return dayIndex === 0 ? 6 : dayIndex - 1;
  };

  const firstDayOfWeek = adjustDayIndex(
    new Date(daysArray[0].year, daysArray[0].month - 1, 1).getDay()
  );

  const emptyDays = Array(firstDayOfWeek).fill(null);

  const { handleClickDay } = useSelectDay(
    setDay,
    taskStore,
    setClicked,
    daysArray
  );

  return (
    <div className="container_daylist">
      <div className="grid_day_container">
        <p className="week_day">M</p>
        <p className="week_day">T</p>
        <p className="week_day">W</p>
        <p className="week_day">T</p>
        <p className="week_day">F</p>
        <p className="week_day">S</p>
        <p className="week_day">S</p>
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`}></div>
        ))}
        {daysArray.map((day: { year: number; month: number; day: number }) => (
          <p
            className={`day_number ${day.day === clicked ? "clicked" : ""}`}
            key={day.day}
            onClick={() => {
              handleClickDay(day);
            }}
          >
            {day.day}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DayList;
