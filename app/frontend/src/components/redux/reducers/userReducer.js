const INITIAL_STATE = {
  user_id: '',
  isAuth: '',
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_USERID': 
      return {
        ...state,
        user_id: action.user_id,
      };
    case 'UPDATE_ISAUTH':
      return {
        ...state,
        isAuth: action.isAuth,
      };
    default:
      return state
  }
};

export default userReducer;