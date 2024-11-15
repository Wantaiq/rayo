import { object, string } from 'yup';

const register = object({
  username: string().required('Username is required.').trim(),
  password: string()
    .required('Password is required.')
    .min(4, 'Password has to be at least 4 characters long.')
    .trim(),
});

export default { register };
