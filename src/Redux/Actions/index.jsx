export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_NAME = 'ADD_NAME';

export function userAction(payload) {
  return {
    type: ADD_EMAIL,
    payload,
  };
}

export function nameAction(payload) {
  return {
    type: ADD_NAME,
    payload,
  };
}
