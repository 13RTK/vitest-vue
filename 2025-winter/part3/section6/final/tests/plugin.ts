import type { Note } from '@/types/Note';
import { createTestingPinia } from '@pinia/testing';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { ref, type Plugin, type Ref } from 'vue';

const initialState = ref<Note>({
  id: 1,
  title: 'initial title',
  content: 'initial content',
});

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  },
};

export function registerPlugin(piniaState?: Ref<Note>): Plugin[] {
  const testPinia = createTestingPinia({
    initialState: piniaState || initialState,
  });
  const vueQueryPluginWithoutRetry = [
    VueQueryPlugin,
    vueQueryPluginOptions,
  ] as any as Plugin;

  return [testPinia, vueQueryPluginWithoutRetry];
}
