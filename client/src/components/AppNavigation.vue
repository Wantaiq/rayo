<script setup lang="ts">
  import type { RouteRecordNormalized } from 'vue-router';

  type NavigationPropsType = {
    routes: RouteRecordNormalized[];
  };

  const props = defineProps<NavigationPropsType>();
</script>

<template>
  <nav class="container mx-auto py-6">
    <ul class="flex gap-3">
      <li
        class="flex justify-center items-center"
        v-for="(route, index) in props.routes"
        :key="`${index}-${route.path}`">
        <RouterLink
          :to="route.path"
          class="capitalize font-semibold text-zinc-800 py-3 px-3.5 leading-none
            hover:border-teal-500 border-b-2 border-b-transparent transition-all
            duration-500 ease-in-out"
          active-class="border-teal-500 border-b-2">
          {{ route.name }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
