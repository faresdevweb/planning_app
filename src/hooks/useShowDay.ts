export const useShowDay = (daysArray: {
  year: number;
  month: number;
  day: number;
}[]) => {
  const adjustDayIndex = (dayIndex: number) => {
    return dayIndex === 0 ? 6 : dayIndex - 1;
  };

  const firstDayOfWeek = adjustDayIndex(
    new Date(daysArray[0].year, daysArray[0].month - 1, 1).getDay()
  );

  const emptyDays = Array(firstDayOfWeek).fill(null);

  return { emptyDays }
}