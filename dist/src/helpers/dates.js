import dayjs from 'dayjs';
export const getVacaionDaysCount = (start, end) => dayjs(end).diff(dayjs(start), 'day') + 1;
