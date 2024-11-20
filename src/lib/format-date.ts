import { differenceInDays, format } from "date-fns";

export const formatDate = (date: Date) => {
  return format(date, "MMMM d, yyyy");
};

export const dayBetweenDates = (startDate: Date, endDate: Date) => {
  return differenceInDays(endDate, startDate);
};

export const numberOfDaysRemaining = (endDate: Date) => {
  const today = new Date();
  return differenceInDays(endDate, today);
};

export const pourcentageOfDaysRemaining = (startDate: Date, endDate: Date) => {
  const daysRemaining = numberOfDaysRemaining(endDate);
  const totalDays = dayBetweenDates(startDate, endDate);
  return ((totalDays - daysRemaining) / totalDays) * 100;
};
