import dayjs from 'dayjs';
export const docMonths = {
    1: 'января',
    2: 'февраля',
    3: 'марта',
    4: 'апреля',
    5: 'мая',
    6: 'июня',
    7: 'июля',
    8: 'августа',
    9: 'сентября',
    10: 'октября',
    11: 'ноября',
    12: 'декабря'
};
export const getVacaionDaysCount = (start, end) => dayjs(end).diff(dayjs(start), 'day') + 1;
export const formatStartDate = (startDate) => {
    const start = dayjs(startDate);
    const year = start.year();
    const month = start.month() + 1;
    const date = start.date();
    return `${date} ${docMonths[month]} ${year} года`;
};
