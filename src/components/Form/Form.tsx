import { Controller, useForm } from "react-hook-form";
import { ColorResult } from "@uiw/react-color";
import { Task, useTaskStore } from "../../store/task";
import { toLocalISOTimeString } from "../../utils/toLocalISOString";
import "./Form.scss";
import { useEffect, useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import TimePicker from "../TimePicker/TimePicker";
import ColorPicker from "../ColorPicker/ColorPicker";
import { CiCalendar } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";

interface FormData {
  title: string;
  description: string;
  date1: Date | null;
  date2: Date | null;
  time1: Date;
  time2: Date;
  color: ColorResult;
}

interface FormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<FormProps> = ({ setShowForm }) => {
  const { addTask } = useTaskStore();
  const { control, handleSubmit, register, reset, setValue } =
    useForm<FormData>({
      defaultValues: {
        date1: null,
        date2: null,
      },
    });
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form_component">
      <div className="form_header">
        <input
          type="text"
          className="title_input"
          placeholder="Add Title"
          {...register("title", { required: true })}
        />
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorPicker
              color={field.value ? field.value.hex : backgroundColor}
              onChange={(color: ColorResult) => {
                setValue("color", color);
                setBackgroundColor(color.hex);
              }}
            />
          )}
        />
      </div>
      <div className="date_picker">
        <CiCalendar className="calendar_icon" />
        <Controller
          name="date1"
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value || null}
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
        <Controller
          name="date2"
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value || null}
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
      </div>
      <div className="time_picker">
        <CiClock2 className="clock_icon" />
        <Controller
          name="time1"
          control={control}
          render={({ field }) => (
            <TimePicker
              value={field.value || null}
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
        <Controller
          name="time2"
          control={control}
          render={({ field }) => (
            <TimePicker
              value={field.value || null}
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
      </div>
      <div>
        <input
          type="text"
          className="comment_input"
          placeholder="comment"
          {...register("description", { required: true })}
        />
      </div>
      <div className="button_container">
        <button
          className="add_button"
          style={{ backgroundColor: backgroundColor }}
        >
          Add
        </button>
      </div>
      {error && <div className="error_message">{error}</div>}
    </form>
  );
};

export default Form;
