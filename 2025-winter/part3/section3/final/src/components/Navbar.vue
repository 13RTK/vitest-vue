<template>
  <div class="navbar shadow-sm bg-primary text-primary-content">
    <div class="navbar-start">
      <a class="btn btn-ghost text-xl lg:text-3xl">Momentum</a>
    </div>

    <div class="navbar-end">
      <label class="swap swap-flip text-4xl lg:text-6xl">
        <input
          type="checkbox"
          :checked="isLight"
          @change="(event) => (isLight = (event.target as HTMLInputElement).checked)"
        />

        <div class="swap-on">🌞</div>
        <div class="swap-off">🌚</div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const isLight = ref(true);

watch(
  () => isLight.value,
  (newValue) => {
    if (newValue) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }
);
</script>
