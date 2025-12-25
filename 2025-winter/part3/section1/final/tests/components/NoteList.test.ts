import NoteList from '@/components/NoteList.vue';
import { getNotes } from '@/services/apiNote';
import type { Note } from '@/types/Note';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { render } from 'vitest-browser-vue';
import { worker } from '../mocks/server';

describe('NoteList', () => {
  function renderComponent() {
    const vueQueryPluginOptions = {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      },
    };

    return render(NoteList, {
      global: {
        plugins: [createPinia(), [VueQueryPlugin, vueQueryPluginOptions]],
      },
    });
  }

  beforeAll(() => worker.start());
  afterEach(() => worker.resetHandlers());
  afterAll(() => worker.stop());

  describe('render test', () => {
    it('should render note items with correct count', async () => {
      // Arrange
      const { getByRole } = renderComponent();

      // Act
      await vi.waitFor(() => {
        const listitems = getByRole('listitem').all();
        expect(listitems.length).toBeGreaterThan(0);
      });
      const noteItems = getByRole('listitem').elements();

      // Assert
      expect(noteItems.length).toBeGreaterThan(0);
    });

    it.skip('should render the skeleton while data is fetching', async () => {
      vi.mocked(getNotes).mockImplementation(() => {
        return new Promise(() => {});
      });
      const { getByRole } = renderComponent();

      const skeleton = getByRole('progressbar');

      await expect.element(skeleton).toBeInTheDocument();
    });

    it.skip('should display error message while fetch function throw error', async () => {
      const errorMessage = 'Error from vitest';
      vi.mocked(getNotes).mockRejectedValue(new Error(errorMessage));
      const { getByRole } = renderComponent();

      const alert = getByRole('alert');

      await expect.element(alert).toBeInTheDocument();
    });
  });
});
