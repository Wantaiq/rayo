<script setup lang="ts">
  import useAuth from '@/composables/useAuth';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const { logout } = useAuth();
  const userStore = useUserStore();

  logout.mutate(undefined, {
    onSuccess: () => {
      router.push({ name: 'home', replace: true });
      userStore.logout();
    },
  });
</script>
