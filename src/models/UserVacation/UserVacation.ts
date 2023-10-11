import mongoose from 'mongoose';
import { Vacation } from '../../types/vacation';
import { User } from 'src/types/user';

interface UserVacationSchemaType {
    user: User;
    vacations: Vacation[];
}

const UserVacationSchema = new mongoose.Schema<UserVacationSchemaType>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        vacations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vacation' }]
    },
    { timestamps: true }
);

export const UserVacationModel = mongoose.model<UserVacationSchemaType>(
    'UserVacation',
    UserVacationSchema
);
