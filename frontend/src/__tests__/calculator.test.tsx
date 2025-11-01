import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

vi.mock('../lib/api', () => ({
  calculate: async () => ({ result: 7 }),
}));

describe('Calculator UI', () => {
  it('renders and performs a basic calculation', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /key 3/i }));
    await user.click(screen.getByRole('button', { name: /key \+/i }));
    await user.click(screen.getByRole('button', { name: /key 4/i }));
    await user.click(screen.getByRole('button', { name: /^=$/i }));
    expect(await screen.findByText('7')).toBeInTheDocument();
  });
});
