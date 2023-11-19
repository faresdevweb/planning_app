export const useShowEvent = () => {
  const hourHeight = 50;

  const calculatePositionAndHeight = (startTime: string, endTime: string) => {
    const startParts = startTime.split(":");
    const endParts = endTime.split(":");
    const startHour = parseInt(startParts[0], 10);
    const startMinutes = parseInt(startParts[1], 10);
    const endHour = parseInt(endParts[0], 10);
    const endMinutes = parseInt(endParts[1], 10);

    const startPosition =
      (startHour - 9) * hourHeight + (startMinutes / 60) * hourHeight;
    const endPosition =
      (endHour - 9) * hourHeight + (endMinutes / 60) * hourHeight;

    const height = endPosition - startPosition;

    return { top: startPosition, height };
  };

  return { calculatePositionAndHeight }
}