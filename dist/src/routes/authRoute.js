import { register, login } from '../controllers/authentication';
export default (router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
};
