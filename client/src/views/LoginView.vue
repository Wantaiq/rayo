<script setup lang="ts">
  import AppCard from '@/components/AppCard.vue';
  import AppForm from '@/components/AppForm.vue';
  import AppTextInput from '@/components/AppTextInput.vue';
  import useAuth from '@/composables/useAuth';
  import { useUserStore } from '@/stores/user';
  import getSubmitFunction from '@/utils/getSubmitFunction';
  import { useRouter } from 'vue-router';
  import { object, string } from 'yup';

  const registrationSchema = object({
    username: string().required('Username is required.').trim(),
    password: string()
      .required('Password is required.')
      .min(4, 'Password has to be at least 4 characters long.')
      .trim(),
  });

  const { login: loginQuery } = useAuth();
  const { login } = useUserStore();
  const router = useRouter();

  const submitHandler = getSubmitFunction(registrationSchema, values => {
    loginQuery.mutate(values, {
      onSuccess: response => {
        const { id, username } = response.data;
        login(id, username);

        router.push({ name: 'home' });
        return;
      },
    });
  });
</script>

<template>
  <AppCard class="mx-auto mt-32">
    <template #body>
      <AppForm
        :validation-schema="registrationSchema"
        :on-submit="submitHandler">
        <template #fields>
          <div class="flex flex-col gap-6">
            <AppTextInput
              label="Username"
              name="username"
              placeholder="Username" />
            <AppTextInput
              label="Password"
              name="password"
              type="password" />
          </div>
        </template>
        <template #actions>
          <button
            type="submit"
            class="bg-teal-600 py-2 px-3 rounded font-bold text-zinc-200 mt-4 ms-auto block">
            Login
          </button>
        </template>
      </AppForm>
    </template>
  </AppCard>
</template>
