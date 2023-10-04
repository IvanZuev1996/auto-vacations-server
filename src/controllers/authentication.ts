import express, { Request, Response } from 'express';

import { getUserByEmail, createUser, getUserByFullName } from '../models/User';
import { authentication, random } from '../helpers/auth';

import generator from 'generate-password';

// export const login = async (req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.sendStatus(400);
//         }

//         const user = await getUserByEmail(email).select(
//             '+authentication.salt +authentication.password'
//         );

//         if (!user) {
//             return res.sendStatus(400);
//         }

//         const expectedHash = authentication(user.auth.salt, password);

//         if (user.auth.password != expectedHash) {
//             return res.sendStatus(403);
//         }

//         const salt = random();
//         user.auth.sessionToken = authentication(
//             salt,
//             user._id.toString()
//         );

//         await user.save();

//         res.cookie('ANTONIO-AUTH', user.auth.sessionToken, {
//             domain: 'localhost',
//             path: '/'
//         });

//         return res.status(200).json(user).end();
//     } catch (error) {
//         console.log(error);
//         return res.sendStatus(400);
//     }
// };

export const register = async (req: Request, res: Response) => {
    try {
        const {
            firstname,
            lastname,
            patronymic,
            division,
            post,
            intersections,
            role,
            startWork,
            balance
        } = req.body;

        if (!firstname || !lastname) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByFullName(
            firstname,
            lastname,
            patronymic,
            division
        );

        if (existingUser) {
            return res.sendStatus(400);
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
            balance: balance + 28,
            auth: {
                username,
                salt,
                password: authentication(salt, password)
            }
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
