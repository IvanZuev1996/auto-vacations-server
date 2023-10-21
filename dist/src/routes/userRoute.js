import { getAllUsers, deleteUser, updateUser, createUser, getOneUserById } from '../controllers/users';
export default (router) => {
    router.get('/users', getAllUsers);
    router.post('/users', createUser);
    router.get('/users/:id', getOneUserById);
    router.delete('/users/:id', deleteUser);
    router.patch('/users/:id', updateUser);
};
