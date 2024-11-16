<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue';
  import PublicNavigation from '@/components/PublicNavigation.vue';
</script>

<template>
  <AppHeader>
    <template #navigation>
      <PublicNavigation />
    </template>
  </AppHeader>
  <main class="container mx-auto">
    <slot />
  </main>
</template>
