import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './index.css';

const app = createApp(App);

app.use(createPinia());
app.use(VueQueryPlugin);
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
});

app.mount('#app');
