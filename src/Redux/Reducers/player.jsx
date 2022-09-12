import { ADD_SCORE } from '../Actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_SCORE: return {
    ...state,
    score: state.score + action.payload,
    assertions: state.assertions + 1,
  };
  default: return state;
  }
}

export default player;
