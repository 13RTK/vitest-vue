import { expect, test } from 'vitest';
import TogglePurple from '@/components/TogglePurple.vue';
import { render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom/vitest';

render(TogglePurple);

test('checkbox exists and not checked', () => {
  const checkbox = screen.getByRole('checkbox');

  // expect(element).matcher
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
});

test('purple label exists', () => {
  const purpleLabel = screen.getByText(/purple/i);

  // expect(element).matcher
  expect(purpleLabel).toBeInTheDocument();
});
