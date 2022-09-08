import React from 'react';
import { connect } from 'react-redux';
import Questions from '../Components/Questions';

class Game extends React.Component {
  render() {
    return (
      <div>
        Tela de Jogo
        <Questions />
      </div>
    );
  }
}

export default connect()(Game);
