import {create} from 'zustand';
import { persist } from 'zustand/middleware';

export type Task = {
  id: number;
  title: string;
  description: string;
  dates: string[];
  hours: string[];
  color: string;
};

const isDateRangeValid = ([startDate, endDate]: string[]) => {
  return new Date(startDate) <= new Date(endDate);
};

const isTimeRangeValid = ([startTime, endTime]: string[]) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  return (startHour < endHour) || (startHour === endHour && startMinute <= endMinute);
};

export type TaskStore = {
  tasks: Task[];
  selectedDayTasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  getTasksByDate: (date: string) => Task[];
  setSelectedDayTasks: (task: Task[]) => void;
};

  export const useTaskStore = create<TaskStore>()(
    persist(
      (set, get) => ({
        tasks: [],
        selectedDayTasks: [],
        addTask: (newTask) => {
          const overlappingTask = get().tasks.some((task) => {
            return newTask.dates.some((newDate) => {
              const isNewDateInRange = task.dates.includes(newDate);
              if (!isNewDateInRange) return false;
        
              const newStartMinutes = parseInt(newTask.hours[0].split(':')[0]) * 60 + parseInt(newTask.hours[0].split(':')[1]);
              const newEndMinutes = parseInt(newTask.hours[1].split(':')[0]) * 60 + parseInt(newTask.hours[1].split(':')[1]);
              const taskStartMinutes = parseInt(task.hours[0].split(':')[0]) * 60 + parseInt(task.hours[0].split(':')[1]);
              const taskEndMinutes = parseInt(task.hours[1].split(':')[0]) * 60 + parseInt(task.hours[1].split(':')[1]);
        
              // Vérifiez si la nouvelle tâche commence avant la fin de la tâche existante
              // et finit après le début de la tâche existante.
              return newStartMinutes < taskEndMinutes && newEndMinutes > taskStartMinutes;
            });
          });
        
          if (overlappingTask) {
            throw new Error('Task overlaps with an existing task in the same time range');
          }
          
          if (!isDateRangeValid(newTask.dates) || !isTimeRangeValid(newTask.hours)) {
            throw new Error('Invalid date or time range');
          }
        
          set((state) => ({ tasks: [...state.tasks, newTask] }));
          
        },        
        deleteTask: (id) => {
          set((state) => {
            const updatedTasks = state.tasks.filter((task) => task.id !== id);
            const updatedSelectedDayTasks = state.selectedDayTasks.filter((task) => task.id !== id);
        
            return {
              tasks: updatedTasks,
              selectedDayTasks: updatedSelectedDayTasks,
            };
          });
        },      
          getTasksByDate: (formattedDate: string) => {
            return get().tasks.filter((task) => {
              const taskStartDate = new Date(task.dates[0]);
              const taskEndDate = new Date(task.dates[1]);
              const selectedDate = new Date(formattedDate);
          
              taskStartDate.setHours(0, 0, 0, 0);
              taskEndDate.setHours(23, 59, 59, 999);
              selectedDate.setHours(0, 0, 0, 0);

              return selectedDate >= taskStartDate && selectedDate <= taskEndDate;
            });
          },     
          setSelectedDayTasks: (task: Task[]) => {
            set(() => ({ selectedDayTasks: task }));
          },   
      }),
      {
        name: 'task-store',
      }
    )
  );
