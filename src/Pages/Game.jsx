import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from '../Components/Questions';

class Game extends React.Component {
  render() {
    return (
      <div>
        Tela de Jogo
        <Questions props={ this.props } />
      </div>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }),
}.isRequired;

export default connect()(Game);
