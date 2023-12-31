import express from 'express';

import {
    getAllUsers,
    deleteUser,
    updateUser,
    createUser,
    getOneUserById
} from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', getAllUsers);
    router.post('/users', createUser);
    router.get('/users/:id', getOneUserById);
    router.delete('/users/:id', deleteUser);
    router.patch('/users/:id', updateUser);
};
