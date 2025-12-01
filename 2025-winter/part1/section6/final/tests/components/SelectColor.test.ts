import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import SelectColor from '@/components/SelectColor.vue';

describe('SelectColor', () => {
  describe('render test', () => {
    it('should render the select element correctly', () => {
      render(SelectColor);

      const select = screen.getByRole('combobox');

      expect(select).toBeInTheDocument();
    });

    it('should render the label element with correct text', () => {
      render(SelectColor);

      const label = screen.getByText(/text color/i);

      expect(label).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    it('should display the options with correct count', async () => {
      render(SelectColor);

      const select = screen.getByRole('combobox');
      const user = userEvent.setup();

      await user.click(select);

      const options = screen.getAllByRole('option');

      expect(options).toHaveLength(3);
    });
  });
});
