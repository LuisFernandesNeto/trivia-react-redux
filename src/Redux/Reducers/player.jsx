import { ADD_SCORE } from '../Actions';

const INITIAL_STATE = {
  score: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_SCORE: return {
    ...state,
    score: action.payload,
  };
  default: return state;
  }
}

export default player;
