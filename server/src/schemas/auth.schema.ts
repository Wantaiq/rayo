import type { User } from '@prisma/client';
import { object, ObjectSchema, string } from 'yup';

const register: ObjectSchema<Omit<User, 'id'>> = object({
  username: string().required('Username is required.').trim(),
  password: string()
    .required('Password is required.')
    .min(4, 'Password has to be at least 4 characters long.')
    .trim(),
});

const login: ObjectSchema<Omit<User, 'id'>> = object({
  username: string().required('Username is required.').trim(),
  password: string().required('Password is required.').trim(),
});

export default { register, login };
