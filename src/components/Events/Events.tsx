import "./DailySchedule.scss";
import { useTaskStore } from "../../store/task";
import { RiChatDeleteFill } from "react-icons/ri";
import { hexToRGBA } from "../../utils/hexToRGBA";

const Events = () => {
  const { selectedDayTasks, deleteTask } = useTaskStore();

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

  return (
    <div className="daily_schedule_container">
      <div className="hour_column">
        <time className="hours">09:00</time>
        <time className="hours">10:00</time>
        <time className="hours">11:00</time>
        <time className="hours">12:00</time>
        <time className="hours">13:00</time>
        <time className="hours">14:00</time>
        <time className="hours">15:00</time>
        <time className="hours">16:00</time>
        <time className="hours">17:00</time>
        <time className="hours">18:00</time>
        <time className="hours">19:00</time>
        <time className="hours">20:00</time>
      </div>
      <div className="task_display_container" style={{ position: "relative" }}>
        {selectedDayTasks.map((task) => {
          const { hours } = task;
          const { top, height } = calculatePositionAndHeight(
            hours[0],
            hours[1]
          );
          return (
            <div>
              <div
                key={task.id}
                className="task"
                style={{
                  position: "absolute",
                  top: `${top}px`,
                  height: `${height}px`,
                  backgroundColor: hexToRGBA(task.color, 0.2),
                  borderLeft: `5px solid ${task.color}`,
                }}
              >
                <div className="text_container">
                  <p className="first_text">{task.title}</p>
                  <p className="second_text">{task.description}</p>
                </div>
                <div>
                  <RiChatDeleteFill
                    className="delete-icon"
                    style={{
                      color: task.color,
                    }}
                    onClick={() => deleteTask(task.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
