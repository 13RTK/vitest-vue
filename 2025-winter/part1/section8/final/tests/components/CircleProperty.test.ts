import { cleanup, render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CircleProperty from '@/components/CircleProperty.vue';

describe('CircleProperty', () => {
  beforeEach(() => {
    render(CircleProperty, {
      slots: {
        default: 'Circle Property',
      },
      props: {
        property: 0,
      },
    });
  });

  describe('render test', () => {
    it('should render the input correctly', () => {
      const input = screen.getByRole('spinbutton');

      expect(input).toBeInTheDocument();
    });

    it('should render the label with correct text', () => {
      cleanup();

      const slotText = 'Component Test';
      render(CircleProperty, {
        slots: {
          default: slotText,
        },
      });

      const label = screen.getByText(slotText);

      expect(label).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    it('should display the correct number in the input after user type', async () => {
      const input = screen.getByRole('spinbutton');
      const inputNumber = 30;

      const user = userEvent.setup();
      await user.click(input);
      await user.keyboard(inputNumber.toString());

      expect(input).toHaveValue(inputNumber);
    });
  });
});
