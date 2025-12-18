import App from '@/App.vue';
import { render } from 'vitest-browser-vue';
import { userEvent } from 'vitest/browser';

it('should display correct color after user click', async () => {
  // Arrange
  const { getByRole } = render(App);
  const button = getByRole('button');

  // Act
  await userEvent.click(button);
  const backgroundColor = window.getComputedStyle(
    button.element()
  ).backgroundColor;

  // Assert
  expect(backgroundColor).toBe('rgb(245, 34, 45)');
});
