import TogglePurple from '@/components/TogglePurple.vue';
import { render, screen } from '@testing-library/vue';

render(TogglePurple);

it('should render checkbox and the checkbox not be checked by default', () => {
  const checkbox = screen.getByRole('checkbox');

  // expect(element).matcher
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
});

it('should render purple label component with purple text', () => {
  // const purpleLabel = screen.getByText(/purple/i);
  // expect(element).matcher
  // expect(purpleLabel).toBeInTheDocument();

  screen.debug();
});
