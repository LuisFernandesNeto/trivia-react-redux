import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <p data-testid="ranking-title">ranking-title</p>
        <button
          data-testid="btn-go-home"
          type="submit"
          onClick={ this.handleClick }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
