import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Login de usuários', () => {
  test('Verifica se a tela home está funcionando completamente', async () => {
    renderWithRouterAndRedux(<App />);
    const response = {
      response_code: 0,
      response_message: 'Token Generated Successfully!',
      token: '0ad9ff7a6c9090d4ea225e7467e50e31567bdac8d21a5ed1d774e51033b17c51' };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });
    const emailInput = screen.getByTestId(/input-gravatar-email/i);
    const nameInput = screen.getByTestId(/input-player-name/i);
    expect(emailInput).toBeInTheDocument();

    const playButton = screen.getByRole('button', { name: /Play/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();

    userEvent.type(emailInput, 'luisfernandesneto@gmail.com');
    userEvent.type(nameInput, 'Luis');

    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);

    expect(global.fetch).toBeCalledTimes(1);
    await waitFor(() => expect(screen.getByText(/Trivia/i)).toBeInTheDocument());

    /* const { location: { pathname } } = history;
    expect(pathname).toBe('/'); */
  });
});
