import PublicLayout from '@/layouts/PublicLayout.vue';
import HomeView from '@/views/HomeView.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      layout: PublicLayout,
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {
      layout: PublicLayout,
      requiresAuth: false,
    },
  },
] satisfies RouteRecordRaw[];

export default routes;
