import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="ranking-title">ranking-title</p>
      </div>
    );
  }
}

export default connect()(Ranking);
