export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_TOKEN = 'ADD_TOKEN';

export function userAction(payload) {
  return {
    type: ADD_EMAIL,
    payload,
  };
}

export function tokenAction(payload) {
  return {
    type: ADD_TOKEN,
    payload,
  };
}
