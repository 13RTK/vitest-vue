<template>
  <label>
    text color
    <select v-model="textColor">
      <option value="" selected>White</option>
      <option value="text-black">Black</option>
      <option value="text-orange">Orange</option>
    </select>
  </label>
</template>

<script setup lang="ts">
const textColor = defineModel('textColor', {
  type: String,
});
</script>
