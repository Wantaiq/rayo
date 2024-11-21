<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue';
  import PrivateNavigation from '@/components/PrivateNavigation.vue';
</script>

<template>
  <AppHeader>
    <template #navigation>
      <PrivateNavigation />
    </template>
  </AppHeader>
  <main class="container mx-auto">
    <slot />
  </main>
</template>
