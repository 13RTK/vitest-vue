<template>
  <label>
    Purple
    <input type="checkbox" v-model="isPurple" />
  </label>
</template>

<script setup lang="ts">
const isPurple = defineModel('isPurple', {
  type: Boolean,
});
</script>
