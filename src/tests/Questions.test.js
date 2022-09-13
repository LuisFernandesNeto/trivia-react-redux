import React from 'react';
/* import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; */
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Renderizações da página de Ranking', () => {
  it('Após o botão ser clicado redirecionar para "/"', () => {
    renderWithRouterAndRedux(<App />);
  });
});
