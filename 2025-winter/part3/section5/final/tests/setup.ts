import { worker } from './mocks/server';
import 'vue-toastification/dist/index.css';
import '@/index.css';

beforeAll(() => worker.start());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());
