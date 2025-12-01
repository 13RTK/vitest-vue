<template>
  <label>
    Circle Size
    <input type="number" v-model="property" />
  </label>
</template>

<script setup lang="ts">
const property = defineModel('property', {
  type: Number,
});
</script>
