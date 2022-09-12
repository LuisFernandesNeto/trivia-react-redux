import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  state = {
    rank: [],
  };

  componentDidMount() {
    const rankingMount = JSON.parse(localStorage.rankingStorage);
    rankingMount.sort((a, b) => b.score - a.score);
    this.setState({
      rank: rankingMount,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { rank } = this.state;
    return (
      <div>
        { rank.map((element, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>{ element.name }</p>
            <p data-testid={ `player-score-${index}` }>{ element.score }</p>
            <img src={ element.image } alt={ `${element.name}` } />
          </div>
        )) }
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

const mapStateToProps = (state) => ({
  name: state.user.name,
  score: state.player.score,
});

Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
