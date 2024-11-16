<script setup lang="ts">
  import AppNavigation from '@/components/AppNavigation.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const publicRoutes = router
    .getRoutes()
    .filter(route => !route?.meta?.requiresAuth);
</script>

<template>
  <AppNavigation :routes="publicRoutes" />
</template>
