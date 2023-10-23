import dayjs from 'dayjs';
import cron from 'node-cron';
import { UserModel } from '../models/User/User';
import { getUserVacationsById } from '../models/Vacation/VacationActions';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const schedule = '0 0 * * *';

const checkUsersStatus = async () => {
    try {
        const today = dayjs();
        const users = await UserModel.find();

        for (const user of users) {
            const userVacations = await getUserVacationsById(user.id);

            let isInVacation = false;
            for (const vacation of userVacations) {
                const startDate = dayjs(vacation.start);
                const endDate = dayjs(vacation.end).add(1, 'day');

                if (today.isBetween(startDate, endDate, null, '[]')) {
                    user.nowInVacation = true;
                    await user.save();
                    isInVacation = true;
                    break;
                }
            }

            if (!isInVacation) {
                user.nowInVacation = false;
                await user.save();
            }
        }
    } catch (error) {
        console.log(error);
    }
};

cron.schedule(schedule, checkUsersStatus);
