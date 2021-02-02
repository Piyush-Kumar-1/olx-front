export const initialState = {
  namee: null,
  emaill: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        namee: action.namee,
      };

    case "SET_EMAIL":
      return {
        ...state,
        emaill: action.emaill,
      };
    case "REMOVE":
      return {
        namee: null,
      };

    default:
      return state;
  }
};

export default reducer;
