import { getUserByUsername, createUser, getUserByFullName } from '../models/User/userActions';
import { authentication, random } from '../helpers/auth';
import generator from 'generate-password';
export const login = async (req, res) => {
    try {
        const { password, username } = req.body;
        if (!username || !password) {
            return res.status(400).send({
                status: 'noInputData',
                message: 'Не введены данные!'
            });
        }
        const user = await getUserByUsername(username).select('+auth.salt +auth.password +auth.sessionToken');
        console.log(user);
        if (!user) {
            return res.status(400).send({
                status: 'noUser',
                message: 'Пользователь не найден'
            });
        }
        const expectedHashPassword = authentication(user.auth.salt, password);
        if (user.auth.password !== expectedHashPassword) {
            return res.status(403).send({
                status: 'failPassword',
                message: 'Неверный пароль'
            });
        }
        const salt = random();
        user.auth.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        res.cookie('AUTO-VACATIONS-AUTH', user.auth.sessionToken, {
            domain: 'localhost',
            path: '/'
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailLogin',
            message: 'Ошибка при входе'
        });
    }
};
export const register = async (req, res) => {
    try {
        const { firstname, lastname, patronymic, division, post, intersections, role, startWork, balance } = req.body;
        console.log(req.body);
        if (!firstname || !lastname) {
            return res.sendStatus(400).send({
                status: 'NoFirstnameOrLastname',
                error: 'Ошибка при вводе имени или фамилии'
            });
        }
        const existingUser = await getUserByFullName(firstname, lastname, division, patronymic);
        if (existingUser) {
            console.log(existingUser);
            return res.status(400).send({
                status: 'userAlreadyExists',
                error: 'Такой пользователь уже существует!'
            });
        }
        const username = generator.generate({
            length: 10,
            numbers: true
        });
        const password = generator.generate({
            length: 10,
            numbers: true
        });
        const salt = random();
        const user = await createUser({
            firstname,
            lastname,
            patronymic,
            division,
            post,
            role,
            intersections,
            startWork,
            daysOnVacations: 0,
            prevBalance: balance,
            spentVacationDays: 0,
            balance: 28 + balance,
            nowInVacation: false,
            vacationsDuration: [],
            auth: {
                username,
                salt,
                password: authentication(salt, password),
                testPassword: password
            }
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.error('ERROR: ', error);
        return res.status(400).send({
            status: 'FailRegister',
            error: 'Ошибка при добавлении пользователя'
        });
    }
};
