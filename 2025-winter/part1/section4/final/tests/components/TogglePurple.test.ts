import TogglePurple from '@/components/TogglePurple.vue';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';

describe('TogglePurple', () => {
  beforeEach(() => {
    render(TogglePurple);
  });

  describe('render test', () => {
    it('should render checkbox and the checkbox not be checked by default', () => {
      const checkbox = screen.getByRole('checkbox');

      // expect(element).matcher
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    it('should render purple label component with purple text', () => {
      const purpleLabel = screen.getByText(/purple/i);
      // expect(element).matcher
      expect(purpleLabel).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    it('should be checked after user click', async () => {
      const checkbox = screen.getByRole('checkbox');
      const user = userEvent.setup();

      await user.click(checkbox);

      expect(checkbox).toBeChecked();
    });
  });
});
