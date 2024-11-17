import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(to => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return { name: 'login', replace: true };
  }

  if (userStore.isLoggedIn) {
    if (to.name === 'login' || to.name === 'register') {
      return { name: 'home', replace: true };
    }
  }
});
export default router;
