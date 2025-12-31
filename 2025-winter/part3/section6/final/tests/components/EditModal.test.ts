import EditModal from '@/components/EditModal.vue';
import Toast from 'vue-toastification';
import { render } from 'vitest-browser-vue';
import { openModal } from '@/composables/model';
import type { Note } from '@/types/Note';
import { useNoteStore } from '@/stores/note';
import { storeToRefs } from 'pinia';
import { registerPlugin } from '../plugin';
import { userEvent } from 'vitest/browser';

describe('EditModal', () => {
  function renderComponent() {
    return render(EditModal, {
      global: {
        plugins: [...registerPlugin(), Toast],
      },
    });
  }

  const mockedNoteStoreForAdd: Note = {
    id: 999,
    title: 'add title',
    content: 'add content',
  };

  describe('render test', () => {
    it('should render add form with correct content at the initialize stage', async () => {
      const { getByLabelText } = renderComponent();
      const { note } = storeToRefs(useNoteStore());
      note.value = mockedNoteStoreForAdd;
      openModal('my_modal_5');

      const title = getByLabelText(/title/i);
      const content = getByLabelText(/content/i);

      await expect.element(title).toHaveValue(mockedNoteStoreForAdd.title);
      await expect.element(content).toHaveValue(mockedNoteStoreForAdd.content);
    });
  });

  describe('user interaction', () => {
    it('should render toaster after user click the add button', async () => {
      const { getByRole, getByText } = renderComponent();
      const { note } = storeToRefs(useNoteStore());
      note.value = mockedNoteStoreForAdd;
      openModal('my_modal_5');

      const addButton = getByRole('button', {
        name: /add/i,
      });

      await userEvent.click(addButton);

      const toast = getByText(/created successfully/i);

      await expect.element(toast).toBeInTheDocument();
    });
  });
});
