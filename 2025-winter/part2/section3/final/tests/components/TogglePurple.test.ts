import TogglePurple from '@/components/TogglePurple.vue';
import { render } from 'vitest-browser-vue';
import { userEvent } from 'vitest/browser';

describe('TogglePurple', () => {
  function renderComponent() {
    return render(TogglePurple);
  }

  describe('render test', () => {
    it('should render checkbox and the checkbox not be checked by default', async () => {
      const { getByRole } = renderComponent();

      const checkbox = getByRole('checkbox');
      // expect(element).matcher
      await expect.element(checkbox).toBeInTheDocument();
      await expect.element(checkbox).not.toBeChecked();
    });

    it('should render purple label component with purple text', async () => {
      const { getByText } = renderComponent();

      const purpleLabel = getByText(/purple/i);
      // expect(element).matcher

      await expect.element(purpleLabel).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    it('should be checked after user click', async () => {
      const { getByRole } = renderComponent();
      const checkbox = getByRole('checkbox');

      await userEvent.click(checkbox);

      await expect.element(checkbox).toBeChecked();
    });
  });
});
