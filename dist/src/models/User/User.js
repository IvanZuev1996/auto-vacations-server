import mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    patronymic: { type: String },
    avatar: { type: String },
    email: { type: String },
    post: { type: String },
    role: { type: [String], required: true },
    department: { type: Number },
    division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division' },
    intersections: { type: [String], required: true },
    startWork: { type: Date },
    balance: { type: Number, required: true },
    spentVacationDays: { type: Number, required: true },
    prevBalance: { type: Number, required: true },
    daysOnVacations: { type: Number },
    visibleUsers: { type: [String] },
    vacationStatus: { type: String },
    auth: {
        username: { type: String, required: true },
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
        testPassword: { type: String, select: false }
    }
}, { timestamps: true });
export const UserModel = mongoose.model('User', UserSchema);
