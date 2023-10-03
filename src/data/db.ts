// Здесь пишем фейковые данные (позднее подключим БД)
import { User } from '../types/user';

export const fakeUsersList: Record<string, User> = {
    '1': {
        firstname: 'John',
        lastname: 'Lastname',
        division: '1'
    },
    '2': {
        firstname: 'Ivan',
        lastname: 'Lastname',
        division: '2'
    },
    '3': {
        firstname: 'David',
        lastname: 'Lastname',
        division: '1'
    }
};
