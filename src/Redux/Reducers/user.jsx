import { ADD_EMAIL, ADD_TOKEN } from '../Actions';

const INITIAL_STATE = {
  email: '',
  token: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL: return {
    ...state,
    email: action.payload,
  };
  case ADD_TOKEN: return {
    ...state,
    token: action.payload,
  };
  default: return state;
  }
}

export default user;
