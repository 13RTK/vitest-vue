import CircleProperty from '@/components/CircleProperty.vue';
import { render } from 'vitest-browser-vue';
import { userEvent } from 'vitest/browser';

describe('CircleProperty', () => {
  function renderComponent(slot?: string) {
    return render(CircleProperty, {
      slots: {
        default: slot || 'Circle Property',
      },
      props: {
        property: 0,
      },
    });
  }

  describe('render test', () => {
    it('should render the input correctly', async () => {
      const { getByRole } = renderComponent();

      const input = getByRole('spinbutton');

      await expect.element(input).toBeInTheDocument();
    });

    it('should render the label with correct text', async () => {
      // Arrange
      const slotText = 'Component Test';
      const { getByText } = renderComponent(slotText);

      // Act
      const label = getByText(slotText);

      // Assert
      await expect.element(label).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    it('should display the correct number in the input after user type', async () => {
      // Arrange
      const { getByRole } = renderComponent();

      const input = getByRole('spinbutton');
      const inputNumber = 30;

      // Act
      await userEvent.clear(input);
      await userEvent.click(input);
      await userEvent.keyboard(inputNumber.toString());

      // Assert
      await expect.element(input).toHaveValue(inputNumber);
    });
  });
});
