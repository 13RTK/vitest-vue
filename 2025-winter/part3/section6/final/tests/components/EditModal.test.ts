import EditModal from '@/components/EditModal.vue';
import Toast from 'vue-toastification';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createTestingPinia } from '@pinia/testing';
import { render } from 'vitest-browser-vue';
import { openModal } from '@/composables/model';
import { ref } from 'vue';
import type { Note } from '@/types/Note';
import { useNoteStore } from '@/stores/note';
import { storeToRefs } from 'pinia';

describe('EditModal', () => {
  const initialState = ref<Note>({
    id: 1,
    title: 'initial title',
    content: 'initial content',
  });

  function renderComponent() {
    return render(EditModal, {
      global: {
        plugins: [
          createTestingPinia({
            initialState,
          }),
          VueQueryPlugin,
          Toast,
        ],
      },
    });
  }

  describe('render test', () => {
    const mockedNoteStoreForAdd: Note = {
      id: 999,
      title: 'add title',
      content: 'add content',
    };

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
  describe('user interaction', () => {});
});
