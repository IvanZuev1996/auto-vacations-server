import dayjs from 'dayjs';
export const isUserInVacation = (vacation) => {
    const today = dayjs();
    const startDate = dayjs(vacation.start);
    const endDate = dayjs(vacation.end).add(1, 'day');
    if (today.isBetween(startDate, endDate, null, '[]')) {
        return true;
    }
    return false;
};
