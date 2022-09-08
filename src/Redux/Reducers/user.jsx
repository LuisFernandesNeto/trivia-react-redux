import { ADD_EMAIL, ADD_NAME } from '../Actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL: return {
    ...state,
    email: action.payload,
  };
  case ADD_NAME: return {
    ...state,
    name: action.payload,
  };
  default: return state;
  }
}

export default user;
