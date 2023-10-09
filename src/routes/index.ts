import express from 'express';

import authentication from './authRoute';
import vacations from './vacationRoute';
// import users from './userRoute';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    vacations(router);
    // users(router);

    return router;
};
