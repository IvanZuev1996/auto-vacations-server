import { getAllUsers, deleteUser, updateUser, createUser, getOneUserById } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';
export default (router) => {
    router.get('/users', getAllUsers);
    router.post('/users', createUser);
    router.get('/users/:id', isAuthenticated, isOwner, getOneUserById);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', updateUser);
};
