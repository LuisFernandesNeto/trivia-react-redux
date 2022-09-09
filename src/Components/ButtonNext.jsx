import React from 'react';
// import { connect } from 'react-redux';

class ButtonNext extends React.Component {
  render() {
    return (
      <button
        type="submit"
        data-testid="btn-next"
      >
        Next
      </button>
    );
  }
}

export default ButtonNext;
