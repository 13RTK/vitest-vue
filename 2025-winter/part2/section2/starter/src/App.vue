<template>
  <button @click="onClick" type="button" :class="classes">
    {{ content }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const content = ref('Click me');

const classes = ref('btn');

function onClick() {
  content.value = 'Active';

  classes.value = 'btn active';
}
</script>

<style>
.active {
  color: #fff;
  background: #f5222d;
}
</style>
