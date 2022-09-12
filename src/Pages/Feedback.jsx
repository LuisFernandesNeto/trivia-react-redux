import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Feedback extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const minimumNumber = 3;
    const feedbackText = ((assertions >= minimumNumber)
      ? 'Well Done!' : 'Could be better...');
    return (
      <div>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <h1 data-testid="feedback-text">{ feedbackText }</h1>
        <button
          data-testid="btn-play-again"
          type="submit"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="submit"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
