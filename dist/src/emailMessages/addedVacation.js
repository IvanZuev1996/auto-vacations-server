import nodemailer from 'nodemailer';
import { vacationTypeMap } from '../types/vacation';
import { getUserById } from '../models/User/userActions';
import dayjs from 'dayjs';
import { formatStartDate } from '../helpers/dates';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vacationplusapp@gmail.com',
        pass: 'sdss jyrr ymhv tket'
    }
});
export const sendAddedVacationEmail = async (vacation) => {
    const userData = await getUserById(vacation.user.toString());
    const directorData = await getUserById('653913dc8eb82ed58ad00a9d');
    console.log(directorData);
    const startDate = dayjs(vacation.start, 'YYYY-MM-DD');
    const endDate = dayjs(vacation.end, 'YYYY-MM-DD');
    const start = formatStartDate(startDate.toString());
    const end = formatStartDate(endDate.toString());
    const htmlContent = `
        <div>
            <h2>${userData?.firstname} ${userData?.patronymic} подал заявку на отпуск!</h2>
            <h3>Детали заявки:</h3>
            <div>
                <p>Тип заявки: ${vacationTypeMap[vacation.type]}</p>
                <p>Дата начала отпуска: ${start} </p>
                <p>Дата конца отпуска: ${end} </p>
            </div>
            <div style="background-color: #0070ff; cursor: pointer; width: fit-content; padding: 10;  border-radius: 6px;">
                <a href="https://vacation-plus.netlify.app/vacations/${vacation._id}" style="text-decoration: none; color: white;">Перейти в сервис</a>
            </div>
        </div>
    `;
    const mailOptions = {
        from: 'vacationplusapp@gmail.com',
        to: directorData?.email ? directorData?.email : 'ivan-zuev-97@mail.ru',
        subject: 'Информация о заявках',
        text: 'Добавлена новая заявка!',
        html: htmlContent
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
};
