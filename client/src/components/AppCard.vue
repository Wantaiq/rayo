<template>
  <div class="flex flex-col p-10 w-fit rounded-lg border border-zinc-800">
    <div v-if="$slots.header">
      <slot name="header" />
    </div>
    <div v-if="$slots.body">
      <slot name="body" />
    </div>
    <div
      v-if="$slots.footer"
      class="mt-auto">
      <slot name="footer" />
    </div>
  </div>
</template>
