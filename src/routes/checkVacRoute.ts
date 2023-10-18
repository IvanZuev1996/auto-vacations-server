import express from 'express';

import { checkVacationStatus } from '../controllers/checkVacationStatus';

export default (router: express.Router) => {
    router.get('/users/:id/vacation-status', checkVacationStatus);
};