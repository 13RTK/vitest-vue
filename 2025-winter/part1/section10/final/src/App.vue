<template>
  <main>
    <TogglePurple v-model:isPurple="isPurple" />

    <SelectColor v-model:textColor="textColor" />

    <CircleProperty v-model:property="size"> Circle Size </CircleProperty>
    <CircleProperty v-model:property="rotate"> Circle Rotate </CircleProperty>

    <div
      :class="['circle', { purple: isPurple }, textColor]"
      :style="circleStyle"
    >
      Hi!
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TogglePurple from '@/components/TogglePurple.vue';
import SelectColor from '@/components/SelectColor.vue';
import CircleProperty from '@/components/CircleProperty.vue';

const isPurple = ref<boolean>(false);
const textColor = ref<string>('');
const size = ref<number>(150);
const rotate = ref<number>(0);

const circleStyle = computed(() => {
  return {
    width: `${size.value}px`,
    height: `${size.value}px`,
    transform: `rotate(${rotate.value}deg)`,
  };
});
</script>

<style>
body {
  font-size: 20px;
  font-family: sans-serif;
}
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
label {
  margin-bottom: 20px;
  font-size: 20px;
  display: block;
}
select {
  font-size: 20px;
  margin-bottom: 20px;
}
input[type='number'] {
  display: block;
  font-size: 20px;
  margin-bottom: 20px;
}
.circle {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-color: #45d619;
  text-align: center;
  color: #fff;
  line-height: 150px;
  font-size: 32px;
  font-weight: bold;
}
.purple {
  background-color: purple;
}
.text-black {
  color: #424242;
}
.text-orange {
  color: #ffc26f;
}
</style>
