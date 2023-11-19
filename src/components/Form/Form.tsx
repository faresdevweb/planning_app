import { Controller, useForm } from "react-hook-form";
import { ColorResult } from "@uiw/react-color";
import "./Form.scss";
import DatePicker from "../DatePicker/DatePicker";
import TimePicker from "../TimePicker/TimePicker";
import ColorPicker from "../ColorPicker/ColorPicker";
import { CiCalendar } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { FormData } from "../../interfaces/formData.interface";
import { useSubmitForm } from "../../hooks/useSubmitForm";
interface FormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<FormProps> = ({ setShowForm }) => {
  const { control, handleSubmit, register, setValue } = useForm<FormData>({
    defaultValues: {
      date1: null,
      date2: null,
    },
  });

  const { onSubmit, error, backgroundColor, setBackgroundColor } =
    useSubmitForm(setShowForm);

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
