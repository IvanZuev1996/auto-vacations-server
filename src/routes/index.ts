import express from 'express';

import authentication from './authRoute';
import vacations from './vacationRoute';
import users from './userRoute';
import divisions from './divisionRoute';
import checkVacation from './checkVacRoute';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    vacations(router);
    users(router);  
    divisions(router);

    return router;
};
