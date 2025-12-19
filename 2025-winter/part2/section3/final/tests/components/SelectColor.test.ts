import SelectColor from '@/components/SelectColor.vue';
import { render } from 'vitest-browser-vue';
import { userEvent } from 'vitest/browser';

describe('SelectColor', () => {
  function renderComponent() {
    return render(SelectColor);
  }

  describe('render test', () => {
    it('should render the select element correctly', async () => {
      const { getByRole } = renderComponent();

      const select = getByRole('combobox');

      await expect.element(select).toBeInTheDocument();
    });

    it('should render the label element with correct text', async () => {
      const { getByText } = renderComponent();

      const label = getByText(/text color/i);

      await expect.element(label).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    it('should display the options with correct count', async () => {
      const { getByRole } = renderComponent();
      const select = getByRole('combobox');

      await userEvent.click(select);
      const options = getByRole('option').elements();

      expect(options).toHaveLength(3);
    });

    it.each([
      { optionValue: '', label: 'white' },
      { optionValue: 'text-black', label: 'black' },
      { optionValue: 'text-orange', label: 'orange' },
    ])(
      'should display $label after user click the $label option',
      async ({ optionValue }) => {
        const { getByRole } = renderComponent();

        const select = getByRole('combobox');
        await userEvent.selectOptions(select, optionValue);

        await expect.element(select).toHaveValue(optionValue);
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
