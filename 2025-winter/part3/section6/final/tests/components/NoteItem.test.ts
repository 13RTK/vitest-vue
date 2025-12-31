import NoteItem from '@/components/NoteItem.vue';
import type { Note } from '@/types/Note';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import { render } from 'vitest-browser-vue';
import { userEvent } from 'vitest/browser';

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
        plugins: [createPinia(), VueQueryPlugin, Toast],
      },
    });
  }

  describe('render test', () => {
    it('should display two buttons with correct role and accessible name', async () => {
      const { getByRole, debug } = renderComponent();

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

  describe('user interaction', () => {
    it('should render toaster after user click the delete button and success delete', async () => {
      document.body.innerHTML = '';
      const { getByRole, getByText } = renderComponent();

      const deleteButton = getByRole('button', {
        name: 'delete-button',
      });
      await userEvent.click(deleteButton);

      const toaster = getByText(/Note deleted successfully/i);

      await expect.element(toaster).toBeInTheDocument();
    });
  });
});
