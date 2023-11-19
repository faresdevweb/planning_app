import "./ColorPicker.scss";
import { ColorResult, Colorful } from "@uiw/react-color";
import { useCloseModal } from "../../hooks/useCloseModal";

interface ColorPickerProps {
  color: string;
  onChange: (color: ColorResult) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const { open, setOpen, ref } = useCloseModal();

  return (
    <div ref={ref} className="color_picker_container">
      <div
        className="box"
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: color }}
      ></div>

      {open && (
        <div className="color_picker">
          <Colorful
            color={color}
            onChange={(color: ColorResult) => onChange(color)}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
