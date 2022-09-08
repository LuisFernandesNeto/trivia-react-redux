import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  componentDidMount() {
    this.getQuestion();
  }

  getQuestion = async () => {
    const errorNumber = 3;
    const { history } = this.props;
    const { token } = localStorage;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    try {
      const testToken = await fetch(url);
      const testTokenJson = await testToken.json();
      if (testTokenJson.response_code === errorNumber) {
        history.push('/');
      } else {
        console.log(testTokenJson.results);
      }
    } catch (error) {
      localStorage.setItem('token', 'INVALID_TOKEN');
    }
  };

  render() {
    return (
      <div>
        <h1>Questões</h1>
      </div>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Questions);
