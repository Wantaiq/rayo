<script setup lang="ts">
  import { useField } from 'vee-validate';
  import { toRefs } from 'vue';

  type InputTextFieldPropsType = {
    type?: 'text' | 'password' | 'email';
    value?: string;
    name: string;
    label: string;
    placeholder?: string;
  };

  const props = defineProps<InputTextFieldPropsType>();

  const {
    type = 'text',
    value = '',
    name,
    label,
    placeholder = '',
  } = toRefs(props);

  const {
    value: inputValue,
    errorMessage,
    handleChange,
  } = useField(name, undefined, {
    initialValue: value,
  });
</script>

<template>
  <div class="flex flex-col gap-2">
    <label
      :for="name"
      class="font-semibold text-lg">
      {{ label }}
    </label>
    <input
      class="rounded-lg text-zinc-900 focus:ring-0 border-0"
      :type="type"
      :name="name"
      :id="name"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange" />
    <p
      v-show="errorMessage"
      class="text-red-400 text-base">
      {{ errorMessage }}
    </p>
  </div>
</template>
