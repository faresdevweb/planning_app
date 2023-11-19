import { ColorResult } from "@uiw/react-color";

export interface FormData {
  title: string;
  description: string;
  date1: Date | null;
  date2: Date | null;
  time1: Date;
  time2: Date;
  color: ColorResult;
}