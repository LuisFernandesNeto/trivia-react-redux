import React from 'react'
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from "@testing-library/user-event";
import Ranking from '../Pages/Ranking';

describe('Renderizações da página de Ranking', () => {
  it('Após o botão ser clicado redirecionar para "/"', () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);
    
    const btnRanking = screen.getByRole('button', { name: /home/i });
    userEvent.click(btnRanking);
    expect(btnRanking).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/');
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