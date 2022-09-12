import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Feedback extends React.Component {
  render() {
    const { correct } = this.props;
    let feedbackText = '';
    const minimunNumber = 3;
    if (correct >= minimunNumber) {
      feedbackText = 'Well Done!';
    } else {
      feedbackText = 'Could be better...';
    }
    return (
      <div>
        Tela de Feedback
        <h1 data-testid="feedback-text">{feedbackText}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  correct: state.player.correct,
});

Feedback.propTypes = {
  correct: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
