/** USER REDUCER
 * @type {import('redux').Reducer<import('react-redux').State, import('react-redux').Action>}
 */
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

export const Reducer = (rootname, initialState) => {
  /**
   * @type {import('redux').Reducer<import('react-redux').State, import('react-redux').Action>}
   */
  const reducer = (state = initialState, action) => {
    const name = rootname || action.type.substring(0, action.type.indexOf(':'));

    switch (action.type) {
      case `${name}:mount`:
        return state.update({
          $set: action.payload,
        });

      case `${name}:create`:
        return state.update({
          $unshift: [action.payload],
        });

      case `${name}:update`:
        return state.update({
          [state.findIndex((s) => s.uuid === action.payload.uuid)]: {
            $set: action.payload,
          },
        });

      case `${name}:will:delete`:
        return state.update({
          [state.findIndex((s) => s.uuid === action.payload.uuid)]: {
            $merge: {
              delete: action.payload.delete,
            },
          },
        });

      case `${name}:delete`:
        return state.update((x) => x.filter((s) => s.uuid !== action.payload.uuid));

      default: return state;
    }
  };

  return reducer;
};
