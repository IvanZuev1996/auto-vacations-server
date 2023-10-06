import express from 'express';

import authentication from './authRoute';
// import users from './userRoute';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    // users(router);

    return router;
};
