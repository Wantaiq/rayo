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

  return {
    isLoggedIn,
    userData,
    login,
  };
});
