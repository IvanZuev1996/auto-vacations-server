import { Request, Response } from 'express';

import {
    checkVacationStatus
} from '../models/checkVacationStatus/checkVacationStatusActions';
import { GetAllUsersParams, User } from '../types/user';
import { Vacation, VacationStatus, VacationTypes } from '../types/vacation';

export const checkVacationStatus = async (req, res) => {
    try {
      const userId = req.params.id; 
      const user = await getUserById(userId); // Получение пользователя из базы данных
  
      const currentDate = new Date(); // получение текущей даты

      // Проверка совпадения отпуска пользователя с текущей датой
      let inVacation = false;
      for (const vacation of user.vacations) {
        const startDate = new Date(vacation.startDate);
        const endDate = new Date(vacation.endDate);
  
        if (currentDate >= startDate && currentDate <= endDate) {
          inVacation = true;
          break;
        }
      }
  
      res.status(200).json({ inVacation });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error checking vacation status' });
    }
  };