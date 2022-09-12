import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../Components/Header';
import { RESET } from '../Redux/Actions';

class Feedback extends React.Component {
  componentDidMount() {
    const { name, score, email } = this.props;
    const convertedEmail = md5(email).toString();
    const playerStorage = [{
      name,
      image: `https://www.gravatar.com/avatar/${convertedEmail}`,
      score,
    }];
    if (localStorage.rankingStorage) {
      const parsed = JSON.parse(localStorage.rankingStorage);
      const newArray = [...parsed, ...playerStorage];
      localStorage.setItem('rankingStorage', JSON.stringify(newArray));
    } else {
      localStorage.setItem('rankingStorage', JSON.stringify(playerStorage));
    }
  }

  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(RESET);
    history.push('/');
  };

  handleClickRanking = () => {
    const { history, dispatch } = this.props;
    dispatch(RESET);
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const minimumNumber = 3;
    const feedbackText = ((assertions >= minimumNumber)
      ? 'Well Done!' : 'Could be better...');
    return (
      <div>
        <Header />
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
  name: state.user.name,
});

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  dispatch: propTypes.func.isRequired,
  score: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
