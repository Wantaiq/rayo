import api from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

type UserCredentialsType = {
  username: string;
  password: string;
};

type UserResponseType = {
  id: number;
  username: string;
};

const useAuth = () => {
  const queryClient = useQueryClient();

  const register = useMutation({
    mutationFn: async (registrationData: UserCredentialsType) => {
      return await api.post<UserResponseType>(
        '/auth/register',
        registrationData,
      );
    },
    retry: false,
    onSuccess: response => {
      queryClient.setQueryData(['user'], {
        id: response.data.id,
        username: response.data.username,
      });
    },
  });

  const login = useMutation({
    mutationFn: async (loginData: UserCredentialsType) => {
      return await api.post<UserResponseType>('/auth/login', loginData);
    },
    retry: false,
    onSuccess: response => {
      queryClient.setQueryData(['user'], {
        id: response.data.id,
        username: response.data.username,
      });
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      return await api.post<never>('/auth/logout');
    },
    retry: false,
    onSuccess: () => {
      queryClient.setQueryData(['user'], {
        id: null,
        username: null,
      });
    },
  });

  return { register, login, logout };
};

export default useAuth;
