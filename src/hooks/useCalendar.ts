import { useCallback, useState } from "react";

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateDropdown, setDateDropdown] = useState(false);

  const subtractMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const addMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateChange = (date: Date | null) => {
    if (date !== null) {
      setCurrentDate(date);
      setDateDropdown(false);
    }
  };

  const title = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${currentDate.getFullYear()}`;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const generateDays = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push({ year, month: month + 1, day });
    }

    return daysArray;
  }, [currentDate]);

  return {
    currentDate,
    subtractMonth,
    addMonth,
    handleDateChange,
    title,
    dateDropdown,
    setDateDropdown,
    generateDays
  };

}