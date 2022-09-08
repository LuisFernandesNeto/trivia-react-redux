import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction, tokenAction } from '../Redux/Actions';
import fecthToken from '../APIs';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    btnIsDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.enableBtn();
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const data = await fecthToken();
    const { token } = data;
    const { email } = this.state;
    dispatch(userAction(email));
    dispatch(tokenAction(token));
    history.push('/game');
  };

  enableBtn = () => {
    const MIN_CHARACTERS_NAME = 1;
    const { email, name } = this.state;
    const emailOk = email.match(/\S+@\S+\.\S+/);
    const nameOk = name.length >= MIN_CHARACTERS_NAME;
    const enable = emailOk && nameOk;

    this.setState({ btnIsDisabled: !enable });
  };

  render() {
    const { btnIsDisabled } = this.state;
    return (
      <div>
        <p>Login</p>
        <input
          type="email"
          name="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <br />
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          placeholder="Nome"
          onChange={ this.handleChange }
        />
        <br />
        <button
          type="submit"
          disabled={ btnIsDisabled }
          onClick={ this.handleSubmit }
          data-testid="btn-play"
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
