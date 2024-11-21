import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false);
  const userData = ref({
    id: null as number | null,
    username: null as string | null,
  });

  const login = (id: number, username: string) => {
    userData.value = { id, username };
    isLoggedIn.value = true;
  };

  const logout = () => {
    userData.value = { id: null, username: null };
    isLoggedIn.value = false;
  };

  return {
    isLoggedIn,
    userData,
    login,
    logout,
  };
});
