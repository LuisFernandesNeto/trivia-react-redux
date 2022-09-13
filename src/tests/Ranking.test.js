import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Ranking from '../Pages/Ranking';

describe('Renderizações da página de Ranking', () => {
  it('Após o botão ser clicado redirecionar para "/"', () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);

    const btnRanking = screen.getByRole('button', { name: /home/i });
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);
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
