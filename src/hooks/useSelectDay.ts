import {useCallback, useEffect} from 'react';
import { TaskStore } from '../store/task';
import { useTaskStore } from '../store/task';

export const useSelectDay = (
  setDay: (day: string) => void, 
  taskStore: TaskStore, 
  setClicked: React.Dispatch<React.SetStateAction<number | null>>,
  daysArray: { year: number; month: number; day: number }[]
) => {

  const { setSelectedDayTasks } = useTaskStore();

  const handleClickDay = useCallback(
    (dayInfo: { year: number; month: number; day: number }) => {
      const date = new Date(dayInfo.year, dayInfo.month - 1, dayInfo.day);
      const formattedDate = date.toString();

      setDay(formattedDate);

      const tasks = taskStore.getTasksByDate(formattedDate);

      setSelectedDayTasks(tasks);

      setClicked(dayInfo.day);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setDay, taskStore]
  );

  useEffect(() => {
    const today = new Date();
    const currentDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };

    const todayInArray = daysArray.find(
      (day) =>
        day.year === currentDate.year &&
        day.month === currentDate.month &&
        day.day === currentDate.day
    );

    if (todayInArray) {
      handleClickDay(todayInArray);
      setClicked(todayInArray.day);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { handleClickDay }

}