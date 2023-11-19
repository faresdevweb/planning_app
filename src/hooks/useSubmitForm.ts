import { useState, useEffect } from "react"
import { FormData } from "../interfaces/formData.interface";
import { toLocalISOTimeString } from "../utils/toLocalISOString";
import { Task, useTaskStore } from "../store/task";
import { useForm } from "react-hook-form";

export const useSubmitForm = (
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
  const { addTask } = useTaskStore();

  const {
    reset
  } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("#6200ee");

  const onSubmit = (data: FormData) => {
    const { title, description, date1, date2, time1, time2, color } = data;
    console.log(date1, date2);
    console.log(time1, time2);

    const startTimeString = toLocalISOTimeString(time1);
    const endTimeString = toLocalISOTimeString(time2);
    console.log(startTimeString, endTimeString);

    const task: Task = {
      id: Date.now(),
      title,
      description,
      dates: [date1 ? date1.toString() : "", date2 ? date2.toString() : ""],
      hours: [startTimeString, endTimeString],
      color: color.hex,
    };

    try {
      addTask(task);
      setShowForm(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
    reset();
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return { onSubmit, error, backgroundColor, setBackgroundColor };
}