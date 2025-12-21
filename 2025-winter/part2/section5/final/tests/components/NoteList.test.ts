import NoteList from '@/components/NoteList.vue';
import { getNotes } from '@/services/apiNote';
import type { Note } from '@/types/Note';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { render } from 'vitest-browser-vue';

describe('NoteList', () => {
  function renderComponent() {
    return render(NoteList, {
      global: {
        plugins: [createPinia(), VueQueryPlugin],
      },
    });
  }

  describe('render test', () => {
    it('should render note items with correct count', async () => {
      // Arrange
      const mockNotes: Note[] = [
        {
          id: 1,
          title: 'title',
          content: 'content',
        },
        {
          id: 2,
          title: 'title',
          content: 'content',
        },
      ];
      vi.mock('@/services/apiNote');
      vi.mocked(getNotes).mockResolvedValue(mockNotes);
      const { getByRole } = renderComponent();

      // Act
      await vi.waitFor(() => {
        const listitems = getByRole('listitem').all();
        expect(listitems.length).toBeGreaterThan(0);
      });
      const noteItems = getByRole('listitem').elements();

      // Assert
      expect(noteItems).toHaveLength(mockNotes.length);
    });
  });
});
