export const user = (state = {}, action) => {
  switch (action.type) {
    case 'user:login':
      return state.update({
        $set: action.payload,
      });

    case 'refresh':
      return state.update({
        token: {
          $set: action.payload.token,
        },
      });

    case 'user:logout':
      return state.update({
        $set: {},
      });

    default: return state;
  }
};

export default { };
