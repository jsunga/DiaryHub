export const updateUserID = user_id => {
  return {
      type: 'UPDATE_USERID',
      user_id,
  };
};

export const updateIsAuth = isAuth => {
  return {
      type: 'UPDATE_ISAUTH',
      isAuth,
  };
};