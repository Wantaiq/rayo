import api from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

type UserAuthDataType = {
  username: string;
  password: string;
};

type UserResponse = {
  id: number;
  username: string;
};

const useAuth = () => {
  const queryClient = useQueryClient();

  const register = useMutation({
    mutationFn: async (loginData: UserAuthDataType) => {
      return await api.post<UserResponse>('/auth/register', loginData);
    },
    retry: false,
    onSuccess: response => {
      queryClient.setQueryData(['user'], {
        id: response.data.id,
        username: response.data.username,
      });
    },
  });

  return { register };
};

export default useAuth;
