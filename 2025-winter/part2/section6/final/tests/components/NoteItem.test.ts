import NoteItem from '@/components/NoteItem.vue';
import type { Note } from '@/types/Note';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { render } from 'vitest-browser-vue';

describe('NoteItem', () => {
  const mockNote: Note = {
    id: 1,
    title: 'title',
    content: 'content',
  };

  function renderComponent() {
    return render(NoteItem, {
      props: {
        note: mockNote,
      },
      global: {
        plugins: [createPinia(), VueQueryPlugin],
      },
    });
  }

  describe('render test', () => {
    it('should display two buttons with correct role and accessible name', async () => {
      const { getByRole } = renderComponent();

      const editButton = getByRole('button', {
        name: 'edit-button',
      });
      const deleteButton = getByRole('button', {
        name: 'delete-button',
      });

      await expect.element(editButton).toBeInTheDocument();
      await expect.element(deleteButton).toBeInTheDocument();
    });
  });
});
