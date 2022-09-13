import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const route = '/feedback';

const STATE = {
  user: {
    email: '',
    name: '',
  },
  player: {
    score: 0,
    assertions: 0,
  },
};

describe('Renderizações da página de Ranking', () => {
  it('Após o botão ser clicado redirecionar para "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />, STATE, route);

    const btnRanking = screen.getByRole('button', { name: /ranking/i });
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking');

    const btnHome = screen.getByRole('button', { name: /home/i });
    expect(btnHome).toBeInTheDocument();

    userEvent.click(btnHome);
    expect(history.location.pathname).toBe('/');
  });

  // it('', () => {
  //   //
  // });

  // it('', () => {
  //   //
  // });

  // it('', () => {
  //   //
  // });
});
