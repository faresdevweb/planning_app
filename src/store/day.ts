import {create} from "zustand";

interface DayState {
  day: string;
  setDay: (day: string) => void;
}

export const useDayStore = create<DayState>((set) => ({
  day: "",
  setDay: (day: string) => {
    const date = new Date(day);
    const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'long'};
    const formattedDate = date.toLocaleDateString('en-US', options);  
    set({ day: formattedDate });
  },
}));
