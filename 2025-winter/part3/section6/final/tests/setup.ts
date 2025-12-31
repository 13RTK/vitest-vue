import { worker } from './mocks/server';
import 'vue-toastification/dist/index.css';
import '@/index.css';

beforeAll(() => worker.start());
afterEach(() => {
  document.body.innerHTML = '';
  worker.resetHandlers();
});
afterAll(() => worker.stop());
