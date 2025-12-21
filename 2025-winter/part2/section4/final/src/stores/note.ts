import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Note } from '@/types/Note';

export const useNoteStore = defineStore('note', () => {
  const note = ref<Note>({
    id: 999,
    title: 'title',
    content: 'content',
  });

  return { note };
});
