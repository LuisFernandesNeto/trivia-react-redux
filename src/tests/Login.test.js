import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import questions, { errorQuestions } from './helpers/Mock';

const timeout = 32000;
const responseToken = 'Token Generated Successfully!';
const email = 'luisfernandesneto@gmail.com';

describe('Login de usuários', () => {
  jest.setTimeout(timeout);
  test('Verifica se a tela home está funcionando completamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const response = {
      response_code: 0,
      response_message: responseToken,
      token: '0ad9ff7a6c9090d4ea225e7467e50e31567bdac8d21a5ed1d774e51033b17c51' };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions).mockResolvedValueOnce(response),
    });
    const emailInput = screen.getByTestId(/input-gravatar-email/i);
    const nameInput = screen.getByTestId(/input-player-name/i);
    expect(emailInput).toBeInTheDocument();

    const playButton = screen.getByRole('button', { name: /Play/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();

    userEvent.type(emailInput, email);
    userEvent.type(nameInput, 'Luis');

    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);

    expect(global.fetch).toBeCalledTimes(1);
    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));

    const question = screen.getByRole('heading', { name: /questões/i, level: 1 });
    expect(question).toBeInTheDocument();

    expect(history.location.pathname).toEqual('/game');

    const correctButton = screen.getByTestId('correct-answer');
    expect(correctButton).toBeInTheDocument();

    await waitFor(
      () => expect(correctButton).toBeDisabled(),
      { timeout: 32000 },
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
  });
  test('Verifica se a response errada volta pra home', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const response = {
      response_code: 0,
      response_message: responseToken,
      token: '0ad9ff7a6c9090d4ea225e7467e50e31567bdac8d21a5ed1d774e51033b17c51' };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(errorQuestions).mockResolvedValueOnce(response),
    });
    const emailInput = screen.getByTestId(/input-gravatar-email/i);
    const nameInput = screen.getByTestId(/input-player-name/i);
    expect(emailInput).toBeInTheDocument();

    const playButton = screen.getByRole('button', { name: /Play/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();

    userEvent.type(emailInput, email);
    userEvent.type(nameInput, 'Luis');

    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);

    expect(global.fetch).toBeCalledTimes(1);
    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));

    expect(history.location.pathname).toBe('/');
  });
  test('verifica tela de configurções', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const configButton = screen.getByRole('button', { name: /configuração/i });
    expect(configButton).toBeInTheDocument();

    userEvent.click(configButton);
    expect(history.location.pathname).toBe('/settings');

    const configHeader = screen.getByRole('heading', { name: /Configurações/i, level: 1 });
    expect(configHeader).toBeInTheDocument();
  });
  test('Verifica pontuação do teste', async () => {
    renderWithRouterAndRedux(<App />);
    const response = {
      response_code: 0,
      response_message: responseToken,
      token: '0ad9ff7a6c9090d4ea225e7467e50e31567bdac8d21a5ed1d774e51033b17c51' };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions).mockResolvedValueOnce(response),
    });
    const emailInput = screen.getByTestId(/input-gravatar-email/i);
    const nameInput = screen.getByTestId(/input-player-name/i);
    expect(emailInput).toBeInTheDocument();

    const playButton = screen.getByRole('button', { name: /Play/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();

    userEvent.type(emailInput, email);
    userEvent.type(nameInput, 'Luis');

    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);

    expect(global.fetch).toBeCalledTimes(1);
    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));

    const correctButton = screen.getByTestId('correct-answer');
    expect(correctButton).toBeInTheDocument();

    await waitFor(
      () => userEvent.click(correctButton),
      { timeout: 5000 },
    );

    /* const score = screen.getByText('85');
    expect(score).toBeInTheDocument(); */
  });
});
