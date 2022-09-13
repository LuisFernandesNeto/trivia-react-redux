import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const Route = '/Feedback';
const INITIAL_STATE = {
  player: {
    name: 'Alex',
    assertions: 3,
    score: 150,
    gravatarEmail: 'outraPessoa@seila.com',
  },
};

const STATE = {
  player: {
    name: 'Alex',
    assertions: 1,
    score: 50,
    gravatarEmail: 'outraPessoa@seila.com',
  },
};

describe('Testes para a página de feedbacks', () => {
  it('Renderização do botão e eventos', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/Feedback');
    const btnAgain = screen.getByRole('button', { name: /play again/i });
    userEvent.click(btnAgain);
    expect(history.location.pathname).toEqual('/');
  });

  it('Renderizações do texto quando acerta 3 questões', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, Route);

    const txtHeading = screen.getByRole('heading', { name: /well done!/i, level: 1 });
    expect(txtHeading).toBeInTheDocument();
  });

  it('Renderizações do texto quando acerta 3 questões', () => {
    renderWithRouterAndRedux(<App />, STATE, Route);

    const txtH1 = screen.getByRole('heading', { name: /Could be better.../i, level: 1 });
    expect(txtH1).toBeInTheDocument();
  });

  it('Verifica se o botão ranking muda para a página ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, STATE, Route);

    const rankingButton = screen.getByRole('button', { name: /Ranking/i });
    expect(rankingButton).toBeInTheDocument();

    userEvent.click(rankingButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/ranking');
  });
});
