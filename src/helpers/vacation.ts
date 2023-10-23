import dayjs from 'dayjs';
import { Vacation } from '../types/vacation';

export const isUserInVacation = (vacation: Vacation) => {
    const today = dayjs();
    const startDate = dayjs(vacation.start);
    const endDate = dayjs(vacation.end).add(1, 'day');

    if (today.isBetween(startDate, endDate, null, '[]')) {
        return true;
    }

    return false;
};
