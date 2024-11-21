<script setup lang="ts">
  import useAuth from '@/composables/useAuth';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const { logout } = useAuth();

  logout.mutate(undefined, {
    onSuccess: () => {
      router.push({ name: 'home', replace: true });
    },
  });
</script>
