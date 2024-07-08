import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

/**
 * Checks if the given due date has passed.
 * @param {string} dueDate - The due date as a string (e.g., "Tue Oct 01 2024").
 * @returns {boolean} - Returns true if the due date has passed, false otherwise.
 */
export function isDueDatePassed(dueDate: string): boolean {
  const dueDateObj = new Date(dueDate);
  const currentDate = new Date();
  
  dueDateObj.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  
  return currentDate > dueDateObj;
}