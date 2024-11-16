import type { Food } from '@prisma/client';
import { number, object, ObjectSchema, string } from 'yup';

const create: ObjectSchema<Omit<Food, 'id' | 'userId'>> = object({
  name: string().required('Name is required.'),
  quantity: number()
    .typeError('Quantity needs to be a number.')
    .required('Quantity is required.')
    .positive('Quantity has to be a positive number.'),
});

export default { create };
