<script setup lang="ts">
  import type { SubmissionHandler } from 'vee-validate';
  import { Form as VeeForm } from 'vee-validate';
  import { toRefs } from 'vue';
  import type { AnyObjectSchema } from 'yup';

  type FormPropsType = {
    validationSchema: AnyObjectSchema;
    onSubmit: SubmissionHandler;
  };

  const props = defineProps<FormPropsType>();
  const { validationSchema, onSubmit } = toRefs(props);
</script>

<template>
  <VeeForm
    @submit="onSubmit"
    :validation-schema="validationSchema">
    <slot name="fields" />
    <slot name="actions" />
  </VeeForm>
</template>
