import dayjs from 'dayjs';

export const getVacaionDaysCount = (start: Date, end: Date) =>
    dayjs(end).diff(dayjs(start), 'day') + 1;
