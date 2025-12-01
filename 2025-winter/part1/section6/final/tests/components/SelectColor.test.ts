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

    it.each([
      { optionValue: '', label: 'white' },
      { optionValue: 'text-black', label: 'black' },
      { optionValue: 'text-orange', label: 'orange' },
    ])(
      'should display $label after user click the $label option',
      async ({ optionValue }) => {
        render(SelectColor);

        const select = screen.getByRole('combobox');
        const user = userEvent.setup();

        await user.selectOptions(select, optionValue);

        expect(select).toHaveValue(optionValue);
      }
    );
    // it('should display black after user click the black option', async () => {
    //   render(SelectColor);

    //   const optionValue = 'text-black';

    //   const select = screen.getByRole('combobox');
    //   const user = userEvent.setup();

    //   await user.selectOptions(select, optionValue);

    //   expect(select).toHaveValue(optionValue);
    // });
  });
});
