import NoteList from '@/components/NoteList.vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { render } from 'vitest-browser-vue';
import { worker } from '../mocks/server';
import { delay, http, HttpResponse } from 'msw';

const API_URL = import.meta.env.VITE_API_URL;

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

    it('should render the skeleton while data is fetching', async () => {
      worker.use(
        http.get(API_URL, async () => {
          await delay();

          return HttpResponse.json([]);
        })
      );
      const { getByRole } = renderComponent();

      const skeleton = getByRole('progressbar');

      await expect.element(skeleton).toBeInTheDocument();
    });

    it('should display error message while fetch function throw error', async () => {
      worker.use(
        http.get(API_URL, () => {
          return HttpResponse.error();
        })
      );
      const { getByRole } = renderComponent();

      const alert = getByRole('alert');

      await expect.element(alert).toBeInTheDocument();
    });
  });
});
